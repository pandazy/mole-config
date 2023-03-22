import { readFileSync, writeFileSync } from 'fs';

import updatePackageJSON from '~/update-package-json';

jest.mock('fs', () => ({
  readFileSync: jest.fn(),
  writeFileSync: jest.fn(),
}));

describe('updatePackageJson', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should update package.json', () => {
    (readFileSync as jest.Mock).mockReturnValueOnce(
      JSON.stringify({
        name: 'test',
        version: '1.0.0',
      })
    );
    updatePackageJSON();
    expect(readFileSync).toHaveBeenCalledWith(
      `${process.cwd()}/package.json`,
      'utf8'
    );
    expect(writeFileSync).toHaveBeenCalledWith(
      `${process.cwd()}/package.json`,
      JSON.stringify(
        {
          name: 'test',
          version: '1.0.0',
          publishConfig: {
            registry: 'https://npm.pkg.github.com',
          },
          'lint-staged': {
            './src/**/*.{js,jsx,ts,tsx}': ['yarn mole-lint'],
            '**/*.{json,css,md}': ['prettier --write'],
          },
        },
        null,
        2
      ),
      'utf8'
    );
  });

  it('should skip update package.json if user already defined fields', () => {
    (readFileSync as jest.Mock).mockReturnValueOnce(
      JSON.stringify({
        name: 'test',
        version: '1.0.0',
        publishConfig: {
          registry: 'https://npm.pkg.github.com',
        },
        'lint-staged': {
          './src/**/*.{js,jsx,ts,tsx}': ['yarn mole-lint'],
          '**/*.{json,css,md}': ['prettier --write'],
        },
      })
    );
    updatePackageJSON();
    expect(readFileSync).toHaveBeenCalledWith(
      `${process.cwd()}/package.json`,
      'utf8'
    );
    expect(writeFileSync).not.toHaveBeenCalled();
  });

  it('should skip update package.json if package.json is empty', () => {
    (readFileSync as jest.Mock).mockReturnValueOnce(undefined);
    updatePackageJSON();
    expect(writeFileSync).not.toHaveBeenCalled();
  });

  it('should partially update the package only if the field does not exist', () => {
    (readFileSync as jest.Mock).mockReturnValueOnce(
      JSON.stringify({
        name: 'test',
        version: '1.0.0',
        publishConfig: {
          registry: 'https://npm.pkg.github.com',
        },
      })
    );
    updatePackageJSON();
    expect(writeFileSync).toHaveBeenCalledWith(
      `${process.cwd()}/package.json`,
      JSON.stringify(
        {
          name: 'test',
          version: '1.0.0',
          publishConfig: {
            registry: 'https://npm.pkg.github.com',
          },
          'lint-staged': {
            './src/**/*.{js,jsx,ts,tsx}': ['yarn mole-lint'],
            '**/*.{json,css,md}': ['prettier --write'],
          },
        },
        null,
        2
      ),
      'utf8'
    );
  });
});
