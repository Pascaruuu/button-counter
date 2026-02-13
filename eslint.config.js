import js from '@eslint/js';
import ts from 'typescript-eslint';
import svelte from 'eslint-plugin-svelte';
import prettier from 'eslint-config-prettier';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    ignores: [
      'build/',
      '.svelte-kit/',
      'dist/',
      'node_modules/', // (Default, but explicit is fine)
    ],
  },

  // 1. Base JavaScript/TypeScript configurations
  js.configs.recommended,
  ...ts.configs.recommended,

  // 2. Svelte configuration
  ...svelte.configs['flat/recommended'],

  // 3. Prettier configuration (Must be last to override other configs)
  prettier,

  // 4. Global configurations (Environment setup)
  {
    languageOptions: {
      globals: {
        ...globals.browser, // For Svelte components
        ...globals.node, // For your Express middleware
      },
    },
  },

  // 5. Specific Svelte Parser setup
  {
    files: ['**/*.svelte'],
    languageOptions: {
      parserOptions: {
        // Tells Svelte parser to use TypeScript parser for script tags
        parser: ts.parser,
      },
    },
  },

  // 6. Custom Rules (Optional override)
  {
    rules: {
      // Example: If you want to allow "any" in TS (optional)
      // '@typescript-eslint/no-explicit-any': 'off',
      //   'no-console': 'warn',
    },
  },
];
