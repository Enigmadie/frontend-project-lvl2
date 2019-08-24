import fs from 'fs';
import genDiff from '../src';

const buildPath = path => `${__dirname}/__fixtures__/${path}`;

const buildResult = result => fs.readFileSync(buildPath(result), 'utf-8');

const testModules = (name, testData) => {
  test(name, () => {
    testData.map(([filenameBeforeDif, filenameAfterDif, filenameComparedDif, format]) => {
      const filepathBeforeDif = buildPath(filenameBeforeDif);
      const filepathAfterDif = buildPath(filenameAfterDif);

      const expectedValue = buildResult(filenameComparedDif);
      const actualValue = genDiff(filepathBeforeDif, filepathAfterDif, format);

      return expect(actualValue).toBe(expectedValue);
    });
  });
};

testModules('compare json files',
  [['before.json', 'after.json', 'result-json.txt']]);

testModules('compare yml files',
  [['before.yml', 'after.yml', 'result-yml.txt']]);

testModules('compare ini files',
  [['before.ini', 'after.ini', 'result-ini.txt']]);

testModules('compare json, ini, yml nested files default format',
  [
    ['before-nested.json', 'after-nested.json', 'nested-result-json-default.txt'],
    ['before-nested.yml', 'after-nested.yml', 'nested-result-yml-default.txt'],
    ['before-nested.ini', 'after-nested.ini', 'nested-result-ini-default.txt'],
  ]);

testModules('compare json, ini, yml nested files plain format',
  [
    ['before-nested.json', 'after-nested.json', 'nested-result-json-plain.txt', 'plain'],
    ['before-nested.yml', 'after-nested.yml', 'nested-result-yml-plain.txt', 'plain'],
    ['before-nested.ini', 'after-nested.ini', 'nested-result-ini-plain.txt', 'plain'],
  ]);

testModules('compare json, ini, yml nested files json format',
  [
    ['before-nested.json', 'after-nested.json', 'nested-result-json-json.txt', 'json'],
    ['before-nested.yml', 'after-nested.yml', 'nested-result-yml-json.txt', 'json'],
    ['before-nested.ini', 'after-nested.ini', 'nested-result-ini-json.txt', 'json'],
  ]);
