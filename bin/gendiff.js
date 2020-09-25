#!/usr/bin/env node --experimental-json-modules
import program from 'commander';
import pack from '../package.json';
import genDiff from '../src/index.js';

program
  .version(pack.version, '-v, --version')
  .description(pack.description)
  .helpOption('-h, --help', 'read more information')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((file1, file2) => {
    const difference = genDiff(file1, file2, program.format);
    console.log(difference);
  });

program.parse(process.argv);
