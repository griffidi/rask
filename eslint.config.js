import ts from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import eslint from 'eslint';
import prettier from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import lit from 'eslint-plugin-lit';
import prettierPlugin from 'eslint-plugin-prettier';
import { fileURLToPath, URL } from 'node:url';

const ROOT_DIR = fileURLToPath(new URL('./', import.meta.url));

const sharedPlugins = {
  import: importPlugin,
  ts,
  prettierPlugin,
};

const sharedLitPlugins = {
  lit,
};

const sharedRules = {
  ...eslint['recommended'],
  ...ts.rules.recommended,
  ...ts.rules['recommended-requiring-type-checking'],
  ...prettier.rules,
  'brace-style': 'off',
  'eol-last': ['error', 'always'],
  eqeqeq: 'error',
  'import/no-extraneous-dependencies': ['error', { optionalDependencies: false }],
  'import/extensions': [
    'error',
    'always',
    {
      ignorePackages: true,
    },
  ],
  // 'import/no-unresolved': 'off',
  'no-var': 'error',
  'no-unused-vars': 'off',
  'prefer-object-spread': 'warn',
  semi: 'off',
  'space-before-function-paren': 'off',
  'no-duplicate-imports': 'off',
  quotes: 'off',
  'quote-props': ['error', 'consistent-as-needed'],
  'ts/consistent-type-definitions': ['error', 'interface'],
  'ts/consistent-type-exports': [
    'error',
    {
      fixMixedExportsWithInlineTypeSpecifier: true,
    },
  ],
  'ts/consistent-type-imports': [
    'error',
    {
      prefer: 'type-imports',
      fixStyle: 'inline-type-imports',
    },
  ],
  'ts/semi': 'error',
  'ts/no-extra-semi': 'error',
  'ts/no-unused-vars': 'warn',
  'ts/no-explicit-any': 'warn',
  'ts/prefer-optional-chain': 'error',
  'ts/prefer-readonly': 'error',
  // 'ts/restrict-template-expressions': 'error',
  'ts/space-before-function-paren': [
    'error',
    {
      asyncArrow: 'always',
      anonymous: 'always',
      named: 'never',
    },
  ],
  'ts/sort-type-constituents': 'warn',
  'ts/type-annotation-spacing': 'error',
  'ts/unified-signatures': 'error',
  'ts/no-extra-non-null-assertion': 'error',
  'ts/unbound-method': 'off',
  'ts/quotes': ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
};

const sharedLitRules = {
  ...lit.rules.recommended,
};

const sharedLitSettings = {
  litHtmlSources: true,
};

const sharedNodeGlobals = {
  browser: 'readonly',
  node: 'writable',
  es2022: 'writable',
};

const sharedLitGlobals = {
  browser: 'writable',
  node: 'readonly',
  es2022: 'writable',
};

const nodeConfig = {
  plugins: {
    ...sharedPlugins,
  },
  rules: {
    ...sharedRules,
  },
};

const litConfig = {
  plugins: {
    ...sharedPlugins,
    ...sharedLitPlugins,
  },
  rules: {
    ...sharedLitRules,
    ...sharedRules,
  },
  settings: {
    ...sharedLitSettings,
  },
};

export default [
  {
    files: ['api/src/**/*.ts'],
    ignoreFiles: ['api/src/prisma/generated'],
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 2022,
      parser,
      parserOptions: {
        project: ['./tsconfig.eslint.json', './api/tsconfig.json'],
        tsconfigRootDir: ROOT_DIR,
      },
      globals: {
        ...sharedLitGlobals,
      },
    },
  },
  {
    files: ['apps/*/src/**/*.ts'],
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 2022,
      parser,
      parserOptions: {
        project: ['./tsconfig.eslint.json', './apps/*/tsconfig.json'],
        tsconfigRootDir: ROOT_DIR,
      },
      globals: {
        ...sharedLitGlobals,
      },
    },
  },
  {
    files: ['packages/*/src/**/*.ts'],
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 2022,
      parser,
      parserOptions: {
        project: ['./tsconfig.eslint.json', './packages/*/tsconfig.json'],
        tsconfigRootDir: ROOT_DIR,
      },
      globals: {
        ...sharedLitGlobals,
      },
    },
    ...litConfig,
  },
];
