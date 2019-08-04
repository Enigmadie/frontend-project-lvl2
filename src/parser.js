import yml from 'js-yaml';

export default {
  '.json': file => JSON.parse(file),
  '.yml': file => yml.safeLoadAll(file)[0],
};
