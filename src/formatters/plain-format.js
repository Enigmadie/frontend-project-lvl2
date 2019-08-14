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
    type, name, beforeValue, afterValue, children,
  }) => {
    switch (type) {
      case 'add':
        return `Property '${nestedName}${name}' was added with value: ${stringify(afterValue)}\n`;
      case 'delete':
        return `Property '${nestedName}${name}' was removed\n`;
      case 'update':
        return children.length > 0
          ? render(children, `${nestedName}${name}.`)
          : `Property '${nestedName}${name}' was updated. From ${stringify(beforeValue)} to ${stringify(afterValue)}\n`;
      default:
        return '';
    }
  };
  return difData.map(el => getLine(el)).join('');
};

export default astData => render(astData, '').slice(0, -1);
