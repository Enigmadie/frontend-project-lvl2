import fs from 'fs';
import path from 'path';
import render from './formatters';
import parse from './parsers';
import buildAst from './build-ast';

const getFileContent = (filepath, extName) => fs.readFileSync(filepath, 'utf-8')
  |> (_ => parse(_, extName));

export default (filepathBeforeDif, filepathAfterDif, format = 'diff') => {
  const extNameBeforeDif = path.extname(filepathBeforeDif);
  const extNameAfterDif = path.extname(filepathAfterDif);

  if (extNameBeforeDif !== extNameAfterDif) {
    throw new Error('Formats are not equal');
  }

  const contentBeforeDif = getFileContent(filepathBeforeDif, extNameBeforeDif);
  const contentAfterDif = getFileContent(filepathAfterDif, extNameAfterDif);

  return buildAst(contentBeforeDif, contentAfterDif)
    |> (_ => render(_, format));
};
