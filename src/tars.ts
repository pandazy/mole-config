import fs from 'fs';
import path from 'path';
import { ProjectType } from './types';
import { execSync } from 'child_process';
import { getVendorPath } from './paths';
import { TypeDependencies } from './type-deps';

const getTarName = (dirName: string) => `${dirName}.tar.gz`;

export function tar() {
  const srcConfigPath = getVendorPath('user-configs');
  const distPath = getVendorPath('dist');
  fs.readdirSync(srcConfigPath, { withFileTypes: true }).forEach((dir) => {
    if (!dir.isDirectory) {
      return;
    }

    const tarName = getTarName(dir.name);
    const destPath = path.resolve(distPath, tarName);
    const tarCwd = path.resolve(srcConfigPath, dir.name);
    process.chdir(tarCwd);
    const filesToZip = fs.readdirSync('.').join(' ');
    execSync(`tar -czf ${destPath} ${filesToZip}`, { stdio: 'inherit' });
  });
}

export function untar(projectType: ProjectType, force = false) {
  const kpt = force ? '' : 'k';
  const configNames = [projectType, ...TypeDependencies[projectType]];
  configNames.forEach((configName) => {
    const tarName = `${configName}.tar.gz`;
    const srcConfigPath = getVendorPath('dist', tarName);
    execSync(`tar -xz${kpt}f ${srcConfigPath}`, {
      stdio: 'inherit',
    });
  });
}

export function updateTsconfigMole(projectType: ProjectType) {
  const tarName = `${projectType}.tar.gz`;
  const srcConfigPath = getVendorPath('dist', tarName);
  execSync(`tar -xzf ${srcConfigPath} tsconfig-mole.json`, {
    stdio: 'inherit',
  });
}
