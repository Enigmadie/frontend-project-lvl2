import {
  has, keys, union, isObject,
} from 'lodash';

const propertyActions = [
  {
    check: (contentBeforeDif, contentAfterDif, key) => (
      !has(contentBeforeDif, key)),
    form: (valueBeforeDif, valueAfterDif, name) => ({
      type: 'added',
      name,
      value: valueAfterDif,
    }),
  },
  {
    check: (contentBeforeDif, contentAfterDif, key) => (
      !has(contentAfterDif, key)),
    form: (valueBeforeDif, valueAfterDif, name) => ({
      type: 'deleted',
      name,
      value: valueBeforeDif,
    }),
  },
  {
    check: (contentBeforeDif, contentAfterDif, key) => (
      contentBeforeDif[key] === contentAfterDif[key]),
    form: (valueBeforeDif, valueAfterDif, name) => ({
      type: 'unchanged',
      name,
      value: valueAfterDif,
    }),
  },
  {
    check: (contentBeforeDif, contentAfterDif, key) => (
      isObject(contentBeforeDif[key]) && isObject(contentAfterDif[key])),
    form: (valueBeforeDif, valueAfterDif, name, func) => ({
      type: 'node',
      name,
      children: func(valueBeforeDif, valueAfterDif),
    }),
  },
  {
    check: (contentBeforeDif, contentAfterDif, key) => (
      contentBeforeDif[key] !== contentAfterDif[key]),
    form: (valueBeforeDif, valueAfterDif, name) => ({
      type: 'updated',
      name,
      beforeValue: valueBeforeDif,
      afterValue: valueAfterDif,
    }),
  },

];

const getPropertyActions = (arg1, arg2, value) => (
  propertyActions.find(({ check }) => check(arg1, arg2, value))
);

const genDifAst = (contentBeforeDif, contentAfterDif) => {
  const keysBeforeDif = keys(contentBeforeDif);
  const keysAfterDif = keys(contentAfterDif);

  const commonKeys = union(keysBeforeDif, keysAfterDif);

  const iterAst = commonKeys.map((key) => {
    const { form } = getPropertyActions(contentBeforeDif, contentAfterDif, key);
    return form(contentBeforeDif[key], contentAfterDif[key], key, genDifAst);
  });
  return iterAst;
};
export default genDifAst;
