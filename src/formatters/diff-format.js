import {
  isPlainObject, isArray, keys, flattenDeep,
} from 'lodash';

const rebuildValue = value => (isArray(value) ? `[${value.join(', ')}]` : value);
const skip = depth => `  ${'    '.repeat(depth)}`;
const rootNodeDepth = 0;
const levelDepth = 1;

const stringify = (value, depth) => {
  if (!isPlainObject(value)) {
    return rebuildValue(value);
  }
  return `{\n${keys(value).map(el => (
    `${skip(depth + levelDepth)}  ${el}: ${isPlainObject(value[el])
      ? stringify(value[el], depth + levelDepth)
      : rebuildValue(value[el])}`))
    .join('\n')}\n${skip(depth)}  }`;
};

const getLine = ({
  type, name, value, valueBefore, valueAfter, children,
}, func, depth) => {
  const linesSelection = ({
    added: () => `+ ${name}: ${stringify(value, depth)}`,
    deleted: () => `- ${name}: ${stringify(value, depth)}`,
    updated: () => [`+ ${name}: ${stringify(valueAfter, depth)}`, `- ${name}: ${stringify(valueBefore, depth)}`],
    node: () => `  ${name}: {\n${func(children, depth + levelDepth)}\n${skip(depth)}  }`,
    unchanged: () => `  ${name}: ${stringify(value, depth)}`,
  });
  return linesSelection[type]();
};

const render = (difData, nodeDepth = rootNodeDepth) => difData
|> (_ => _.map(el => getLine(el, render, nodeDepth)))
|> flattenDeep
|> (_ => _.map(el => `${skip(nodeDepth)}${el}`))
|> (_ => _.join('\n'));

export default astData => `{\n${render(astData)}\n}`;
