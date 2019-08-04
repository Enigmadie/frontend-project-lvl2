import { has } from 'lodash';

export default (file1, file2) => {
  const fileKeys = Object.keys({ ...file1, ...file2 });

  const fileDiff = fileKeys.reduce((acc, el) => {
    if (!has(file2, el)) {
      return `${acc}  - ${el}: ${file1[el]}\n`;
    }
    if (file1[el] === file2[el]) {
      return `${acc}    ${el}: ${file2[el]}\n`;
    }
    return (!has(file1, el))
      ? `${acc}  + ${el}: ${file2[el]}\n`
      : `${acc}  + ${el}: ${file2[el]}\n  - ${el}: ${file1[el]}\n`;
  }, '');

  return `{\n${fileDiff}}`;
};
