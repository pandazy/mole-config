#!/usr/bin/env node

const yargs = require('yargs');
const { untar } = require('../dist/tars');
const { AllTypes } = require('../dist/types');
const { default: updateTsConfigPaths } = require('../dist/update-tsconfig-paths');

const { argv } = yargs
  .option('t', {
    alias: 'type',
    describe: 'The type of the project',
    choices: AllTypes,
    demandOption: true,
  })
  .option('f', {
    hidden: true,
    alias: 'force',
    describe: 'Force extract config files even if the files already exist',
  })
  .option('h', {
    alias: 'help',
  })
  .strict();

untar(argv.type, argv.force);
updateTsConfigPaths();
