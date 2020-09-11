#!/usr/bin/env node --experimental-json-modules

import program from 'commander';
import pack from '../package.json';

program
  .description(pack.description)
  .helpOption('-h, --help', 'read more information')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>');

program.version(pack.version, '-v, --version');

program.parse(process.argv);