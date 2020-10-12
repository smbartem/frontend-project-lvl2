import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  '.yml': yaml.safeLoad,
  '.ini': ini.decode,
  '.json': JSON.parse,
};

const parse = (content, extension) => parsers[extension](content);

export default parse;
