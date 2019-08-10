import defaultForm from './default-format';
import plainForm from './plain-format';

export default {
  default: (file1, file2) => defaultForm(file1, file2),
  plain: (file1, file2) => plainForm(file1, file2),
};
