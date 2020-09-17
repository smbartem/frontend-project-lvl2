import _ from 'lodash';
import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

const renderOption = {
  stylish,
  plain,
  json,
};

const render = (data, outputFormat) => {
  if (_.has(renderOption, outputFormat)) {
    return renderOption[outputFormat](data);
  }
  return renderOption.stylish(data);
};
export default render;
