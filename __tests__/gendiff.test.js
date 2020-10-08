import { test, expect } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const readFile = (fileName) => fs.readFileSync(path.resolve(process.cwd(), fileName), 'utf8');

const getFixturePath = () => '__tests__/__fixtures__/';

const fileExtensionsList = ['.json', '.yml', '.ini'];
const resultFormatStyleList = ['stylish', 'plain', 'json'];

resultFormatStyleList.forEach((format) => {
  const referenceFileContent = readFile(`${getFixturePath()}${format}FormateResult`);
  fileExtensionsList.forEach((extension) => {
    const pathToFile1 = `${getFixturePath()}treeFile1${extension}`;
    const pathToFile2 = `${getFixturePath()}treeFile2${extension}`;
    test(`Test '${extension}' files with '${format}' presentation format`, () => {
      expect(genDiff(pathToFile1, pathToFile2, format)).toEqual(referenceFileContent);
    });
  });
});
