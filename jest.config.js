module.exports = { 
    setupFilesAfterEnv : ["<rootDir>/setupTest.js"],
    testPathIgnorePatterns: [
        "/node_modules/"
    ],
  clearMocks: true,

  collectCoverageFrom: ['<rootDir>/**/*.{js,jsx,mjs}'],

  coverageDirectory: 'coverage',

  moduleFileExtensions: ['js', 'json', 'jsx'],

  testEnvironment: 'jsdom',

  testMatch: ['**/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],

  testPathIgnorePatterns: ['\\\\node_modules\\\\'],

  testURL: 'http://localhost',

  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  
  verbose: false,
}