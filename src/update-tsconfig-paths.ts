import { getTsConfigPaths } from './path-mapping';
import fs from 'fs';
import { getUserPath } from './paths';

const ConfigFile = 'tsconfig-mole.json';

export default function updateTsConfigPaths() {
  const tsConfigPath = getUserPath(ConfigFile);
  const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, 'utf8'));
  const paths = getTsConfigPaths();
  if (Object.keys(paths).length > 0) {
    tsConfig.compilerOptions.paths = paths;
  }
  fs.writeFileSync(tsConfigPath, JSON.stringify(tsConfig, null, 2));
}
