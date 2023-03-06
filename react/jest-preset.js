const commonPresets = require('../jest-preset');

module.exports = {
  ...commonPresets,
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest-setup.js"],
  transform: {
    ...commonPresets.transform,
    '^.+\\.css$': 'jest-transform-stub',
    "^.+\\.mdx?$": "@storybook/addon-docs/jest-transform-mdx",
  },
  moduleNameMapper: {
    ...commonPresets.moduleNameMapper,
    ".+\\.(css|styl|less|sass|scss)$": "identity-obj-proxy",
    ".+\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/image-mock.js",
  },
  testPathIgnorePatterns: ["node_modules", ".cache"],
  transformIgnorePatterns: ["node_modules/(?!(gatsby)/)"],
  collectCoverageFrom: [
    "**/src/**/*.{js,jsx,ts,tsx}",
    "!**/src/**/*.stories.{js,jsx,ts,tsx}",
    "!**/src/**/*index.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
