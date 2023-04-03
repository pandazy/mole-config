import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { choices } from '@pandazy/monode/dist/qna';
import { log } from 'console';
import { untar } from './tars';
import { getDevDeps } from './dep-install';
import { hasGit, hasNpm } from './preq-check';
import updatePackageJSON from './update-package-json';
import getArgv from './argv';
import { getUserPath } from './paths';
import { AllTypes, ProjectType } from './types';

async function askProjectType(cmdType?: ProjectType): Promise<string> {
  if (cmdType) {
    return cmdType;
  }
  return choices('Which type of project is this?', AllTypes as string[]);
}

export default async function main(): Promise<void> {
  const argv = getArgv();

  if (!hasGit()) {
    log('Git is not initialized for this folder. Please run "git init" first.');
    return;
  }

  if (!hasNpm()) {
    log('Npm is not initialized for this folder. Please run "npm init" first.');
    return;
  }

  const projectType = (await askProjectType(argv.t)) as ProjectType;

  execSync(`yarn add --dev ${getDevDeps(projectType).join(' ')}`, {
    stdio: 'inherit',
  });
  updatePackageJSON();
  if (!existsSync(getUserPath('.husky'))) {
    execSync('yarn mole-husky', { stdio: 'inherit' });
  }

  untar(projectType, argv.f);
}
