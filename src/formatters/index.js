import defaultFormat from './default-format';
import plainFormat from './plain-format';
import jsonFormat from './json-format';

export default {
  default: (file1, file2) => defaultFormat(file1, file2),
  plain: (file1, file2) => plainFormat(file1, file2),
  json: (file1, file2) => jsonFormat(file1, file2),
};
