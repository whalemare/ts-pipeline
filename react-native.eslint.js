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
  rules: {},
}
