import dif from '../dif'

const space = (step) => ' '.repeat(step);
const defaultStep = 4;

const stringify = (value, cond, stringifyGap) => cond
  ?  `{\n${Object.keys(value).map(el =>
    typeof value[el] === 'object'
    ? `        ${space(stringifyGap)}${el}: ${stringify(value[el], true, stringifyGap + 4)}`
    : `        ${space(stringifyGap)}${el}: ${value[el]}`).join('\n')}\n${space(stringifyGap)}    }`
  : value;

export default (file1, file2) => {

  const iter = (before, after, gap) => {
    const iterAst = dif(before, after);

      const render = ({
        type, name, beforeValue, afterValue, isObject, children
      }) => {
        switch (type) {
          case 'add':
            return `  + ${name}: ${stringify(afterValue, isObject, gap)}`;
          case 'delete':
            return `  - ${name}: ${stringify(beforeValue, isObject, gap)}`;
          case 'update':
            return (children.length > 0)
              ? `    ${name}: ${iter(beforeValue, afterValue, gap + defaultStep)}`
              : `  + ${name}: ${stringify(afterValue, isObject[0], gap)}\n${space(gap)}  - ${name}: ${stringify(beforeValue, isObject[1], gap)}`;
          default:
            return `    ${name}: ${afterValue}`;
        }
        return null;
      };

    return `{\n${space(gap)}${iterAst.map((el) => render(el)).join(`\n${space(gap)}`)}\n${space(gap)}}`
  }
  return iter(file1, file2, 0)
}
