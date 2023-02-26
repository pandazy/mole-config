module.exports = {
  'verbose': true,
  'roots': [
    './src'
  ],
  'transform': {
    '^.+\\.tsx?$': 'ts-jest'
  },
  'testRegex': '^.+\\.spec\\.tsx?$',
  'moduleFileExtensions': [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ],
  'moduleNameMapper': {
    '^@/(.*)': '<rootDir>/src/$1'
  }
};