const { getBabelAlias } = require('@pandazy/path-alias/dist/path-mapping');

module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-typescript'],
  plugins: [
    [
      'module-resolver',
      {
        alias: getBabelAlias(),
      },
    ],
  ],
  ignore: ['**/*.spec.ts'],
};
