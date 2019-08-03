import fs from 'fs';
import gendiff from '../src';

const pathBuild = path => `${__dirname}/__fixtures__/${path}`;

const resultBuild = result => fs.readFileSync(pathBuild(result), 'utf-8');

test('compare json files', () => {
  expect(gendiff(pathBuild('before.json'), pathBuild('after.json')))
    .toBe(resultBuild('jsonResult.txt'));
});
