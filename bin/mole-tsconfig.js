#!/usr/bin/env node

const yargs = require('yargs');
const { AllTypes } = require('../dist/types');
const { execSync } = require('child_process');
const { getDevDeps } = require('../dist/dep-install.js');

const { updateTsconfigMole } = require('../dist/tars');
const {
  default: updateTsConfigPaths,
} = require('../dist/update-tsconfig-paths');

const { argv } = yargs
  .option('t', {
    alias: 'type',
    describe: 'The type of the project',
    choices: AllTypes,
    demandOption: true,
  })
  .option('h', {
    alias: 'help',
  })
  .strict();

updateTsconfigMole(argv.type);
updateTsConfigPaths();
execSync(`yarn add --dev ${getDevDeps(argv.type).join(' ')}`, {
  stdio: 'inherit',
});
