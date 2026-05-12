import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import astroPlugin from 'eslint-plugin-astro';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';

export default [
  // Base config for JavaScript/TypeScript files
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    env: {
      node: true,
      commonjs: true,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: globals.browser,
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tsPlugin.configs.recommended.rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,

      // TypeScript rule tweaks
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-empty-interface': 'warn',

      // React rule tweaks
      'react/react-in-jsx-scope': 'off', // Not needed in React 17+
      'react/prop-types': 'off', // Not needed when using TypeScript
      'react/jsx-uses-react': 'off',
      'react/jsx-uses-vars': 'error',

      // General rules
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-arrow-callback': 'error',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  // Config for Astro files
  ...astroPlugin.configs['flat/recommended'],

  // Type-only rules for src/types/ directory
  {
    files: ['src/types/**/*.ts'],
    rules: {
      // Allow unused types in type definition files
      '@typescript-eslint/no-unused-vars': 'off',
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ExportDefaultDeclaration',
          message: 'Default exports are not allowed in type definition files. Use named exports only.',
        },
        {
          selector: 'FunctionDeclaration',
          message: 'Functions are not allowed in type definition files. This directory is for types only.',
        },
        {
          selector: 'ClassDeclaration',
          message: 'Classes are not allowed in type definition files. This directory is for types only.',
        },
        {
          selector: 'VariableDeclaration',
          message: 'Runtime variables are not allowed in type definition files. This directory is for types only.',
        },
        {
          selector: 'ExportNamedDeclaration > VariableDeclaration',
          message: 'Exported variables are not allowed in type definition files. Use type exports only.',
        },
        {
          selector: 'ExportNamedDeclaration > FunctionDeclaration',
          message: 'Exported functions are not allowed in type definition files. Use type exports only.',
        },
        {
          selector: 'ExportNamedDeclaration > ClassDeclaration',
          message: 'Exported classes are not allowed in type definition files. Use type exports only.',
        },
      ],
    },
  },

  // Relaxed rules for config files
  {
    files: ['**/*.config.{js,mjs,ts}', '**/vite.config.ts', '**/astro.config.mjs'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      'no-console': 'off',
    },
  },

  // Directories and files to ignore
  {
    ignores: ['node_modules/**', 'dist/**', '.astro/**', '**/*.d.ts', 'public/**'],
  },

  // Avoid conflicts with Prettier (keep this last)
  prettierConfig,
];
