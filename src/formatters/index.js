import jsonForm from './json-format';
import plainForm from './plain-format';

export default {
  json: (file1, file2) => jsonForm(file1, file2),
  plain: (file1, file2) => plainForm(file1, file2),
};
