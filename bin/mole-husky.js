#!/usr/bin/env node

const { execSync } = require('child_process');

execSync(
  [
    'yarn husky install',
    'yarn husky add .husky/commit-msg "yarn commitlint -e"',
    'yarn husky add .husky/pre-commit "yarn lint-staged"',
  ].join(' && '),
  {
    stdio: 'inherit',
  }
);
