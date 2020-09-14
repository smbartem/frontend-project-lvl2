import _ from 'lodash';
import startParser from './parsers.js';

const genDiff = (file1, file2) => {
  const parsingBeforeFile = startParser(file1);
  const parsingAfterFile = startParser(file2);
  const keys1 = _.keys(parsingBeforeFile);
  const keys2 = _.keys(parsingAfterFile);
  const keys = _.union(keys1, keys2).sort();
  let resultOfGenDiff = '';
  keys.forEach((key) => {
    if (!_.has(parsingAfterFile, key)) {
      resultOfGenDiff += `  - ${key}: ${parsingBeforeFile[key]}\n`;
    } else if (!_.has(parsingBeforeFile, key)) {
      resultOfGenDiff += `  + ${key}: ${parsingAfterFile[key]}\n`;
    } else if (parsingBeforeFile[key] !== parsingAfterFile[key]) {
      resultOfGenDiff += `  - ${key}: ${parsingBeforeFile[key]}\n`;
      resultOfGenDiff += `  + ${key}: ${parsingAfterFile[key]}\n`;
    } else {
      resultOfGenDiff += `    ${key}: ${parsingBeforeFile[key]}\n`;
    }
  });
  return `{\n${resultOfGenDiff}}`;
};

export default genDiff;
