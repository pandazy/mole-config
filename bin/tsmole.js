#!/usr/bin/env node
const yargs = require('yargs');

const { updateTsconfigMole } = require("../dist/tars");

const { argv } = yargs
  .option('t', {
    alias: 'type',
    describe: 'The type of the project',
    choices: AllTypes,
    demandOption: true,
  })
  .strict();

updateTsconfigMole(argv.type);
