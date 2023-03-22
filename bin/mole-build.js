#!/usr/bin/env node

const { execSync } = require('child_process');
const { default: updateTsConfigPaths } = require('../dist/update-tsconfig-paths');

updateTsConfigPaths();
execSync([
  'rm -rf dist',
  'yarn tsc --build tsconfig-build.json',
  'yarn babel src --out-dir dist --extensions ".ts,.tsx"',
].join(' && '), { stdio: 'inherit' });
