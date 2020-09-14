import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';

const startParser = (file) => {
  if (path.extname(file).toLowerCase() === '.yml') {
    return yaml.load(fs.readFileSync(path.resolve(process.cwd(), file), 'utf8'));
  }
  if (path.extname(file).toLowerCase() === '.ini') {
    return ini.parse(fs.readFileSync(path.resolve(process.cwd(), file), 'utf8'));
  }
  return JSON.parse(fs.readFileSync(path.resolve(process.cwd(), file), 'utf8'));
};

export default startParser;
