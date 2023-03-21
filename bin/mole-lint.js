#!/usr/bin/env node

const { execSync } = require('child_process');

execSync(
  [
    'yarn prettier --write ./*.json src/*.ts src/**/*.ts',
    'yarn eslint "src/**" --ext .ts,.tsx --fix',
  ].join(' && '),
  { stdio: 'inherit' }
);
