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

/**
 * From the latest to the oldest in the dependency chain
 * The key is be the latest
 */
const TarDependencies: Record<ProjectType, ProjectType[]> = {
  lib: [],
  'lib-react': ['lib'],
  'app-react': ['lib'],
  'app-rest': [],
};

export function untar(projectType: ProjectType, force = false) {
  const kpt = force ? '' : 'k';
  const configNames = [projectType, ...TarDependencies[projectType]];
  const destPath = getUserPath('.');
  configNames.forEach((configName) => {
    const tarName = `${configName}.tar.gz`;
    const srcConfigPath = getVendorPath('dist', tarName);
    execSync(`tar -xz${kpt}f ${srcConfigPath} -C ${destPath}`, {
      stdio: 'inherit',
    });
  });
}
