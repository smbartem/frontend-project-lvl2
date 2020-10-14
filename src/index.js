import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import render from './formaters/index.js';

const parseFile = (pathToFile) => {
  const format = path.extname(pathToFile).toLowerCase().slice(1);
  const content = fs.readFileSync(path.resolve(process.cwd(), pathToFile), 'utf8');
  return parse(content, format);
};

const makeDiffTree = (object1, object2) => {
  const keys = _.sortBy(_.union(_.keys(object1), _.keys(object2)));
  return keys.map((key) => {
    if (!_.has(object1, key)) {
      return { key, value: object2[key], status: 'added' };
    }
    if (!_.has(object2, key)) {
      return { key, value: object1[key], status: 'deleted' };
    }
    if (_.isPlainObject(object1[key]) && _.isPlainObject(object2[key])) {
      return { key, children: makeDiffTree(object1[key], object2[key]), status: 'nested' };
    }
    if (object1[key] !== object2[key]) {
      return {
        key, firstObjectValue: object1[key], secondObjectValue: object2[key], status: 'modified',
      };
    }
    return { key, value: object1[key], status: 'unmodified' };
  });
};

const genDiff = (pathToFile1, pathToFile2, outputFormat = 'stylish') => {
  const data1 = parseFile(pathToFile1);
  const data2 = parseFile(pathToFile2);
  const diffTree = makeDiffTree(data1, data2);
  return render(diffTree, outputFormat);
};

export default genDiff;
