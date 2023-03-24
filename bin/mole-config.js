#!/usr/bin/env node

const { execSync } = require('child_process');
const yargs = require('yargs');

const { untar } = require('../dist/tars');
const { AllTypes } = require('../dist/types');
const { getDevDeps } = require('../dist/dep-install.js');
const {
  default: updatePackageJSON,
} = require('../dist/update-package-json.js');

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
  .option('s', {
    type: 'boolean',
    alias: 'skipYarnAdd',
    default: false,
    describe: 'If specified, skip running yarn add --dev',
  })
  .option('h', {
    alias: 'help',
  })
  .strict();

if (!argv.s) {
  execSync(`yarn add --dev ${getDevDeps(argv.type).join(' ')}`, {
    stdio: 'inherit',
  });
  updatePackageJSON();
}
untar(argv.type, argv.force);
execSync('npx @pandazy/path-alias', { stdio: 'inherit' });
