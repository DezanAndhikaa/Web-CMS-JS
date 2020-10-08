module.exports = {
  setupFilesAfterEnv: ["./src/setupTest.js"],
  testPathIgnorePatterns: ["/node_modules/"],

  clearMocks: true,

  collectCoverageFrom: ["src/**/*.{js,jsx,mjs}"],

  coverageDirectory: "coverage",

  testEnvironment: "jsdom",

  testMatch: ["**/__tests__/**/*.js?(x)", "/?(*.)+(spec|test).js?(x)"],

  testPathIgnorePatterns: ["\\\\node_modules\\\\"],

  testURL: "http://localhost",

  transformIgnorePatterns: ["<rootDir>/node_modules/"],

  verbose: false,
  moduleNameMapper: {
    ".+\\.(css|style|less|sass|scss|png|jpg|ttf|woff|woff2|gif)$":
      "identity-obj-proxy",
  },
  transform: {
    "^.+\\.(js|jsx)?$": "babel-jest",
  },
};
