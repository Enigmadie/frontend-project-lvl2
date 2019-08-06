import { has, every } from 'lodash';

const isObject = (...file) => every(file.map(el => typeof el === 'object'));

export default (file1, file2) => {
  const iter = (before, after, gap) => {
    const fileKeys = Object.keys({ ...before, ...after });
    const space = ' '.repeat(gap);
    const step = 4;

    const dif = fileKeys.map((el) => {
      const beforeValue = before[el];
      const afterValue = after[el];

      if (!has(before, el)) {
        return isObject(afterValue)
          ? { type: 'add', name: el, value: iter(afterValue, afterValue, gap + step) }
          : { type: 'add', name: el, value: afterValue };
      }

      if (!has(after, el)) {
        return isObject(beforeValue)
          ? { type: 'delete', name: el, value: iter(beforeValue, beforeValue, gap + step) }
          : { type: 'delete', name: el, value: beforeValue };
      }

      if (beforeValue !== afterValue) {
        if (isObject(afterValue, beforeValue)) {
          return {
            type: 'update', valueIsObject: true, name: el, children: iter(beforeValue, afterValue, gap + step),
          };
        }
        if (isObject(beforeValue)) {
          return { type: 'update', name: el, value: [afterValue, iter(beforeValue, beforeValue, gap + step)] };
        }
        if (isObject(afterValue)) {
          return { type: 'update', name: el, value: [iter(afterValue, afterValue, gap + step), beforeValue] };
        }
        return { type: 'update', name: el, value: [afterValue, beforeValue] };
      }

      return { type: 'stay', name: el, value: afterValue };
    });

    const render = ({
      type, valueIsObject, name, value, children,
    }) => {
      switch (type) {
        case 'add':
          return `${space}  + ${name}: ${value}\n`;
        case 'delete':
          return `${space}  - ${name}: ${value}\n`;
        case 'update':
          return (valueIsObject)
            ? `${space}    ${name}: ${children}\n`
            : `${space}  + ${name}: ${value[0]}\n${space}  - ${name}: ${value[1]}\n`;
        case 'stay':
          return `${space}    ${name}: ${value}\n`;
        default:
      }
      return null;
    };

    return `{\n${dif.reduce((acc, el) => `${acc}${render(el)}`, '')}${space}}`;
  };

  return iter(file1, file2, 0);
};
