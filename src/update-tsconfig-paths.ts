import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { getUserPath } from './paths';
import { getTsConfigPaths } from './path-mapping';

const ConfigFile = 'tsconfig-mole.json';

interface Tsconfig {
  compilerOptions: {
    paths: Record<string, string[]>;
  };
}

export default function updateTsConfigPaths(): void {
  const tsConfigPath = getUserPath(ConfigFile);
  const tsConfig = JSON.parse(readFileSync(tsConfigPath, 'utf8')) as Tsconfig;
  const paths = getTsConfigPaths();
  if (Object.keys(paths).length > 0) {
    tsConfig.compilerOptions.paths = paths;
  }
  writeFileSync(tsConfigPath, JSON.stringify(tsConfig, null, 2));
  execSync(`yarn prettier --write ${ConfigFile}`, { stdio: 'inherit' });
}
