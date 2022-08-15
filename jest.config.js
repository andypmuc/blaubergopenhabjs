/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles:  [
    "./test/setupJest.js"
  ],
  testRegex: "\\.spec\\.ts$"
};