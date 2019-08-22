import {
  has, keys, union, isObject,
} from 'lodash';

const propertyActions = [
  {
    check: (beforeDif, afterDif, name) => !has(beforeDif, name),
    form: (beforeDif, afterDif, name) => ({ type: 'added', name, value: afterDif }),
  },
  {
    check: (beforeDif, afterDif, name) => !has(afterDif, name),
    form: (beforeDif, afterDif, name) => ({ type: 'deleted', name, value: beforeDif }),
  },
  {
    check: (beforeDif, afterDif, name) => beforeDif[name] === afterDif[name],
    form: (beforeDif, afterDif, name) => ({ type: 'unchanged', name, value: afterDif }),
  },
  {
    check: (beforeDif, afterDif, name) => isObject(beforeDif[name]) && isObject(afterDif[name]),
    form: (beforeDif, afterDif, name, func) => ({ type: 'node', name, children: func(beforeDif, afterDif) }),
  },
  {
    check: (beforeDif, afterDif, name) => beforeDif[name] !== afterDif[name],
    form: (beforeDif, afterDif, name) => ({
      type: 'updated', name, beforeValue: beforeDif, afterValue: afterDif,
    }),
  },

];

const getPropertyActions = (arg1, arg2, value) => (
  propertyActions.find(({ check }) => check(arg1, arg2, value))
);

const genDifAst = (beforeDif, afterDif) => {
  const keysBeforeDif = keys(beforeDif);
  const keysAfterDif = keys(afterDif);

  const commonKeys = union(keysBeforeDif, keysAfterDif);

  const iterAst = commonKeys.map((name) => {
    const { form } = getPropertyActions(beforeDif, afterDif, name);
    return form(beforeDif[name], afterDif[name], name, genDifAst);
  });
  return iterAst;
};
export default genDifAst;
