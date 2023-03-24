import { execSync } from 'child_process';
import { untar } from './tars';
import { getDevDeps } from './dep-install';
import { hasGit, hasNpm } from './preq-check';
import updatePackageJSON from './update-package-json';
import { ProjectType } from './types';

export default function main(argv: {
  t: ProjectType;
  f: boolean;
  s: boolean;
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

  if (!argv.s) {
    execSync(`yarn add --dev ${getDevDeps(argv.t).join(' ')}`, {
      stdio: 'inherit',
    });
    updatePackageJSON();
  }
  untar(argv.t, argv.f);
  execSync('npx @pandazy/path-alias', { stdio: 'inherit' });
}
