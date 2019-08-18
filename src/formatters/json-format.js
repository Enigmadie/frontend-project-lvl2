import { isPlainObject as isObject } from 'lodash';

const genJsonData = obj => JSON.stringify(obj).slice(1, -1);
const selectType = type => (isObject(type) ? 'nested' : 'flow');

const render = (difData) => {
  const getLine = ({
    type, value, beforeValue, afterValue, children,
  }) => {
    switch (type) {
      case 'added':
        return `,${genJsonData({ type: selectType(value), added: value })}`;
      case 'updated':
        return `,${genJsonData({ type: selectType(afterValue), added: afterValue, deleted: beforeValue })}`;
      case 'node':
        return `,${genJsonData({ type: 'nested' })},"children":[${render(children)}]`;
      default:
        return '';
    }
  };
  return difData.filter(el => el.type !== 'unchanged')
    .map(el => `{${genJsonData({ key: el.name, option: el.type })}${getLine(el)}}`).join(',');
};

export default astData => `[${render(astData)}]`;
