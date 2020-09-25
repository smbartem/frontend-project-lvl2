import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const readFile = (file) => fs.readFileSync(path.resolve(process.cwd(), file), 'utf8');

test.each([
  ['json', 'stylish'],
  ['yml', 'stylish'],
  ['ini', 'stylish'],
  ['json', 'plain'],
  ['yml', 'plain'],
  ['ini', 'plain'],
  ['json', 'json'],
  ['yml', 'json'],
  ['ini', 'json'],
])('Testing gendiff', (formatOfFile, formatOfResult) => {
  const pathToFile1 = `__tests__/__fixtures__/treeFile1.${formatOfFile}`;
  const pathToFile2 = `__tests__/__fixtures__/treeFile2.${formatOfFile}`;
  const results = ['__tests__/__fixtures__/jsonFormateResult.json', '__tests__/__fixtures__/plainFormateResult.txt', '__tests__/__fixtures__/stylishFormateResult.txt'];
  const nameOfResultFile = results.filter((result) => result.includes(`${formatOfResult}`)).join();
  const expected = readFile(nameOfResultFile);
  expect(genDiff(pathToFile1, pathToFile2, formatOfResult)).toEqual(expected);
});
