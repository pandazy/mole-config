import { ObjectEncodingOptions, readdirSync } from 'fs';
import { chdir, cwd } from 'process';
import { execSync } from 'child_process';
import { getVendorPath } from '~/paths';
import { tar, untar } from '~/tars';

jest.mock('child_process', () => ({
  execSync: jest.fn(),
}));

jest.mock('fs', () => ({
  readdirSync: jest.fn(),
}));

jest.mock('path', () => ({
  resolve: jest
    .fn()
    .mockImplementation((...args: string[]) => ['@', ...args].join('/')),
}));

jest.mock('process', () => ({
  cwd: jest.fn(),
  chdir: jest.fn(),
}));

jest.mock('~/paths', () => ({
  getVendorPath: jest.fn(),
  getRoot: jest.fn().mockReturnValue('@'),
}));

describe('tars', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (getVendorPath as jest.Mock).mockImplementation((...args: string[]) =>
      ['ROOT', ...args].join('/')
    );
    (cwd as jest.Mock).mockReturnValue('walter/white');
  });

  it('should tar', () => {
    const mockFolders = [
      { isDirectory: (): boolean => true, name: 'lib' },
      { isDirectory: (): boolean => true, name: 'lib-react' },
    ];
    const mockFiles = ['.gitignore', '.eslintignore', 'babel.config.js'];

    (readdirSync as jest.Mock).mockImplementation(
      (_, options: ObjectEncodingOptions) => (options ? mockFolders : mockFiles)
    );
    tar();

    expect(readdirSync).toBeCalledTimes(3);
    expect(readdirSync).toHaveBeenNthCalledWith(1, 'ROOT/user-configs', {
      withFileTypes: true,
    });
    expect(chdir).toHaveBeenNthCalledWith(1, '@/ROOT/user-configs/lib');
    expect(chdir).toHaveBeenNthCalledWith(2, '@/ROOT/user-configs/lib-react');
    [2, 3].forEach((nth) => {
      expect(readdirSync).toHaveBeenNthCalledWith(nth, '.');
    });
    expect(execSync).toHaveBeenNthCalledWith(
      1,
      'tar -czf @/ROOT/dist/lib.tar.gz ' +
        '.gitignore .eslintignore babel.config.js',
      { stdio: 'inherit' }
    );
    expect(execSync).toHaveBeenNthCalledWith(
      2,
      'tar -czf @/ROOT/dist/lib-react.tar.gz ' +
        '.gitignore .eslintignore babel.config.js',
      { stdio: 'inherit' }
    );
  });

  it('should tar nothing if no user-configs folders are found', () => {
    (readdirSync as jest.Mock).mockImplementation(
      (_, options: ObjectEncodingOptions) =>
        options
          ? [
            { isDirectory: (): boolean => false, name: 'lib.ts' },
            { isDirectory: (): boolean => false, name: 'lib-react.ts' },
          ]
          : []
    );
    tar();

    expect(readdirSync).toBeCalledTimes(1);
    expect(readdirSync).toHaveBeenNthCalledWith(1, 'ROOT/user-configs', {
      withFileTypes: true,
    });
    expect(execSync).not.toBeCalled();
  });

  it('should untar', () => {
    untar('lib');
    expect(execSync).toBeCalledTimes(1);
    expect(execSync).toHaveBeenCalledWith('tar -xzkf ROOT/dist/lib.tar.gz', {
      stdio: 'inherit',
    });
  });

  it('should untar by force', () => {
    untar('lib', true);
    expect(execSync).toHaveBeenCalledWith('tar -xzf ROOT/dist/lib.tar.gz', {
      stdio: 'inherit',
    });
  });
});
