#!/usr/bin/env node

const { execSync } = require('child_process');

const yargs = require('yargs');

const { argv } = yargs
  .option('s', {
    type: 'boolean',
    alias: 'skipBuild',
    default: false,
    describe: 'If specified, skip building the code',
  })
  .option('h', {
    alias: 'help',
  })
  .strict();

execSync(
  [
    ...(argv.s ? [] : ['yarn mole-build']),
    'yarn mole-lint',
    'rm -rf coverage',
    'yarn jest --clearCache',
    'yarn jest --coverage',
    'yarn publish',
    'git clean -fd',
  ].join(' && '),
  { stdio: 'inherit' }
);
