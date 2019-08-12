import dif, { isObject } from '../dif';

const rebuildValue = value => (value instanceof Array ? `[${value.join(', ')}]` : value);
const space = step => ' '.repeat(step);
const startGap = 2;
const breakGap = 4;

const stringify = (value, gap) => {
  if (isObject(value)) {
    return `{\n${Object.keys(value).map(el => (isObject(value[el])
      ? `${space(gap + breakGap)}  ${el}: ${stringify(value[el], gap + breakGap)}`
      : `${space(gap + breakGap)}  ${el}: ${rebuildValue(value[el])}`)).join('\n')}\n${space(gap)}  }`;
  }
  return rebuildValue(value);
};

export default (file1, file2) => {
  const iterAst = dif(file1, file2);

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
            ? `  ${name}: ${iter(children, gap + breakGap)}\n${space(gap)}  }`
            : `+ ${name}: ${stringify(afterValue, gap)}\n${space(gap)}- ${name}: ${stringify(beforeValue, gap)}`;
        default:
          return `  ${name}: ${stringify(afterValue, gap)}`;
      }
    };

    return `{\n${space(gap)}${difData.map(el => render(el)).join(`\n${space(gap)}`)}`;
  };
  return `${iter(iterAst, startGap)}\n}`;
};
