import js from '@eslint/js';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import babelParser from '@babel/eslint-parser';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        requireConfigFile: false,
        babelOptions: {
          presets: ['@babel/preset-react'],
        },
      },
      globals: {
        document: 'readonly',
        window: 'readonly',
        console: 'readonly',
        process: 'readonly',
        __DEV__: 'readonly',
      },
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      import: importPlugin,
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
      'arrow-parens': ['error', 'always'],
      'arrow-body-style': [2, 'as-needed'],
      'class-methods-use-this': 0,
      'comma-dangle': [2, 'always-multiline'],
      'import/imports-first': 0,
      'import/newline-after-import': 0,
      'import/no-dynamic-require': 0,
      'import/no-extraneous-dependencies': 0,
      'import/no-named-as-default': 0,
      'import/no-unresolved': 2,
      'import/no-webpack-loader-syntax': 0,
      'import/prefer-default-export': 0,
      indent: [
        2,
        2,
        {
          SwitchCase: 1,
        },
      ],
      'jsx-a11y/aria-props': 2,
      'jsx-a11y/heading-has-content': 0,
      'jsx-a11y/label-has-associated-control': [
        2,
        {
          controlComponents: ['Input'],
        },
      ],
      'jsx-a11y/label-has-for': 0,
      'jsx-a11y/alt-text': 0,
      'jsx-a11y/anchor-is-valid': 0,
      'jsx-a11y/aria-role': 0,
      'jsx-a11y/click-events-have-key-events': 0,
      'jsx-a11y/mouse-events-have-key-events': 0,
      'jsx-a11y/no-noninteractive-element-interactions': 0,
      'jsx-a11y/no-static-element-interactions': 0,
      'jsx-a11y/role-has-required-aria-props': 0,
      'jsx-a11y/role-supports-aria-props': 0,
      'max-len': 0,
      'newline-per-chained-call': 0,
      'no-confusing-arrow': 0,
      'no-console': 1,
      'no-param-reassign': 0,
      'no-unused-vars': 0,
      'no-unused-expressions': 0,
      'no-use-before-define': 0,
      'prefer-template': 2,
      'react/destructuring-assignment': 0,
      'react/jsx-closing-tag-location': 0,
      'react/jsx-first-prop-new-line': [2, 'multiline'],
      'react/jsx-filename-extension': 0,
      'react/jsx-no-target-blank': 0,
      'react/jsx-uses-vars': 2,
      'react/no-array-index-key': 0,
      'react/prefer-stateless-function': 0,
      'react/require-default-props': 0,
      'react/require-extension': 0,
      'react/self-closing-comp': 0,
      'react/sort-comp': 0,
      'react/jsx-props-no-spreading': 0,
      'react/static-property-placement': 0,
      'react/jsx-fragments': 0,
      'react/state-in-constructor': 0,
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/function-component-definition': 0,
      'react/jsx-no-useless-fragment': 0,
      'default-param-last': 0,
      'import/no-cycle': 0,
      'react/jsx-no-bind': 0,
      'import/extensions': 0,
      'import/no-import-module-exports': 0,
      'react/no-unknown-property': 0,
      'prefer-regex-literals': 0,
      'no-promise-executor-return': 0,
    },
    settings: {
      react: {
        version: 'detect',
      },
      'import/resolver': {
        webpack: {
          config: `${__dirname}/internals/webpack/webpack.prod.babel.js`,
        },
      },
    },
  },
  {
    ignores: ['internals/scripts/**', 'build/**', 'coverage/**', 'node_modules/**'],
  },
];