import {
  has, keys, union, isObject,
} from 'lodash';

const propertyActions = [
  {
    check: (firstContent, secondContent, key) => !has(firstContent, key),
    form: (firstValue, secondValue, name) => ({
      type: 'added',
      name,
      value: secondValue,
    }),
  },
  {
    check: (firstContent, secondContent, key) => !has(secondContent, key),
    form: (firstValue, secondValue, name) => ({
      type: 'deleted',
      name,
      value: firstValue,
    }),
  },
  {
    check: (firstContent, secondContent, key) => firstContent[key] === secondContent[key],
    form: (firstValue, secondValue, name) => ({
      type: 'unchanged',
      name,
      value: secondValue,
    }),
  },
  {
    check: (firstContent, secondContent, key) => (
      isObject(firstContent[key]) && isObject(secondContent[key])),
    form: (firstValue, secondValue, name, func) => ({
      type: 'node',
      name,
      children: func(firstValue, secondValue),
    }),
  },
  {
    check: (firstContent, secondContent, key) => firstContent[key] !== secondContent[key],
    form: (firstValue, secondValue, name) => ({
      type: 'updated',
      name,
      valueBefore: firstValue,
      valueAfter: secondValue,
    }),
  },

];

const getPropertyActions = (arg1, arg2, value) => (
  propertyActions.find(({ check }) => check(arg1, arg2, value))
);

const genDifAst = (firstContent, secondContent) => {
  const firstKeys = keys(firstContent);
  const secondKeys = keys(secondContent);

  const commonKeys = union(firstKeys, secondKeys);

  const iterAst = commonKeys.map((key) => {
    const { form } = getPropertyActions(firstContent, secondContent, key);
    return form(firstContent[key], secondContent[key], key, genDifAst);
  });
  return iterAst;
};
export default genDifAst;
