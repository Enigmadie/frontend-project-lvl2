import isObject from '../utils';

const rebuildValue = value => (value instanceof Array ? `[${value.join(', ')}]` : value);
const skip = step => ' '.repeat(step);
const startGap = 2;
const breakGap = 4;

const stringify = (value, gap) => {
  if (!isObject(value)) {
    return rebuildValue(value);
  }
  return `{\n${Object.keys(value).map(el => (
    `${skip(gap + breakGap)}  ${el}: ${isObject(value[el])
      ? stringify(value[el], gap + breakGap)
      : rebuildValue(value[el])}`)).join('\n')}\n${skip(gap)}  }`;
};
export default (astData) => {
  const iter = (difData, gap) => {
    const render = ({
      type, name, beforeValue, afterValue, children,
    }) => {
      switch (type) {
        case 'add':
          return `+ ${name}: ${stringify(afterValue, gap)}`;
        case 'delete':
          return `- ${name}: ${stringify(beforeValue, gap)}`;
        case 'update':
          return children.length > 0
            ? `  ${name}: ${iter(children, gap + breakGap)}\n${skip(gap)}  }`
            : `+ ${name}: ${stringify(afterValue, gap)}\n${skip(gap)}- ${name}: ${stringify(beforeValue, gap)}`;
        default:
          return `  ${name}: ${stringify(afterValue, gap)}`;
      }
    };
    return `{\n${skip(gap)}${difData.map(el => render(el)).join(`\n${skip(gap)}`)}`;
  };

  return `${iter(astData, startGap)}\n}`;
};
