import yml from 'js-yaml';
import ini from 'ini';

export default {
  '.json': file => JSON.parse(file),
  '.yml': file => yml.safeLoadAll(file)[0],
  '.ini': file => ini.parse(file),
};
