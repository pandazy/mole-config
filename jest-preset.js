const { defaults: tsjPreset } = require('ts-jest/presets')

module.exports = {
  verbose: true,
  preset: 'ts-jest',
  roots: [
    './src'
  ],
  transform: {
    ...tsjPreset.transform,
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '^.+\\.spec\\.tsx?$',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ],
  testEnvironment: "node",
};
