// без шебанга не работает передача аргументов скрипту gendiff при вызове из командной строки
// (например, gendiff -v не получает аргумент -v, но скрипт исполняется),
// а если написать node bin/gendiff.js -v все работает
import program from 'commander';
import genDiff from '../src/index.js';

program
  .version('1.0.1', '-v, --version')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'read more information')
  .option('-f, --format [type]', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((file1, file2) => {
    const difference = genDiff(file1, file2, program.format);
    console.log(difference);
  });

program.parse(process.argv);
