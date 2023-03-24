import { ProjectType } from './types';

export type DepType =
  | 'mole'
  | 'babel'
  | 'jest'
  | 'typescript'
  | 'eslint'
  | 'gitHooks';

const DepsMap: Record<DepType, string[]> = {
  mole: ['@pandazy/mole-scripts', '@pandazy/mole-config'],
  babel: [
    '@babel/cli',
    '@babel/core',
    '@babel/preset-env',
    '@babel/preset-typescript',
    'babel-plugin-module-resolver',
    '@pandazy/path-alias',
  ],
  jest: ['@types/jest', 'jest', 'ts-jest'],
  typescript: [
    '@types/node',
    'typescript',
    'ts-node',
    'ts-lib',
    'tsconfig-paths',
  ],
  eslint: [
    'eslint',
    '@typescript-eslint/eslint-plugin',
    '@typescript-eslint/parser',
    'prettier',
    'eslint-config-prettier',
    'eslint-plugin-prettier',
    'eslint-plugin-import',
    'eslint-config-airbnb',
    'eslint-config-airbnb-typescript',
    'eslint-import-resolver-typescript',
    'eslint-plugin-jest',
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

export const getDepsByTech = (tech: DepType): string[] =>
  DepsMap[tech].slice(0);

const BasicDevDeps = [
  ...DepsMap.mole,
  ...DepsMap.babel,
  ...DepsMap.jest,
  ...DepsMap.typescript,
  ...DepsMap.eslint,
  ...DepsMap.gitHooks,
];

const InstallMap: Record<ProjectType, readonly string[]> = {
  lib: BasicDevDeps,
  'lib-react': BasicDevDeps,
  'app-react': BasicDevDeps,
  'app-rest': BasicDevDeps,
};

export const getDevDeps = (projectType: ProjectType): string[] =>
  InstallMap[projectType].slice(0);
