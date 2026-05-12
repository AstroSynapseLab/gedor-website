/**
 * @file htmlFormatter.ts
 * @description Provides functions to format HTML files, and a plugin that automatically formats them after an Astro build.
 *              Intended for use in the Astro build process.
 */

// Import core modules
import path from 'node:path';
import fs from 'node:fs';
import chalk from 'chalk';
import prettier from 'prettier';
import type { AstroIntegration } from 'astro';

/**
 * Type definition for HTML formatter configuration options
 * Extends Prettier’s option type
 */
export interface FormatterOptions {
  [key: string]: string | number | boolean | undefined;
  parser: string;
  tabWidth: number;
  useTabs: boolean;
  printWidth: number;
  htmlWhitespaceSensitivity: 'css' | 'strict' | 'ignore';
  endOfLine?: 'lf' | 'crlf' | 'cr' | 'auto';
  bracketSameLine?: boolean;
  singleAttributePerLine?: boolean;
  embeddedLanguageFormatting?: 'auto' | 'off';
}

/**
 * Default formatting configuration options
 * Based on Prettier settings and optimized for HTML formatting
 */
export const defaultConfig: FormatterOptions = {
  parser: 'html', // Use HTML parser
  tabWidth: 2, // Indentation size (number of spaces)
  useTabs: true, // Use tabs
  printWidth: 120, // Maximum line length
  htmlWhitespaceSensitivity: 'css', // Handle whitespace depending on CSS
  endOfLine: 'lf', // Line ending (Unix/Linux)
  bracketSameLine: false, // Put closing bracket on a separate line
  singleAttributePerLine: false, // Allow multiple attributes on the same line
  embeddedLanguageFormatting: 'auto', // Auto-format embedded languages (CSS/JS, etc.)
};

/**
 * Recursively collects all file paths in the specified directory
 *
 * @param {string} dirPath -             Path of the directory to search
 * @param {string[]} [arrayOfFiles=[]] - Array of collected file paths (used for recursion)
 * @returns {string[]}                   Array of collected file paths
 */
export const getAllFiles = function (dirPath: string, arrayOfFiles: string[] = []): string[] {
  // Get files/folders inside the directory
  const files = fs.readdirSync(dirPath);

  // Process each file/folder
  files.forEach(file => {
    const fullPath = path.join(dirPath, file);

    // If it's a folder, process it recursively
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    }
    // If it's a file, add it to the array
    else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
};

/**
 * Formats the specified HTML file and overwrites it
 *
 * @param {string} filePath - Path to the HTML file to format
 * @param {FormatterOptions} options -  Options to use for formatting
 * @returns {Promise<void>} Promise that resolves when processing is complete
 */
export const htmlFormatter = async (filePath: string, options: FormatterOptions): Promise<void> => {
  try {
    // Read file contents
    const data = fs.readFileSync(filePath, { encoding: 'utf8' });

    // Ensure a parser is included in the options
    const formattingOptions = {
      ...options,
      parser: options.parser || 'html', // Ensure parser is set
    };

    // Format using prettier
    const result = await prettier.format(data, formattingOptions);

    // Write the formatted contents back
    fs.writeFileSync(filePath, result);
    console.log(chalk.green(`Formatted: ${path.basename(filePath)}`));
  } catch (err) {
    // Error handling
    console.error(chalk.red(`Error formatting ${filePath}: ${(err as Error).message}`));
  }
};

/**
 * Type definition for Astro’s build-done hook arguments
 */
interface AstroBuildDoneParams {
  dir: URL;
  pages: { pathname: string }[];
}

/**
 * Plugin that automatically formats HTML files after an Astro build
 *
 * @param {Partial<FormatterOptions>} [options={}] - Formatting options (can extend the defaults)
 * @returns {AstroIntegration}                      Astro plugin object
 */
export default function htmlBeautifier(options: Partial<FormatterOptions> = {}): AstroIntegration {
  // Safely merge defaults with user options
  const formattingOptions = { ...defaultConfig, ...options };

  return {
    name: 'htmlFormatter',
    hooks: {
      'astro:build:done': async ({ dir }: AstroBuildDoneParams) => {
        try {
          console.log(chalk.blue.bold('\nFormatting HTML files...'));

          // Get all files in the build output directory
          const allFiles = getAllFiles(dir.pathname);

          // Filter only HTML files
          const htmlFiles = allFiles.filter(filePath => path.extname(filePath) === '.html');

          // Format in parallel (improves performance)
          const promises = htmlFiles.map(filePath => htmlFormatter(filePath, formattingOptions));

          // Wait for all formatting tasks to complete
          await Promise.all(promises);

          console.log(chalk.green.bold('\nHTML formatting completed successfully ✓'));
        } catch (error) {
          // Error handling
          console.error(chalk.red.bold('\nHTML Formatting Error:'));
          console.error(chalk.red(`${(error as Error).message}`));
        }
      },
    },
  };
}
