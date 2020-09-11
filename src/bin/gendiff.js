#!/usr/bin/env node --experimental-json-modules

import program from 'commander';
import pack from '../../package.json';
import genDiff from '../index.js';

program
  .description(pack.description)
  .helpOption('-h, --help', 'read more information')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((file1, file2) => {
    const difference = genDiff(file1, file2);
    console.log(difference);
  });

program.version(pack.version, '-v, --version');

program.parse(process.argv);