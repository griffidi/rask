import ts from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import eslint from 'eslint';
import prettier from 'eslint-config-prettier';
import lit from 'eslint-plugin-lit';
import prettierPlugin from 'eslint-plugin-prettier';

const sharedPlugins = {
  ts,
  prettierPlugin,
};

const sharedLitPlugins = {
  lit,
};

const sharedRules = {
  ...eslint['recommended'],
  ...ts.rules['stylistic-type-checked'],
  ...ts.rules['strict-type-checked'],
  ...prettier.rules,
  'array-element-newline': [
    'error',
    'always',
  ],
  'arrow-parens': [
    'error',
    'as-needed',
  ],
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
    files: [
      './tsconfig.json',
      'tsconfig.*.json',
    ],
  },
  {
    files: [
      'api/src/**/*.ts',
      'api/prisma/**/*.ts',
    ],
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 2022,
      parser,
      parserOptions: {
        // project: ['./tsconfig.eslint.json', './api/tsconfig.json'],
        // tsconfigRootDir: ROOT_DIR,
        project: true,
      },
      globals: {
        ...sharedNodeGlobals,
      },
    },
    ...nodeConfig,
  },
  {
    files: ['apps/demo/src/**/*.ts'],
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 2022,
      parser,
      parserOptions: {
        // project: ['./tsconfig.eslint.json', './apps/*/tsconfig.json'],
        // tsconfigRootDir: ROOT_DIR,
        project: true,
      },
      globals: {
        ...sharedLitGlobals,
      },
    },
    ...litConfig,
  },
  {
    files: ['packages/*/src/**/*.ts'],
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 2022,
      parser,
      parserOptions: {
        // project: ['./tsconfig.eslint.json', './packages/*/tsconfig.json'],
        // tsconfigRootDir: ROOT_DIR,
        project: true,
      },
      globals: {
        ...sharedLitGlobals,
      },
    },
    ...litConfig,
  },
];
