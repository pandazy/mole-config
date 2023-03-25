import yargs from 'yargs';

import { AllTypes } from './types';

type MainArgv = {
  t: (typeof AllTypes)[number];
  f: boolean;
};

export default function getArgv(): MainArgv {
  const { argv } = yargs
    .option('t', {
      alias: 'type',
      describe: 'The type of the project',
      choices: AllTypes,
    })
    .option('f', {
      hidden: true,
      alias: 'force',
      describe: 'Force extract config files even if the files already exist',
    })
    .option('h', {
      alias: 'help',
    })
    .strict();

  return argv as MainArgv;
}
