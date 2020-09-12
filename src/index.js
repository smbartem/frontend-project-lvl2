import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const genDiff = (file1, file2) => {
  const beforeFile = fs.readFileSync(path.resolve(process.cwd(), file1), 'utf8');
  const afterFile = fs.readFileSync(path.resolve(process.cwd(), file2), 'utf8');
  const parseBeforeFile = JSON.parse(beforeFile);
  const parseAfterFile = JSON.parse(afterFile);
  const keys1 = _.keys(parseBeforeFile);
  const keys2 = _.keys(parseAfterFile);
  const keys = _.union(keys1, keys2).sort();
  let resultOfGenDiff = '';
  keys.forEach((key) => {
    if (!_.has(parseAfterFile, key)) {
      resultOfGenDiff += `  - ${key}: ${parseBeforeFile[key]}\n`;
    } else if (!_.has(parseBeforeFile, key)) {
      resultOfGenDiff += `  + ${key}: ${parseAfterFile[key]}\n`;
    } else if (parseBeforeFile[key] !== parseAfterFile[key]) {
      resultOfGenDiff += `  - ${key}: ${parseBeforeFile[key]}\n`;
      resultOfGenDiff += `  + ${key}: ${parseAfterFile[key]}\n`;
    } else {
      resultOfGenDiff += `    ${key}: ${parseBeforeFile[key]}\n`;
    }
  });
  return `{\n${resultOfGenDiff}}`;
};

export default genDiff;
