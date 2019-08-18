import {
  has, keys, union, isObject,
} from 'lodash';

const propertyActions = [
  {
    check: (first, second, name) => !has(first, name),
    form: (first, second, name) => ({ type: 'added', name, value: second }),
  },
  {
    check: (first, second, name) => !has(second, name),
    form: (first, second, name) => ({ type: 'deleted', name, value: first }),
  },
  {
    check: (first, second, name) => first[name] === second[name],
    form: (first, second, name) => ({ type: 'unchanged', name, value: second }),
  },
  {
    check: (first, second, name) => isObject(first[name]) && isObject(second[name]),
    form: (first, second, name, func) => ({ type: 'node', name, children: func(first, second) }),
  },
  {
    check: (first, second, name) => first[name] !== second[name],
    form: (first, second, name) => ({
      type: 'updated', name, beforeValue: first, afterValue: second,
    }),
  },

];

const getPropertyActions = (arg1, arg2, value) => (
  propertyActions.find(({ check }) => check(arg1, arg2, value))
);

const genDifAst = (before, after) => {
  const fileKeys = union(keys(before), keys(after));

  const iterAst = fileKeys.map((name) => {
    const { form } = getPropertyActions(before, after, name);
    return form(before[name], after[name], name, genDifAst);
  });
  return iterAst;
};
export default genDifAst;
