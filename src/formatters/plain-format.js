import dif from '../dif';

const stringify = (value) => {
  switch (typeof value) {
    case 'string':
      return `'${value}'`;
    case 'object':
      return value !== null ? '[complex value]' : null;
    default:
      return value;
  }
};

export default (file1, file2) => {
  const iter = (before, after, nestedName) => {
    const iterAst = dif(before, after);

    const render = ({
      type, name, beforeValue, afterValue, children,
    }) => {
      switch (type) {
        case 'add':
          return `Property '${nestedName}${name}' was added with value: ${stringify(afterValue)}\n`;
        case 'delete':
          return `Property '${nestedName}${name}' was removed\n`;
        case 'update':
          return (children.length > 0)
            ? iter(beforeValue, afterValue, `${nestedName}${name}.`)
            : `Property '${nestedName}${name}' was updated. From ${stringify(beforeValue)} to ${stringify(afterValue)}\n`;
        default:
          return '';
      }
    };

    return iterAst.map(el => render(el)).join('');
  };
  const iterate = iter(file1, file2, '');
  return iterate.slice(0, iterate.length - 1);
};
