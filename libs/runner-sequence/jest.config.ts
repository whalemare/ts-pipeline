/* eslint-disable */
export default {
  displayName: 'step-increment',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/libs/step-increment',
  transformIgnorePatterns: [
    // "../../node_modules/(?!chalk/.*)",
  ],
  moduleNameMapper: {
    '#(.*)': '<rootDir>/../../node_modules/$1',
  },
}
