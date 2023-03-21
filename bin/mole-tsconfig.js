#!/usr/bin/env node

const yargs = require('yargs');
const { AllTypes } = require('../dist/types');

const { updateTsconfigMole } = require("../dist/tars");
const { default: updateTsConfigPaths } = require('../dist/update-tsconfig-paths');

const { argv } = yargs
  .option('t', {
    alias: 'type',
    describe: 'The type of the project',
    choices: AllTypes,
    demandOption: true,
  })
  .strict();

updateTsconfigMole(argv.type);
updateTsConfigPaths();
