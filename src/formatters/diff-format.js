import {
  isPlainObject as isObject, isArray, keys, flattenDeep,
} from 'lodash';

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
    const linesSelection = ({
      added: () => `+ ${name}: ${stringify(value, gap)}`,
      deleted: () => `- ${name}: ${stringify(value, gap)}`,
      updated: () => [`+ ${name}: ${stringify(afterValue, gap)}`, `- ${name}: ${stringify(beforeValue, gap)}`],
      node: () => `  ${name}: {\n${render(children, gap + breakGap)}\n${skip(gap)}  }`,
      unchanged: () => `  ${name}: ${stringify(value, gap)}`,
    });
    return linesSelection[type]();
  };
  
  return difData.map(el => getLine(el))
  |> flattenDeep
  |> (_ => _.map(el => `${skip(gap)}${el}`))
  |> (_ => _.join('\n'));
};

export default astData => `{\n${render(astData, startGap)}\n}`;
