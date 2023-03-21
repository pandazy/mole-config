import fs from 'fs';
import path from 'path';
import process from 'process';

export type MolePaths = Record<string, string>;

function readUserMapping(): MolePaths {
  const userFolder = path.resolve(process.cwd(), 'mole-paths.json');
  const molePathsContent = fs.readFileSync(userFolder, 'utf8');
  return molePathsContent ? JSON.parse(molePathsContent) : {};
}

export function getBabelAlias() {
  return readUserMapping();
}

function trimPathSlashes(path: string): string {
  return path.replace(/^\.\/|\/$/g, '');
}

export function getJestMapper() {
  return Object.entries(readUserMapping()).reduce(
    (acc, [alias, path]) => ({
      ...acc,
      [`^${alias}/(.*)$`]: `<rootDir>/${trimPathSlashes(path)}/$1`,
    }),
    {} as MolePaths
  );
}

export function getTsConfigPaths() {
  return Object.entries(readUserMapping()).reduce((acc, [alias, path]) => {
    return {
      ...acc,
      [`${trimPathSlashes(alias)}/*`]: [`./${trimPathSlashes(path)}/*`],
    };
  }, {});
}
