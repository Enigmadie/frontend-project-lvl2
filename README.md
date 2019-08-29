# gendiff
[![Maintainability](https://api.codeclimate.com/v1/badges/9bdaded8ccf6b3a91334/maintainability)](https://codeclimate.com/github/Enigmadie/frontend-project-lvl2/maintainability)
[![Build Status](https://travis-ci.org/Enigmadie/gendiff.svg?branch=master)](https://travis-ci.org/Enigmadie/gendiff)

## Setup
    $ sudo npm install -g enigma-gendiff

## Options
* support for three input file types: `yml` `ini` `json` and three output types: `plain` `diff` `json`
* `-f | --format [type]` formating output to tree, json or plain, default is tree
* `-h | --help` help page
* `-V | --version` program version


## Example
### Default (diff) output
`$ gendiff before.json after.json`
```
{
  common: {
      setting1: Value 1
    - setting2: 200
    + setting3: {
          key: value
          res: false
      }
    - setting3: true
      setting6: {
          key: value
        + ops: vops
      }
    + follow: false
    + setting5: {
          key5: value5
      }
  }
  group1: {
    + baz: bars
    - baz: bas
      foo: bar
    + nest: str
    - nest: {
          key: value
      }
  }
- group2: {
      abc: 12345
  }
- group4: {
      bar: next
      same: too
  }
+ group3: {
      fee: 100500
  }
}
```

### Plain output
`$ gendiff --format plain before.json after.json`
```
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to [complex value]
Property 'common.setting6.ops' was added with value: 'vops'
Property 'common.follow' was added with value: false
Property 'common.setting5' was added with value: [complex value]
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group4' was removed
Property 'group3' was added with value: [complex value]
```

### JSON output
`$ gendiff --format json before.json after.json`
```
[{"type":"node","name":"common","children":[{"type":"unchanged","name":"setting1","value":"Value 1"},{"type":"deleted","name":"setting2","value":"200"},{"type":"updated","name":"setting3","valueBefore":true,"valueAfter":{"key":"value","res":false}},{"type":"node","name":"setting6","children":[{"type":"unchanged","name":"key","value":"value"},{"type":"added","name":"ops","value":"vops"}]},{"type":"added","name":"follow","value":false},{"type":"added","name":"setting5","value":{"key5":"value5"}}]},{"type":"node","name":"group1","children":[{"type":"updated","name":"baz","valueBefore":"bas","valueAfter":"bars"},{"type":"unchanged","name":"foo","value":"bar"},{"type":"updated","name":"nest","valueBefore":{"key":"value"},"valueAfter":"str"}]},{"type":"deleted","name":"group2","value":{"abc":"12345"}},{"type":"deleted","name":"group4","value":{"bar":"next","same":"too"}},{"type":"added","name":"group3","value":{"fee":"100500"}}]
```