#!/usr/bin/env node

const { execSync } = require('child_process');

execSync([
  'rm -rf dist',
  'npx @pandazy/path-alias',
  'yarn tsc --build tsconfig-build.json',
  'yarn babel src --out-dir dist --extensions ".ts,.tsx"',
].join(' && '), { stdio: 'inherit' });
