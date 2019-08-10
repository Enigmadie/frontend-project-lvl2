import dif, { isObject } from '../dif';

const space = step => ' '.repeat(step);
const startGap = 2;
const breakGap = 4;

const stringify = (value, gap) => {
  if (isObject(value)) {
    return `{\n${Object.keys(value).map(el => (isObject(value[el])
      ? `${space(gap + breakGap)}  ${el}: ${stringify(value[el], gap + breakGap)}`
      : `${space(gap + breakGap)}  ${el}: ${value[el]}`)).join('\n')}\n${space(gap)}  }`;
  }
  return value;
};

export default (file1, file2) => {
  const iterAst = dif(file1, file2);
  const iter = (difData, gap) => {
    const render = ({
      type, name, beforeValue, afterValue,
    }) => {
      switch (type) {
        case 'add':
          return `+ ${name}: ${stringify(afterValue, gap)}`;
        case 'delete':
          return `- ${name}: ${stringify(beforeValue, gap)}`;
        case 'update':
          return `+ ${name}: ${stringify(afterValue, gap)}\n${space(gap)}- ${name}: ${stringify(beforeValue, gap)}`;
        default:
          return `  ${name}: ${afterValue}`;
      }
    };

    return `{\n${space(gap)}${difData.map(el => (el.children.length > 0
      ? `  ${el.name}: ${iter(el.children, gap + breakGap)}\n${space(gap)}  }`
      : render(el)))
      .join(`\n${space(gap)}`)}`;
  };
  return `${iter(iterAst, startGap)}\n}`;
};
