import { readFileSync } from 'fs';
import {
  getBabelAlias,
  getJestMapper,
  getResolvedPaths,
  getTsConfigPaths,
} from '~/path-mapping';

jest.mock('fs', () => ({
  readFileSync: jest.fn(),
}));

describe('path-mapping', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should getBabelAlias', () => {
    const expectedDefinition = {
      '@': './src',
      '@components': './src/components',
    };
    (readFileSync as jest.Mock).mockReturnValueOnce(
      JSON.stringify(expectedDefinition)
    );
    const alias = getBabelAlias();
    expect(alias).toEqual(expectedDefinition);
  });

  it('should getBabelAlias with empty file', () => {
    (readFileSync as jest.Mock).mockReturnValueOnce(undefined);
    const alias = getBabelAlias();
    expect(alias).toEqual({});
  });

  it('should getJestMapper', () => {
    const expectedDefinition = {
      '@': './src',
      '@components': './src/components/',
    };
    (readFileSync as jest.Mock).mockReturnValueOnce(
      JSON.stringify(expectedDefinition)
    );
    const alias = getJestMapper();
    expect(alias).toEqual({
      '^@/(.*)$': '<rootDir>/src/$1',
      '^@components/(.*)$': '<rootDir>/src/components/$1',
    });
  });

  it('should getJestMapper with empty file', () => {
    (readFileSync as jest.Mock).mockReturnValueOnce(undefined);
    const alias = getJestMapper();
    expect(alias).toEqual({});
  });

  it('should getTsConfigPaths', () => {
    const expectedDefinition = {
      '@': './src',
      '@components': './src/components/',
    };
    (readFileSync as jest.Mock).mockReturnValueOnce(
      JSON.stringify(expectedDefinition)
    );
    const alias = getTsConfigPaths();
    expect(alias).toEqual({
      '@/*': ['src/*'],
      '@components/*': ['src/components/*'],
    });
  });

  it('should getTsConfigPaths with empty file', () => {
    (readFileSync as jest.Mock).mockReturnValueOnce(undefined);
    const alias = getTsConfigPaths();
    expect(alias).toEqual({});
  });

  it('should getResolvedPaths', () => {
    const expectedDefinition = {
      '@': './src',
      '@components': './src/components/',
    };
    (readFileSync as jest.Mock).mockReturnValueOnce(
      JSON.stringify(expectedDefinition)
    );
    const alias = getResolvedPaths();
    expect(alias).toEqual({
      '@': `${process.cwd()}/src`,
      '@components': `${process.cwd()}/src/components`,
    });
  });
});
