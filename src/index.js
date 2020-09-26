import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import render from './formaters/index.js';

const parseFile = (pathToFile) => {
  const extension = path.extname(pathToFile).toLowerCase();
  const fileСontent = fs.readFileSync(path.resolve(process.cwd(), pathToFile), 'utf8');
  return parse(extension, fileСontent);
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
    if ((!_.isObject(object1[key]) || !_.isObject(object2[key])) && object1[key] !== object2[key]) {
      return {
        key, previousValue: object1[key], presentValue: object2[key], status: 'modified',
      };
    }
    if (_.isObject(object1[key]) && _.isObject(object2[key])) {
      return { key, treeChild: makeDiffTree(object1[key], object2[key]), status: 'nested' };
    }
    return { key, value: object1[key], status: 'unmodified' };
  });
};

const genDiff = (pathToFile1, pathToFile2, outputFormat = 'stylish') => {
  const parsingBeforeFile = parseFile(pathToFile1);
  const parsingAfterFile = parseFile(pathToFile2);
  const diffTree = makeDiffTree(parsingBeforeFile, parsingAfterFile);
  return render(diffTree, outputFormat);
};

export default genDiff;
