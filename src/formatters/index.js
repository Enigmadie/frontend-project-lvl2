import defaultFormat from './diff-format';
import plainFormat from './plain-format';
import jsonFormat from './json-format';

export default (astData, format) => {
  const formatSelection = {
    diff: defaultFormat,
    plain: plainFormat,
    json: jsonFormat,
  };

  return formatSelection[format](astData);
};
