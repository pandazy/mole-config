import { readdirSync } from 'fs';
import { resolve } from 'path';
import process from 'process';
import { execSync } from 'child_process';
import { ProjectType } from '~/types';
import { getVendorPath } from '~/paths';
import TypeDependencies from '~/type-deps';

const getTarName = (dirName: string): string => `${dirName}.tar.gz`;

export function tar(): void {
  const srcConfigPath = getVendorPath('user-configs');
  const distPath = getVendorPath('dist');
  readdirSync(srcConfigPath, { withFileTypes: true }).forEach((dir) => {
    if (!dir.isDirectory()) {
      return;
    }

    const tarName = getTarName(dir.name);
    const destPath = resolve(distPath, tarName);
    const tarDir = resolve(srcConfigPath, dir.name);
    process.chdir(tarDir);
    const filesToZip = readdirSync('.').join(' ');
    execSync(`tar -czf ${destPath} ${filesToZip}`, { stdio: 'inherit' });
  });
}

export function untar(projectType: ProjectType, force = false): void {
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
