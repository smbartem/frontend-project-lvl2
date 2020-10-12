import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const readFile = (fileName) => fs.readFileSync(path.resolve(process.cwd(), fileName), 'utf8');

const getFixturePath = (fileName) => `__tests__/__fixtures__/${fileName}`;

const fileExtensionsList = ['.json', '.yml', '.ini'];
const resultFormatStyleList = ['stylish', 'plain', 'json'];

resultFormatStyleList.forEach((format) => {
  const referenceFileContent = readFile(`${getFixturePath('result')}_${format}`);
  fileExtensionsList.forEach((extension) => {
    const pathToFile1 = `${getFixturePath('file1')}${extension}`;
    const pathToFile2 = `${getFixturePath('file2')}${extension}`;
    test(`Test '${extension}' files with '${format}' presentation format`, () => {
      expect(genDiff(pathToFile1, pathToFile2, format)).toEqual(referenceFileContent);
    });
  });
});
