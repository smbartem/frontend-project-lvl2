import _ from 'lodash';
import stylish from './stylish.js';
import plain from './plain.js';

const renderOption = {
  stylish,
  plain,
};

const render = (data, outputFormat) => {
  if (_.has(renderOption, outputFormat)) {
    return renderOption[outputFormat](data);
  }
  return renderOption.stylish(data);
};
export default render;
