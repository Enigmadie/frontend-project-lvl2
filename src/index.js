import fs from 'fs';
import { has } from 'lodash';

const pathSelect = path => (
  (path[0] === '/')
    ? fs.readFileSync(`${__dirname}${path}`)
    : fs.readFileSync(path));

export default (fileBefore, fileAfter) => {
  const readFileBefore = pathSelect(fileBefore);
  const readFileAfter = pathSelect(fileAfter);

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
