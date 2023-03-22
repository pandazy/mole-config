#!/usr/bin/env node

const {
  default: updatePackageJSON,
} = require('../dist/update-package-json.js');

updatePackageJSON();
