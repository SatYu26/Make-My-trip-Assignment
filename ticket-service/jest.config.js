module.exports = {
  testEnvironment: 'node',
  coverageDirectory: 'coverage',
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,ts}',
    '!**/node_modules/**'
  ],
  testMatch: [
    '**/__tests__/**/*.+(js|ts)',
    '**/?(*.)(spec|test)+(.js|ts)'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  }
};