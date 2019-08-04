import fs from 'fs';
import gendiff from '../src';

const pathBuild = path => `${__dirname}/__fixtures__/${path}`;

const resultBuild = result => fs.readFileSync(pathBuild(result), 'utf-8');

test('compare json files', () => {
  expect(gendiff(pathBuild('before.json'), pathBuild('after.json')))
    .toBe(resultBuild('json-result.txt'));
});

test('compare yml files', () => {
  expect(gendiff(pathBuild('before.yml'), pathBuild('after.yml')))
    .toBe(resultBuild('yml-result.txt'));
});

test('compare ini files', () => {
  expect(gendiff(pathBuild('before.ini'), pathBuild('after.ini')))
    .toBe(resultBuild('ini-result.txt'));
});
