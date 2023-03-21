import { ProjectType } from './types';

export type DepType =
  | 'babel'
  | 'jest'
  | 'typescript'
  | 'eslint'
  | 'eslintReactAddon'
  | 'gitHooks';

const DepsMap: Record<DepType, string[]> = {
  babel: [
    '@babel/cli',
    '@babel/core',
    '@babel/preset-env',
    '@babel/preset-typescript',
    'babel-plugin-module-resolver',
  ],
  jest: ['@types/jest', 'jest', 'ts-jest'],
  typescript: ['@types/node', 'typescript', 'ts-node', 'ts-lib'],
  eslint: [
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
  ],
  'eslintReactAddon': [
    'eslint-plugin-testing-library',
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
    'eslint-plugin-jsx-a11y',
  ],
  gitHooks: [
    'husky',
    'lint-staged',
    '@commitlint/cli',
    '@commitlint/config-conventional',
  ],
};

export const getDepsByTech = (tech: DepType) => DepsMap[tech].slice(0);

const BasicDevDeps = [
  ...DepsMap['babel'],
  ...DepsMap['jest'],
  ...DepsMap['typescript'],
  ...DepsMap['eslint'],
  ...DepsMap['gitHooks'],
];

const InstallMap: Record<ProjectType, readonly string[]> = {
  lib: BasicDevDeps,
  'lib-react': [...BasicDevDeps, ...DepsMap['eslintReactAddon']],
  'app-react': [...BasicDevDeps, ...DepsMap['eslintReactAddon']],
  'app-rest': BasicDevDeps,
};

export const getDevDeps = (projectType: ProjectType) =>
  InstallMap[projectType].slice(0);
