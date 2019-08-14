import isObject from '../utils';

const genJsonData = obj => JSON.stringify(obj).slice(1, -1);
const selectType = type => (isObject(type) ? 'nested' : 'flow');

const render = (difData) => {
  const getLine = ({
    type, beforeValue, afterValue, children,
  }) => {
    switch (type) {
      case 'add':
        return `,${genJsonData({ type: selectType(afterValue), added: afterValue })}`;
      case 'update':
        return children.length > 0
          ? `,${genJsonData({ type: selectType(afterValue) })},"children":[${render(children)}]`
          : `,${genJsonData({ type: selectType(afterValue), added: afterValue, deleted: beforeValue })}`;
      default:
        return '';
    }
  };
  return difData.filter(el => el.type !== 'stay')
    .map(el => `{${genJsonData({ key: el.name, option: el.type })}${getLine(el)}}`).join(',');
};

export default astData => `[${render(astData)}]`;
