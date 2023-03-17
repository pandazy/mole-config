const { default: moleEslint } = require('@pandazy/mole-config/dist/eslint.config.js');

module.exports = {
  ...moleEslint,
  "parserOptions": {
    ...(moleEslint.parserOptions || {}),
    "project": "./tsconfig.json",
    "tsconfigRootDir": __dirname
  },
};
