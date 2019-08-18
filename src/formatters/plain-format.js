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
    switch (type) {
      case 'added':
        return `Property '${nestedName}${name}' was added with value: ${stringify(value)}\n`;
      case 'deleted':
        return `Property '${nestedName}${name}' was removed\n`;
      case 'updated':
        return `Property '${nestedName}${name}' was updated. From ${stringify(beforeValue)} to ${stringify(afterValue)}\n`;
      case 'node':
        return render(children, `${nestedName}${name}.`);
      default:
        return '';
    }
  };
  return difData.map(el => getLine(el)).join('');
};

export default astData => render(astData, '').slice(0, -1);
