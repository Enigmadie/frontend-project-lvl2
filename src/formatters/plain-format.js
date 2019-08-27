const stringify = (value) => {
  switch (true) {
    case typeof value === 'string':
      return `'${value}'`;
    case value instanceof Array:
      return `[${value.join(', ')}]`;
    case value instanceof Object:
      return '[complex value]';
    default:
      return value;
  }
};

const getLine = ({
  type, name, value, valueBefore, valueAfter, children,
}, nestedName, func) => {
  const linesSelection = {
    added: () => `Property '${nestedName}${name}' was added with value: ${stringify(value)}`,
    deleted: () => `Property '${nestedName}${name}' was removed`,
    updated: () => `Property '${nestedName}${name}' was updated. From ${stringify(valueBefore)} to ${stringify(valueAfter)}`,
    node: () => func(children, `${nestedName}${name}.`),
  };
  return linesSelection[type]();
};

const render = (difData, nestedName = '') => difData
  .filter(({ type }) => type !== 'unchanged')
  .map(el => getLine(el, nestedName, render))
  .join('\n');

export default astData => render(astData);
