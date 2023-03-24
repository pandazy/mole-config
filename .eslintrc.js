const moleEslint = require('@pandazy/mole-scripts/lib/eslint.config.js');

module.exports = {
  ...moleEslint,
  "parserOptions": {
    ...(moleEslint.parserOptions || {}),
    "project": "./tsconfig.json",
    "tsconfigRootDir": __dirname
  },
};
