import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const readFile = (file) => fs.readFileSync(path.resolve(process.cwd(), file), 'utf8');

const fileExtensionsList = ['.json', '.yml', '.ini'];
const resultFormatStyleList = ['stylish', 'plain', 'json'];

resultFormatStyleList.forEach((format) => {
  const ResultFile = readFile(`__tests__/__fixtures__/${format}FormateResult`);
  fileExtensionsList.forEach((extension) => {
    const pathToFile1 = `__tests__/__fixtures__/treeFile1${extension}`;
    const pathToFile2 = `__tests__/__fixtures__/treeFile2${extension}`;
    test(`Test '${extension}' files with '${format}' presentation format`, () => {
      expect(genDiff(pathToFile1, pathToFile2, format)).toEqual(ResultFile);
    });
  });
});
