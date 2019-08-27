import fs from 'fs';
import path from 'path';
import render from './formatters';
import parse from './parsers';
import buildAst from './build-ast';

const getFileContent = (filepath, extName) => fs.readFileSync(filepath, 'utf-8')
  |> (_ => parse(_, extName));

export default (firstFilepath, secondFilepath, format = 'diff') => {
  const firstExtName = path.extname(firstFilepath);
  const secondExtName = path.extname(secondFilepath);

  if (firstExtName !== secondExtName) {
    throw new Error('Formats are not equal');
  }

  const firstContent = getFileContent(firstFilepath, firstExtName);
  const secondContent = getFileContent(secondFilepath, secondExtName);

  return buildAst(firstContent, secondContent)
    |> (_ => render(_, format));
};
