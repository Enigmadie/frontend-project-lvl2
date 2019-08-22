import defaultFormat from './diff-format';
import plainFormat from './plain-format';
import jsonFormat from './json-format';

const formatSelection = {
  diff: defaultFormat,
  plain: plainFormat,
  json: jsonFormat,
};

export default (astData, format) => formatSelection[format](astData);
