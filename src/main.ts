import { execSync } from 'child_process';
import { untar } from './tars';
import { getDevDeps } from './dep-install';
import { hasGit, hasNpm } from './preq-check';
import updatePackageJSON from './update-package-json';
import { ProjectType } from './types';

export default function main(argv: {
  type: ProjectType;
  force: boolean;
  skipYarnAdd: boolean;
}): void {
  if (!hasGit()) {
    console.log(
      'Git is not initialized for this folder. Please run "git init" first.'
    );
    return;
  }

  if (!hasNpm()) {
    console.log(
      'Npm is not initialized for this folder. Please run "npm init" first.'
    );
    return;
  }

  if (!argv.skipYarnAdd) {
    execSync(`yarn add --dev ${getDevDeps(argv.type).join(' ')}`, {
      stdio: 'inherit',
    });
    updatePackageJSON();
  }
  untar(argv.type, argv.force);
  execSync('npx @pandazy/path-alias', { stdio: 'inherit' });
}
