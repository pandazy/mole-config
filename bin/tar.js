#!/usr/bin/env node
const { tar } = require('../dist/tars.js');
const { default: updateTsConfigPaths } = require('../dist/update-tsconfig-paths');

tar();
