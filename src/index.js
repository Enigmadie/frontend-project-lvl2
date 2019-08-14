import fs from 'fs';
import path from 'path';
import render from './formatters';
import parse from './parsers';
import buildAst from './build-ast';

const getFileContent = (filepath, extName) => fs.readFileSync(filepath, 'utf-8')
  |> (_ => parse(_, extName));

export default (fileBefore, fileAfter, format = 'diff') => {
  const extNameBefore = path.extname(fileBefore);
  const extNameAfter = path.extname(fileAfter);

  if (extNameBefore !== extNameAfter) {
    throw new Error('Formats are not equal');
  }

  const fileContentBefore = getFileContent(fileBefore, extNameBefore);
  const fileContentAfter = getFileContent(fileAfter, extNameAfter);

  return buildAst(fileContentBefore, fileContentAfter)
    |> (_ => render(_, format));
};
