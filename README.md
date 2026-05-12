# Astro + TailwindCSS + shadcn/ui Template

This project is a comprehensive template with all the features needed for modern
web development. It integrates Astro, TailwindCSS v4, shadcn/ui, React, and
TypeScript, along with environment-specific build configurations and error
tracking.

[![License](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)
[![Astro](https://img.shields.io/badge/Astro-5.12.9-BC52EE.svg)](https://astro.build/)
[![React](https://img.shields.io/badge/React-19.1.1-61DAFB.svg)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.4-38BDF8.svg)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-2.10.0-09090b)](https://ui.shadcn.com/)

## 🚀 Features

- **Astro v5**: Fast and modern static site generator
- **TailwindCSS v4**: Latest utility-first CSS framework
- **[shadcn/ui](#-using-shadcnui)**: Reusable and customizable UI components
- **React Integration**: Use React components within Astro
- **TypeScript**: Type-safe development environment
- **Environment Configuration**: Automatic switching between development,
  staging, and production
- **Custom Path Settings**: Flexible configuration for base URLs and asset URLs
- **[ESLint + Prettier](#-code-quality-management)**: Code quality and
  formatting consistency
- **[Centralized Type Definitions](#-type-definitions-directory)**: Dedicated
  `src/types/` directory with ESLint enforcement for TypeScript types only

## ⚡️ Requirements

- Node.js: v20.9.0 or higher
- npm: v10.1.0 or higher

### Node.js Version Management

We recommend using the following tools to manage the specified Node.js version
for this project:

- [nvm](https://github.com/nvm-sh/nvm) - Node Version Manager
- [fnm](https://github.com/Schniz/fnm) - Fast Node Manager
- [volta](https://volta.sh/) - JavaScript Tool Manager

The project includes Volta configuration, pinned in package.json as follows:

```json
"volta": {
  "node": "20.18.0",
  "npm": "10.8.2"
}
```

`.node-version` and `.nvmrc` files are also provided.

## 🛠️ Tech Stack

- **Framework**: Astro v5
- **UI**: React v19, shadcn/ui
- **Styling**: TailwindCSS v4, Sass
- **Build Tool**: Vite
- **Language**: TypeScript
- **Package Management**: npm

## 📁 Project Structure

```text
/
├── public/                    # Static files
│   └── assets/                # Assets (images, etc.)
├── src/
│   ├── assets/                # Assets (SVGs, etc.)
│   ├── components/            # UI components
│   │   ├── ui/                # shadcn/ui components
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── label.tsx
│   │   │   ├── radio-group.tsx
│   │   │   └── switch.tsx
│   │   ├── Head.astro         # Meta tags and SEO settings
│   │   ├── Header.astro       # Site header
│   │   ├── HelpDialog.tsx     # Help dialog
│   │   ├── SettingsDialog.tsx # Settings dialog
│   │   └── Welcome.astro      # Welcome page
│   ├── layouts/               # Layout components
│   │   └── Layout.astro       # Main layout
│   ├── lib/                   # Utilities and configurations
│   │   ├── constants.ts       # Environment settings and constants
│   │   ├── htmlFormatter.ts   # html formatter
│   │   ├── sentry.ts          # Error tracking
│   │   └── utils.ts           # Utility functions
│   ├── pages/                 # Page components
│   │   ├── index.astro        # Homepage
│   │   └── hoge/              # Subdirectory page example
│   ├── styles/                # Global styles
│   │   └── global.css         # TailwindCSS and variable definitions
│   └── types/                 # **TypeScript type definitions (types only)**
│       ├── index.ts           # All type definitions export
│       ├── common.ts          # Common types
│       ├── api.ts             # API-related types
│       ├── ui.ts              # UI component types
│       ├── page.ts            # Page and metadata types
│       └── environment.ts     # Environment and configuration types
├── LICENSE                    # License
├── astro.config.mjs           # Astro configuration
├── tailwind.config.js         # TailwindCSS configuration
├── components.json            # shadcn/ui configuration
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies and scripts
```

## 📦 Setup

```bash
# Clone the repository
git clone [your-repository-url]

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🔧 Commands

| Command                 | Description                                      |
| :---------------------- | :----------------------------------------------- |
| `npm run dev`           | Start development server (http://localhost:3000) |
| `npm run build`         | Build for production                             |
| `npm run stg`           | Build for staging environment                    |
| `npm run prod`          | Build for production environment                 |
| `npm run preview`       | Preview build results                            |
| `npm run lint`          | Run ESLint code quality checks                   |
| `npm run lint:fix`      | Run ESLint with automatic fixes                  |
| `npm run format`        | Run Prettier code formatting                     |
| `npm run format:check`  | Check code formatting                            |
| `npm run type-check`    | Run TypeScript type checking                     |




### Environment Switching

Environment switching is managed through npm scripts:

```bash
npm run dev   # NODE_ENV=development
npm run stg   # NODE_ENV=staging
npm run prod  # NODE_ENV=production
```

Each command automatically sets appropriate environment variables and applies
corresponding URL settings.

## 🎨 Using shadcn/ui

This template integrates shadcn/ui, providing a modern, reusable UI component
system. shadcn/ui is a collection of beautiful, accessible, and customizable
components.

### Features of shadcn/ui

- **Copy-and-paste approach**: Components are copied directly into your project
  for full customization
- **TailwindCSS-based**: Styling uses TailwindCSS for a consistent design system
- **Radix UI primitives**: Adopts high-quality, accessible UI primitives
- **TypeScript support**: Supports type-safe component development

```bash
# Add individual component
npx shadcn add button

# Add multiple components at once
npx shadcn add dialog card alert

# Show available components
npx shadcn add
```

### Currently Available Components

#### Button (`@/components/ui/button`)

Button component supporting various styles and sizes:

```tsx
// Usage example
import { Button } from "@/components/ui/button";

// Default button
<Button>Click me</Button>

// Variants: default, destructive, outline, secondary, ghost, link
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>

// Sizes: default, sm, lg, icon
<Button size="lg">Large Button</Button>
<Button size="icon">
  <Icon />
</Button>

// Button with icon
<Button>
  <Settings className="mr-2" />
  Settings
</Button>
```

#### Dialog (`@/components/ui/dialog`)

```tsx
// Usage example
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Description</DialogDescription>
    </DialogHeader>
    {/* Content */}
  </DialogContent>
</Dialog>;
```


### TailwindCSS Integration

shadcn/ui components use TailwindCSS classes and fully integrate with the
project's theme:

```tsx
// Combining with TailwindCSS utilities
<Button className='mt-4 w-full'>Full Width Button</Button>
```


### Notes

- Components are copied directly into the project, so updates must be done
  manually
- As React components, appropriate client directives are required in Astro
  environments
- shadcn/ui components are fully customizable and can be freely modified to meet
  project requirements

## 🧹 Code Quality Management

This project provides an integrated code quality management system with ESLint
and Prettier.

### ESLint Configuration

Adopts modern Flat Config format and provides the following features:

- **TypeScript Support**: Type-safe code analysis with `@typescript-eslint`
- **React Support**: Integrates React Hooks and accessibility rules
- **Astro Support**: Linting for `.astro` files
- **Custom Rules**: Apply project-specific coding standards

### Prettier Configuration

Automatic code formatting unification features:

- **Astro Plugin**: Proper formatting for `.astro` files
- **Save on Format**: Automatic formatting on file save in VSCode
- **Batch Formatting**: Code unification across the entire project

### Configuration Files

```javascript
// eslint.config.js - Flat Config format
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      parser: tsParser,
      globals: { console: 'readonly', process: 'readonly' },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
  },
  ...astroPlugin.configs['flat/recommended'],
];
```

### VSCode Integration

Development environment optimization with `.vscode/settings.json`:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "eslint.experimental.useFlatConfig": true
}
```

### Code Quality Commands

```bash
# ESLint checks
npm run lint

# Automatic fixes
npm run lint:fix

# Prettier formatting
npm run format

# Format checking
npm run format:check

# TypeScript type checking
npm run type-check
```


## 📝 Styling

### TailwindCSS v4 Features

TailwindCSS v4 introduces more flexible customization and new syntax:

```css
/* global.css */
@import 'tailwindcss';
@import 'tw-animate-css';

/* Custom variant definitions */
@custom-variant dark (&:is(.dark *));

/* Theme definition */
@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --color-background: var(--background);
  /* ... */
}
```

### OKLCH Color System

The project adopts the OKLCH color model for more accurate color management:

```css
:root {
  --primary: oklch(0.21 0.034 264.665);
  --primary-foreground: oklch(0.985 0.002 247.839);
  /* ... */
}

.dark {
  --background: oklch(0.13 0.028 261.692);
  --foreground: oklch(0.985 0.002 247.839);
  /* ... */
}
```

### Dark Mode Implementation

Dark mode feature synchronized with system settings:

1. **Auto-detection**: Theme switches based on system settings
2. **Manual switching**: Can be changed manually in SettingsDialog
3. **Persistence**: Settings saved in localStorage

```tsx
// Implementation example in SettingsDialog
const applyTheme = (selectedTheme: string) => {
  if (selectedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else if (selectedTheme === 'light') {
    document.documentElement.classList.remove('dark');
  } else {
    // system
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
};
```

## 🔧 Astro Configuration Details

### Build Process Customization

The following features are configured in `astro.config.mjs`:

1. **Cleanup processing**: Automatically deletes unnecessary files after build
   completion
2. **Asset optimization**: Controls inlining and customizes asset paths
3. **Environment-specific settings**: Applies different settings for
   development, staging, and production
4. **HTML Auto-formatting**: Automatically formats HTML as part of the build
   process

```javascript
export default defineConfig({
  // ...
  build: {
    inlineStylesheets: 'never',
    assets: assetsDir,
    assetsPrefix: ASSETS_URL.STATUS ? assetsUrl : undefined,
  },
  integrations: [
    react(),
    // HTML formatting plugin (integrated into the build process)
    htmlBeautifier({
      parser: 'html',
      tabWidth: 2,
      useTabs: true,
      printWidth: 120,
      htmlWhitespaceSensitivity: 'css',
    }),
    {
      name: 'clean-dist-folder',
      hooks: {
        'astro:build:done': async ({ dir }) => {
          // Automatically deletes .DS_Store, Thumbs.db, __MACOSX, etc.
        },
      },
    },
  ],
  // ...
});
```

> **Note**: HTML formatting is automatically integrated into the Astro build
> process, and no additional commands need to be executed. Simply running
> `npm run build` will generate formatted HTML files in the build output.

### Vite Configuration Details

1. **minify settings**: Enables code compression only in production
2. **assetsInlineLimit**: Controls automatic inlining of small assets
3. **esbuild settings**: Automatic removal of console and debugger in production

```javascript
vite: {
  build: {
    minify: process.env.NODE_ENV === 'production',
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Asset path customization
        }
      }
    }
  },
  // Hide console and debugger only in production builds
  esbuild: (process.env.NODE_ENV === 'production' ) ? { drop: ['console', 'debugger'] } : {},
}
```

## 🔗 Metadata Management and SEO

### Head.astro Component

`Head.astro` handles per-page metadata management:

```astro
---
import type { PageMeta } from '@/lib/constants';

const props = Astro.props as PageMeta;

const {
  title = DEFAULT_PAGE_META.title,
  description = DEFAULT_PAGE_META.description,
  ogType = DEFAULT_PAGE_META.ogType,
  ogImage = DEFAULT_PAGE_META.ogImage,
  noindex = false,
  nofollow = false,
} = props;

// URL path generation
const canonicalURL = new URL(Astro.url.pathname, Astro.site || SITE_CONFIG.url);
const ogImageURL = new URL(ogImage, Astro.site || SITE_CONFIG.url);
---

<head>
  <meta charset='UTF-8' />
  <meta
    name='viewport'
    content='width=device-width,initial-scale=1.0,maximum-scale=5'
  />
  <title>{title} | {SITE_CONFIG.name}</title>
  <!-- SEO, OGP, Twitter Card, etc. -->
</head>
```

### Per-page Metadata Settings

```astro
---
// src/pages/index.astro
import type { PageMeta } from '@/lib/constants';

const meta: PageMeta = {
  title: 'Astro + TailwindCSS + shadcn/ui Template',
  description:
    'A comprehensive template with all the features needed for modern web development',
  ogType: 'website',
};
---

<Layout {...meta}>
  <!-- Content -->
</Layout>
```

## 🏗️ TypeScript Configuration

### Path Aliases

Configure paths starting with `@/` in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}
```

This enables imports like:

```typescript
import { Button } from '@/components/ui/button';
import { SITE_CONFIG } from '@/lib/constants';
import type { PageMeta, ApiResponse } from '@/types';
```

### Type Definitions Directory

The `src/types/` directory is **dedicated exclusively to TypeScript type
definitions**:

#### 📁 Directory Structure and Purpose

```text
src/types/
├── index.ts           # Central export for all type definitions
├── common.ts          # Common utility types (ID, Nullable, AsyncState, etc.)
├── api.ts             # API-related types (ApiResponse, HttpMethod, etc.)
├── ui.ts              # UI component types (ButtonProps, DialogProps, etc.)
├── page.ts            # Page and metadata types (PageMeta, SiteConfig, etc.)
└── environment.ts     # Environment and configuration types
```

#### 🔒 Directory Restrictions

- **Type definitions only**: This directory must contain only TypeScript type
  definitions
- **No implementation code**: No functions, classes, or runtime code allowed
- **ESLint enforcement**: Configured rules prevent non-type exports in this
  directory

#### 📝 Usage Guidelines

```typescript
// ✅ Correct usage - importing types
import type { ButtonProps, PageMeta, ApiResponse } from '@/types';

// ✅ Correct usage - importing specific type files
import type { AsyncState } from '@/types/common';
import type { HttpMethod } from '@/types/api';

// ❌ Incorrect - runtime imports from types directory
import { someFunction } from '@/types'; // This will cause ESLint error
```

#### 🛡️ ESLint Protection

The project includes ESLint rules that enforce type-only exports in the
`src/types/` directory, ensuring architectural consistency and preventing
runtime code from being accidentally placed in type definition files.

## 🚀 Deployment

### Build

```bash
# Development environment
npm run dev

# Staging environment
npm run stg

# Production environment
npm run prod
```

### Build Output

- Files are generated in the `dist/` directory according to environment
- Assets are placed in appropriate paths based on environment settings
- When BASE_URL is enabled, output directory is automatically adjusted (e.g.,
  `dist/hoge/`)

### Environment-specific Optimization

- Development: Source maps enabled, minify disabled
- Staging: Testing with production-like settings
- Production: minify enabled, console removed, optimized output

## 🔗 Important Files

- `astro.config.mjs`: Astro configuration and build options
- `src/lib/constants.ts`: Environment-specific URL settings
- `src/lib/sentry.ts`: Error tracking configuration
- `components.json`: shadcn/ui configuration
- `tailwind.config.js`: TailwindCSS configuration
- `tsconfig.json`: TypeScript configuration

## 📄 License

MIT License - see the [LICENSE](./LICENSE) file for details.

## 📚 References

- [Astro Documentation](https://docs.astro.build)
- [TailwindCSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [React](https://reactjs.org)
- [Sentry](https://sentry.io)

## 🤝 Contributing

1. Fork this repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

---

## 📝 Recent Updates

### ✨ Type Definitions Centralization (Latest)

**Overview**: Centralized all TypeScript type definitions into a dedicated
`src/types/` directory with ESLint enforcement.

#### 🛡️ ESLint Protection

- **Type-Only Enforcement**: ESLint rules prevent non-type code in `src/types/`
- **Runtime Code Prevention**: Functions, classes, and variables are blocked
- **Named Exports Only**: Default exports are not allowed
- **Development Safety**: Maintains architectural consistency

#### 📦 Usage Examples

```typescript
// Import all types from central hub
import type { ButtonProps, PageMeta, ApiResponse } from '@/types';

// Import from specific type files
import type { AsyncState, LoadingState } from '@/types/common';
import type { HttpMethod, ApiError } from '@/types/api';
```


