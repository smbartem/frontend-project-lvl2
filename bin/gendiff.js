import program from 'commander';
import genDiff from '../src/index.js';
import packageJson from '../package.json';

program
  .version(packageJson.version, '-v, --version')
  .description(packageJson.description)
  .helpOption('-h, --help', 'read more information')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((fileName1, fileName2) => {
    const difference = genDiff(fileName1, fileName2, program.format);
    console.log(difference);
  });

program.parse(process.argv);
