/* eslint-disable */
export default {
  displayName: 'node-example',
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
  coverageDirectory: '../../coverage/apps/node-example',
  transformIgnorePatterns: [
    // "../../node_modules/(?!chalk/.*)",
  ],
  moduleNameMapper: {
    '#(.*)': '<rootDir>/../../node_modules/$1',
  },
}
