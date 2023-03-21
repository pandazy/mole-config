import { getJestMapper } from './path-mapping';
import { defaults } from 'ts-jest/presets';
import uniq from './uniq';

export default {
  ...defaults,
  verbose: true,
  preset: 'ts-jest',
  roots: ['src'],
  transform: {
    ...(defaults?.transform ?? {}),
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '^.+\\.spec\\.tsx?$',
  moduleFileExtensions: uniq([
    ...(defaults.moduleFileExtensions ?? []),
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
  ]),
  testEnvironment: 'node',
  moduleNameMapper: getJestMapper(),
};
