import { has, every } from 'lodash';

const isObject = (...items) => every(items.map(el => typeof el === 'object'));

const propertyActions = [
  {
    type: 'add',
    valueIsObject: (first, second, el) => isObject(second[el]),
    children: () => [],
    check: (first, second, el) => !has(first, el),
  },
  {
    type: 'delete',
    valueIsObject: (first, second, el) => isObject(first[el]),
    children: () => [],
    check: (first, second, el) => !has(second, el),
  },
  {
    type: 'update',
    valueIsObject: (first, second, el) => [isObject(second[el]), isObject(first[el])],
    children: (func, first, second, el) => (isObject(second[el], first[el])
      ? func(first[el], second[el])
      : []),
    check: (first, second, el) => first[el] !== second[el],
  },
  {
    type: 'stay',
    valueIsObject: () => false,
    children: () => [],
    check: (first, second, el) => first[el] === second[el],
  },
];

const getPropertyActions = (arg1, arg2, value) => (
  propertyActions.find(({ check }) => check(arg1, arg2, value))
);

const dif = (before, after) => {
  const fileKeys = Object.keys({ ...before, ...after });

  const iterAst = fileKeys.reduce((acc, name) => {
    const { type, valueIsObject, children } = getPropertyActions(before, after, name);
    const format = {
      type,
      name,
      beforeValue: before[name],
      afterValue: after[name],
      isObject: valueIsObject(before, after, name),
      children: children(dif, before, after, name),
    };
    return [...acc, format];
  }, []);
  return iterAst;
};
export default dif;
