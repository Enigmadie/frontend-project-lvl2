import fs from 'fs';
import path from 'path';
import render from './formatters';
import parse from './parser';

export default (fileBefore, fileAfter, format) => {
  const pathExtNameBefore = path.extname(fileBefore);
  const pathExtNameAfter = path.extname(fileAfter);

  if (!(pathExtNameBefore in parse) || !(pathExtNameAfter in parse)) {
    throw new Error('Format is not valid');
  }

  if (pathExtNameBefore !== pathExtNameAfter) {
    throw new Error('Formats are not equal');
  }

  const readFileBefore = fs.readFileSync(fileBefore, 'utf-8');
  const readFileAfter = fs.readFileSync(fileAfter, 'utf-8');

  const fileContentBefore = parse[pathExtNameBefore](readFileBefore);
  const fileContentAfter = parse[pathExtNameAfter](readFileAfter);

  return render[format](fileContentBefore, fileContentAfter);
};
