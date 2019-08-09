import fs from 'fs';
import gendiff from '../src';

const pathBuild = path => `${__dirname}/__fixtures__/${path}`;

const resultBuild = result => fs.readFileSync(pathBuild(result), 'utf-8');

test('compare json files', () => {
  expect(gendiff(pathBuild('before.json'), pathBuild('after.json'), 'json'))
    .toBe(resultBuild('result-json.txt'));
});

test('compare yml files', () => {
  expect(gendiff(pathBuild('before.yml'), pathBuild('after.yml'), 'json'))
    .toBe(resultBuild('result-yml.txt'));
});

test('compare ini files', () => {
  expect(gendiff(pathBuild('before.ini'), pathBuild('after.ini'), 'json'))
    .toBe(resultBuild('result-ini.txt'));
});

test('compare json, ini, yml nested files json format', () => {
  expect(gendiff(pathBuild('before-nested.json'), pathBuild('after-nested.json'), 'json'))
    .toBe(resultBuild('nested-result-json-default.txt'));
  expect(gendiff(pathBuild('before-nested.yml'), pathBuild('after-nested.yml'), 'json'))
    .toBe(resultBuild('nested-result-yml-default.txt'));
  expect(gendiff(pathBuild('before-nested.ini'), pathBuild('after-nested.ini'), 'json'))
    .toBe(resultBuild('nested-result-ini-default.txt'));
});

test('compare json, ini, yml nested files plain format', () => {
  expect(gendiff(pathBuild('before-nested.json'), pathBuild('after-nested.json'), 'plain'))
    .toBe(resultBuild('nested-result-json-plain.txt'));
  expect(gendiff(pathBuild('before-nested.yml'), pathBuild('after-nested.yml'), 'plain'))
    .toBe(resultBuild('nested-result-yml-plain.txt'));
  expect(gendiff(pathBuild('before-nested.ini'), pathBuild('after-nested.ini'), 'plain'))
    .toBe(resultBuild('nested-result-ini-plain.txt'));
});
