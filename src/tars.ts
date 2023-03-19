import fs from 'fs';
import path from 'path';
import { ProjectType } from './types';
import { execSync } from 'child_process';
import { getUserPath, getVendorPath } from './paths';

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
  const tarName = `${projectType}.tar.gz`;
  const srcConfigPath = getVendorPath('dist', tarName);
  const kpt = force ? '' : 'k';
  execSync(`tar -xz${kpt}f ${srcConfigPath} -C ${getUserPath('.')}`, {
    stdio: 'inherit',
  });
}
