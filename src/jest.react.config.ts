import normalConfig from './jest.config';
import uniq from './uniq';

export default {
  ...normalConfig,
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: uniq(['<rootDir>/jest-setup.js']),
  transform: {
    ...(normalConfig.transform || {}),
    '^.+\\.css$': 'jest-transform-stub',
    '^.+\\.mdx?$': '@storybook/addon-docs/jest-transform-mdx',
  },
  moduleNameMapper: {
    ...(normalConfig.moduleNameMapper || {}),
    '.+\\.(css|styl|less|sass|scss)$': 'identity-obj-proxy',
    '.+\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/image-mock.js',
  },
  testPathIgnorePatterns: uniq(['node_modules', '.cache']),
  transformIgnorePatterns: uniq(['node_modules/(?!(gatsby)/)']),
  collectCoverageFrom: uniq([
    '**/src/**/*.{js,jsx,ts,tsx}',
    '!**/src/**/*.stories.{js,jsx,ts,tsx}',
    '!**/src/**/*index.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
  ]),
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
