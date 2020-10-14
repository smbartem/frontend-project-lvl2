import yaml from 'js-yaml';
import ini from 'ini';

const parsers = {
  yml: yaml.safeLoad,
  ini: ini.decode,
  json: JSON.parse,
};

const parse = (content, format) => parsers[format](content);

export default parse;
