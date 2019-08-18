import { isPlainObject as isObject, isArray, keys } from 'lodash';

const rebuildValue = value => (isArray(value) ? `[${value.join(', ')}]` : value);
const skip = step => ' '.repeat(step);
const startGap = 2;
const breakGap = 4;

const stringify = (value, gap) => {
  if (!isObject(value)) {
    return rebuildValue(value);
  }
  return `{\n${keys(value).map(el => (
    `${skip(gap + breakGap)}  ${el}: ${isObject(value[el])
      ? stringify(value[el], gap + breakGap)
      : rebuildValue(value[el])}`))
    .join('\n')}\n${skip(gap)}  }`;
};
const render = (difData, gap) => {
  const getLine = ({
    type, name, value, beforeValue, afterValue, children,
  }) => {
    switch (type) {
      case 'added':
        return `+ ${name}: ${stringify(value, gap)}`;
      case 'deleted':
        return `- ${name}: ${stringify(value, gap)}`;
      case 'updated':
        return `+ ${name}: ${stringify(afterValue, gap)}\n${skip(gap)}- ${name}: ${stringify(beforeValue, gap)}`;
      case 'node':
        return `  ${name}: ${render(children, gap + breakGap)}\n${skip(gap)}  }`;
      default:
        return `  ${name}: ${stringify(value, gap)}`;
    }
  };
  return `{\n${skip(gap)}${difData.map(el => getLine(el)).join(`\n${skip(gap)}`)}`;
};

export default astData => `${render(astData, startGap)}\n}`;
