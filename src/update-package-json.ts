import { readFileSync, writeFileSync } from 'fs';

const FixedSettings = {
  publishConfig: {
    registry: 'https://npm.pkg.github.com',
  },
  'lint-staged': {
    './src/**/*.{js,jsx,ts,tsx}': ['yarn mole-lint'],
    '**/*.{json,css,md}': ['prettier --write'],
  },
};

export default function updatePackageJSON(): void {
  const userPackageJSON = readFileSync(`${process.cwd()}/package.json`, 'utf8');
  if (!userPackageJSON) {
    return;
  }
  const userPackageJSONObj = JSON.parse(userPackageJSON) as Record<
    string,
    unknown
  >;
  if (Object.keys(FixedSettings).every((key) => key in userPackageJSONObj)) {
    return;
  }

  const updatedJSON = Object.entries(FixedSettings).reduce(
    (acc, [key, value]) => {
      if (key in userPackageJSONObj) {
        return acc;
      }
      return {
        ...acc,
        [key]: value,
      };
    },
    userPackageJSONObj
  );

  writeFileSync(
    `${process.cwd()}/package.json`,
    JSON.stringify(updatedJSON, null, 2),
    'utf8'
  );
}
