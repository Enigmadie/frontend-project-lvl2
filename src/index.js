import fs from 'fs';
import { has } from 'lodash';

export default (fileBefore, fileAfter) => {
  const readFileBefore = fs.readFileSync(fileBefore);
  const readFileAfter = fs.readFileSync(fileAfter);

  const fileContentBefore = JSON.parse(readFileBefore);
  const fileContentAfter = JSON.parse(readFileAfter);

  const fileKeys = Object.keys({ ...fileContentBefore, ...fileContentAfter });

  const fileDiff = fileKeys.reduce((acc, el) => {
    if (!has(fileContentAfter, el)) {
      return `${acc}  - ${el}: ${fileContentBefore[el]}\n`;
    }
    if (fileContentBefore[el] === fileContentAfter[el]) {
      return `${acc}    ${el}: ${fileContentAfter[el]}\n`;
    }
    return (!has(fileContentBefore, el))
      ? `${acc}  + ${el}: ${fileContentAfter[el]}\n`
      : `${acc}  + ${el}: ${fileContentAfter[el]}\n  - ${el}: ${fileContentBefore[el]}\n`;
  }, '');

  return `{\n${fileDiff}}`;
};
