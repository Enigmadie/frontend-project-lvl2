import { isPlainObject as isObject } from 'lodash';

const genJsonData = obj => JSON.stringify(obj).slice(1, -1);
const selectType = type => (isObject(type) ? 'nested' : 'flow');

const render = (difData) => {
  const getLine = ({
    type, value, beforeValue, afterValue, children,
  }) => {
    const linesSelection = {
      added: () => `,${genJsonData({ type: selectType(value), added: value })}`,
      deleted: () => '',
      updated: () => `,${genJsonData({ type: selectType(afterValue), added: afterValue, deleted: beforeValue })}`,
      node: () => `,${genJsonData({ type: 'nested' })},"children":[${render(children)}]`,
    };
    return linesSelection[type]();
  };

  return difData.filter(({ type }) => type !== 'unchanged')
    .map(el => `{${genJsonData({ key: el.name, option: el.type })}${getLine(el)}}`)
    .join(',');
};

export default astData => `[${render(astData)}]`;
