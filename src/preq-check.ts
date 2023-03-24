import { existsSync } from 'fs';
import { getUserPath } from './paths';

export function hasGit(): boolean {
  return existsSync(getUserPath('.git'));
}

export function hasNpm(): boolean {
  return existsSync(getUserPath('package.json'));
}
