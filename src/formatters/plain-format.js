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

export default (astData) => {
  const iter = (difData, nestedName) => {
    const render = ({
      type, name, beforeValue, afterValue, children,
    }) => {
      switch (type) {
        case 'add':
          return `Property '${nestedName}${name}' was added with value: ${stringify(afterValue)}\n`;
        case 'delete':
          return `Property '${nestedName}${name}' was removed\n`;
        case 'update':
          return children.length > 0
            ? iter(children, `${nestedName}${name}.`)
            : `Property '${nestedName}${name}' was updated. From ${stringify(beforeValue)} to ${stringify(afterValue)}\n`;
        default:
          return '';
      }
    };

    return difData.map(el => render(el)).join('');
  };
  return iter(astData, '').slice(0, -1);
};
