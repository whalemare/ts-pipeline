module.exports = {
  env: {
    es6: true,
  },
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
  plugins: ['import', '@typescript-eslint', 'i18n', 'unused-imports', 'jest'],
  rules: {
    'react-hooks/rules-of-hooks': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    'react/no-unescaped-entities': [
      'warn',
      {
        forbid: [
          { char: '>', alternatives: ['&gt;'] },
          { char: '}', alternatives: ['&#125;'] },
        ],
      },
    ],
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'react/no-set-state': 'error',
    'react/no-array-index-key': 'error',
    'react/no-danger-with-children': 'warn',
    'react/no-deprecated': 'warn',
    'react/no-redundant-should-component-update': 'error',
    'react/no-string-refs': 'error',
    'react/prefer-stateless-function': 'warn',
    'react/self-closing-comp': [
      'error',
      {
        component: true,
        html: true,
      },
    ],
    'react/jsx-boolean-value': ['error', 'never'],
    'react/jsx-curly-brace-presence': ['error', 'never'],
    'react/jsx-fragments': 'warn',
    'react/jsx-key': 'error',
    'react/jsx-no-useless-fragment': 'off',
    'react/jsx-pascal-case': 'error',
    'react/jsx-sort-props': [
      'error',
      {
        shorthandFirst: true,
        callbacksLast: true,
      },
    ],
    'react/jsx-no-bind': ['off'],
  },
}
