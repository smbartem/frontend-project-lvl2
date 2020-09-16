import _ from 'lodash';
import startParser from './parsers.js';
import render from './formaters/index.js';

const makeDiffTree = (object1, object2) => {
  const keys = _.union(_.keys(object1), _.keys(object2)).sort();
  return keys.map((key) => {
    if (!_.has(object1, key)) {
      return { key, value: object2[key], status: 'added' };
    }
    if (!_.has(object2, key)) {
      return { key, value: object1[key], status: 'deleted' };
    }
    if (object1[key] === object2[key]) {
      return { key, value: object1[key], status: 'unmodified' };
    }
    if (!_.isObject(object1[key]) || !_.isObject(object2[key])) {
      return {
        key, previousValue: object1[key], presentValue: object2[key], status: 'modified',
      };
    }
    return { key, treeChild: makeDiffTree(object1[key], object2[key]), status: 'hasInnerTree' };
  });
};

const genDiff = (file1, file2, outputFormat = 'stylish') => {
  const parsingBeforeFile = startParser(file1);
  const parsingAfterFile = startParser(file2);
  const diffTree = makeDiffTree(parsingBeforeFile, parsingAfterFile);
  return render(diffTree, outputFormat);
};

export default genDiff;
