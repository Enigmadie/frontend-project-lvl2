import fs from 'fs';
import gendiff from '../src';

const pathBuild = path => `${__dirname}/__fixtures__/${path}`;

const resultBuild = result => fs.readFileSync(pathBuild(result), 'utf-8');

test('compare json files', () => {
  expect(gendiff(pathBuild('before.json'), pathBuild('after.json')))
    .toBe(resultBuild('result-json.txt'));
});

test('compare yml files', () => {
  expect(gendiff(pathBuild('before.yml'), pathBuild('after.yml')))
    .toBe(resultBuild('result-yml.txt'));
});

test('compare ini files', () => {
  expect(gendiff(pathBuild('before.ini'), pathBuild('after.ini')))
    .toBe(resultBuild('result-ini.txt'));
});

test('compare nested json files', () => {
  expect(gendiff(pathBuild('before-nested.json'), pathBuild('after-nested.json')))
    .toBe(resultBuild('nested-result-json.txt'));
});

test('compare nested yml files', () => {
  expect(gendiff(pathBuild('before-nested.yml'), pathBuild('after-nested.yml')))
    .toBe(resultBuild('nested-result-yml.txt'));
});

test('compare nested ini files', () => {
  expect(gendiff(pathBuild('before-nested.ini'), pathBuild('after-nested.ini')))
    .toBe(resultBuild('nested-result-ini.txt'));
});
