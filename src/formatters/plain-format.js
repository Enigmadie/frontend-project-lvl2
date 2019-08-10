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
  const iterAst = dif(file1, file2);
  const iter = (difData, nestedName) => {
    const render = ({
      type, name, beforeValue, afterValue,
    }) => {
      switch (type) {
        case 'add':
          return `Property '${nestedName}${name}' was added with value: ${stringify(afterValue)}\n`;
        case 'delete':
          return `Property '${nestedName}${name}' was removed\n`;
        case 'update':
          return `Property '${nestedName}${name}' was updated. From ${stringify(beforeValue)} to ${stringify(afterValue)}\n`;
        default:
          return '';
      }
    };

    return difData.map(el => (el.children.length > 0
      ? iter(el.children, `${nestedName}${el.name}.`)
      : render(el)))
      .join('');
  };
  const iterated = iter(iterAst, '');
  return iterated.slice(0, iterated.length - 1);
};
