import fs from 'fs';
import { execSync } from 'child_process';
import { getUserPath } from './paths';
import { getTsConfigPaths } from './path-mapping';

const ConfigFile = 'tsconfig-mole.json';

export default function updateTsConfigPaths() {
  const tsConfigPath = getUserPath(ConfigFile);
  const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, 'utf8'));
  const paths = getTsConfigPaths();
  if (Object.keys(paths).length > 0) {
    tsConfig.compilerOptions.paths = paths;
  }
  fs.writeFileSync(tsConfigPath, JSON.stringify(tsConfig, null, 2));
  execSync(`yarn prettier --write ${ConfigFile}`, { stdio: 'inherit' });
}
