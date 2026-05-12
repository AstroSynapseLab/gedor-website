// Built-in modules
import { promises as fs } from 'fs';

// External libraries / frameworks
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import glob from 'fast-glob';

// Project modules
import { getCurrentAssetsUrl, getCurrentBaseUrl } from './src/lib/constants.ts';
import htmlBeautifier from './src/lib/htmlFormatter.js';
import { LanguageEnum } from './src/types/index.ts';

import vercel from '@astrojs/vercel';

// Get values based on the build environment
const baseUrl = getCurrentBaseUrl();
const assetsUrl = getCurrentAssetsUrl();
const outDirUrl = `./dist${getCurrentBaseUrl()}`; // Remove the trailing slash

// Configure asset output directory when ASSETS_URL is enabled
const assetsDir = 'assets';

export default defineConfig({
  i18n: {
    defaultLocale: LanguageEnum.EN,
    fallbackLocale: LanguageEnum.EN,
    locales: [LanguageEnum.HR, LanguageEnum.EN],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  site: import.meta.env.PUBLIC_SITE_URL,
  base: import.meta.env.PUBLIC_BASE_URL ? import.meta.env.PUBLIC_BASE_URL : baseUrl,
  outDir: outDirUrl,
  // Whether to compress HTML (disabled by default here)
  compressHTML: false,
  build: {
    inlineStylesheets: 'never',
    assets: assetsDir,
    assetsPrefix: assetsUrl,
    format: 'file',
  },
  integrations: [
    react(),
    // Add HTML formatting plugin
    htmlBeautifier({
      parser: 'html',
      tabWidth: 2,
      useTabs: true,
      printWidth: 120,
      htmlWhitespaceSensitivity: 'css',
    }),
    {
      // Plugin name: cleans up the dist folder after build
      name: 'clean-dist-folder',
      hooks: {
        // Hook that runs after the Astro build process completes
        'astro:build:done': async ({ dir }) => {
          try {
            // Search for unnecessary system files using a glob pattern
            // .DS_Store: macOS folder metadata file
            // Thumbs.db: Windows thumbnail cache
            // Desktop.ini: Windows folder view settings file
            const junkFiles = await glob(`${dir.pathname}/**/{.DS_Store,Thumbs.db,Desktop.ini}`);
            console.log(`Found ${junkFiles.length} junk files to delete`);

            // Delete each detected junk file
            for (const file of junkFiles) {
              await fs.unlink(file); // Delete the file via fs.unlink
            }

            // Search for macOS-specific hidden directories
            // The __MACOSX directory is often created when extracting zip files
            const macosxDirs = await glob(`${dir.pathname}/**/__MACOSX`);
            console.log(`Found ${macosxDirs.length} __MACOSX directories to delete`);

            // Delete each detected __MACOSX directory
            for (const dirPath of macosxDirs) {
              // Check that it's a directory before deleting
              const stats = await fs.stat(dirPath);
              if (stats.isDirectory()) {
                // recursive: true - delete all files/directories inside recursively
                // force: true - force deletion (including read-only files)
                await fs.rm(dirPath, { recursive: true, force: true });
              }
            }

            // Success message
            console.log('Clean-up completed successfully');
          } catch (error) {
            // Error handling
            // Output detailed error info to the console
            console.error('--- Clean-up Dist Folder Error ---');
            console.error(`Error Message: ${error.message}`); // Error message
            console.error(`Stack Trace: ${error.stack}`); // Stack trace
            console.error('-----------------------------------');
          }
        },
      },
    },
  ],

  devToolbar: {
    enabled: false, // Whether to show Astro’s built-in toolbar
  },

  server: e => ({
    port: e.command === 'dev' ? 4000 : 4321,
    host: true, // Allow access from other devices on the local network
    open: true, // Automatically open the browser when the server starts
  }),

  vite: {
    plugins: [tailwindcss()],
    build: {
      minify: true,
      rollupOptions: {
        output: {
          entryFileNames: () => `assets/js/[name].js`,
          assetFileNames: assetInfo => {
            const name = assetInfo.name ?? '';
            const ext = name.split('.').pop()?.toLowerCase() ?? '';

            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
              return `assets/images/[name][extname]`;
            }
            if (ext === 'css') {
              return `assets/css/[name]-[hash][extname]`;
            }
            if (ext === 'js') {
              return `assets/js/[name]-[hash][extname]`;
            }
            return `assets/[name]-[hash][extname]`;
          },
        },
      },
    },
  },
  adapter: vercel(),
});
