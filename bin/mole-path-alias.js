#!/usr/bin/env node

const { execSync } = require('child_process');

const { default: updateTsConfigPaths } = require('../dist/update-tsconfig-paths');
updateTsConfigPaths();
execSync('yarn prettier --write tsconfig-mole.json', { stdio: 'inherit' });
