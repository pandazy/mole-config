export const babelDeps = [
  '@babel/cli',
  '@babel/core',
  '@babel/preset-env',
  '@babel/preset-typescript',
  'babel-plugin-module-resolver',
];

export const jestDeps = ['@types/jest', 'jest', 'ts-jest'];

export const tsDeps = ['@types/node', 'typescript', 'ts-node', 'ts-lib'];

export const eslintDeps = [
  'eslint',
  '@typescript-eslint/eslint-plugin',
  '@typescript-eslint/parser',
  'eslint-config-prettier',
  'eslint-plugin-prettier',
  'prettier',
  'eslint-plugin-import',
  'eslint-config-airbnb',
  'eslint-config-airbnb-typescript',
  'eslint-import-resolver-typescript',
  'eslint-plugin-jest',
];

export const eslintReactDeps = [
  'eslint-plugin-testing-library',
  'eslint-plugin-react',
  'eslint-plugin-react-hooks',
  'eslint-plugin-jsx-a11y',
];

export const gitHooksDeps = [
  'husky',
  'lint-staged',
  '@commitlint/cli',
  '@commitlint/config-conventional',
];
