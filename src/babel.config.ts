import { getBabelAlias } from '@pandazy/path-alias/dist/path-mapping';

export default {
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
