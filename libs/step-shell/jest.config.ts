/* eslint-disable */
export default {
  displayName: 'step-shell',
  preset: '../../jest.preset.js',
  globals: {},
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/step-shell',
  transformIgnorePatterns: [
    // "../../node_modules/(?!chalk/.*)",
  ],
  moduleNameMapper: {
    '#(.*)': '<rootDir>/../../node_modules/$1',
  },
}
