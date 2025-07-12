export default {
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'mjs'],
  testMatch: ['**/?(*.)+(spec|test).[mj]s?(x)'],
  transform: {
    '^.+\\.m?js$': 'babel-jest',
  },
}; 