module.exports = {
  env: {
    es6: true,
  },
  plugins: [
    //
    'import',
    '@typescript-eslint',
    'i18n',
    'unused-imports',
    'jest',
    'mobx',
    'testing-library',
  ],
  extends: [
    'prettier',
    'plugin:import/typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    // ts
    'prettier/prettier': 'warn',
    '@typescript-eslint/no-unnecessary-type-arguments': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    'no-irregular-whitespace': 'error',
    'no-useless-escape': 'error',
    // ! TODO: move back
    // 'i18n/no-russian-character': 'warn',
    'no-magic-numbers': 'off',
    'no-debugger': 'error',
    'no-console': 'off',
    curly: 'warn',
    'object-curly-spacing': ['warn', 'always'],
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/array-type': [
      'error',
      {
        'default:"array-simple"': null,
      },
    ],
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/consistent-type-definitions': 'error',
    '@typescript-eslint/member-ordering': [
      'warn',
      {
        default: [
          'signature',

          // Static
          'static-field',

          // TODO: find a way to structurize fields with private and public fields/methods
          // 'field',
          // 'method',

          // Constructor at bottom
          'private-constructor',
          'protected-constructor',
          'public-constructor',
        ],
      },
    ],
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-extra-non-null-assertion': 'error',
    '@typescript-eslint/no-floating-promises': [
      'error',
      {
        ignoreVoid: true,
      },
    ],
    '@typescript-eslint/no-for-in-array': 'error',
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',
    '@typescript-eslint/no-require-imports': 'off',
    '@typescript-eslint/no-throw-literal': 'error',
    '@typescript-eslint/no-unnecessary-boolean-literal-compare': 'error',
    '@typescript-eslint/prefer-as-const': 'error',
    '@typescript-eslint/prefer-for-of': 'error',
    '@typescript-eslint/prefer-includes': 'error',
    '@typescript-eslint/no-extraneous-class': 'warn',
    '@typescript-eslint/no-this-alias': 'error',
    '@typescript-eslint/prefer-optional-chain': 'warn',
    '@typescript-eslint/prefer-regexp-exec': 'warn',
    '@typescript-eslint/prefer-string-starts-ends-with': 'error',
    '@typescript-eslint/promise-function-async': 'error',
    '@typescript-eslint/switch-exhaustiveness-check': 'error',
    '@typescript-eslint/restrict-plus-operands': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'import/no-cycle': 'error',
    'import/no-useless-path-segments': 'error',
    'import/no-unused-modules': 'error',
    'import/order': [
      'error',
      {
        alphabetize: {
          order: 'asc',
        },
        'newlines-between': 'always',
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'unknown'],
        pathGroups: [
          {
            pattern: '~/**',
            group: 'internal',
          },
          {
            pattern: './**',
            group: 'sibling',
          },
        ],
      },
    ],
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'warn',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'jest/no-disabled-tests': 'off',
    'jest/no-focused-tests': 'warn',
    'jest/no-identical-title': 'warn',
    'jest/prefer-to-have-length': 'warn',
    'jest/valid-expect': 'warn',
    'jest/expect-expect': 'off',
    'jest/no-conditional-expect': 'warn',
    'jest/no-done-callback': 'warn',

    // mobx
    'mobx/exhaustive-make-observable': 'warn',
    'mobx/unconditional-make-observable': 'warn',
    'mobx/missing-make-observable': 'warn',
    'mobx/missing-observer': 'off', // TODO: should be enabled when refactoring ends

    // working incorrectly, because in React Native we always should cast to boolean in render
    'no-extra-boolean-cast': 'off',
  },
}
