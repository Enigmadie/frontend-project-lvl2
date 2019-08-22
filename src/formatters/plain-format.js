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

const render = (difData, nestedName) => {
  const getLine = ({
    type, name, value, beforeValue, afterValue, children,
  }) => {
    const linesSelection = {
      added: () => `Property '${nestedName}${name}' was added with value: ${stringify(value)}`,
      deleted: () => `Property '${nestedName}${name}' was removed`,
      updated: () => `Property '${nestedName}${name}' was updated. From ${stringify(beforeValue)} to ${stringify(afterValue)}`,
      node: () => render(children, `${nestedName}${name}.`),
    };
    return linesSelection[type]();
  };
  
  return difData.filter(({ type }) => type !== 'unchanged')
    .map(el => getLine(el))
    .join('\n');
};

export default astData => render(astData, '');
