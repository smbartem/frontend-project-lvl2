import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  '.yml': yaml.safeLoad,
  '.ini': ini.decode,
  '.json': JSON.parse,
};

const parse = (extension, fileСontent) => parsers[extension](fileСontent);

export default parse;
