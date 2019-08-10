import fs from 'fs';
import gendiff from '../src';

const pathBuild = path => `${__dirname}/__fixtures__/${path}`;

const resultBuild = result => fs.readFileSync(pathBuild(result), 'utf-8');

const tested = (name, testData) => {
  test(name, () => {
    testData.map((el) => {
      const [file1, file2, fileResult, format] = el;
      return expect(gendiff(pathBuild(file1), pathBuild(file2), format))
        .toBe(resultBuild(fileResult));
    });
  });
};

tested('compare json files',
  [['before.json', 'after.json', 'result-json.txt', 'default']]);

tested('compare yml files',
  [['before.yml', 'after.yml', 'result-yml.txt', 'default']]);

tested('compare ini files',
  [['before.ini', 'after.ini', 'result-ini.txt', 'default']]);

tested('compare json, ini, yml nested files default format',
  [
    ['before-nested.json', 'after-nested.json', 'nested-result-json-default.txt', 'default'],
    ['before-nested.yml', 'after-nested.yml', 'nested-result-yml-default.txt', 'default'],
    ['before-nested.ini', 'after-nested.ini', 'nested-result-ini-default.txt', 'default'],
  ]);

tested('compare json, ini, yml nested files plain format',
  [
    ['before-nested.json', 'after-nested.json', 'nested-result-json-plain.txt', 'plain'],
    ['before-nested.yml', 'after-nested.yml', 'nested-result-yml-plain.txt', 'plain'],
    ['before-nested.ini', 'after-nested.ini', 'nested-result-ini-plain.txt', 'plain'],
  ]);
