import yml from 'js-yaml';
import ini from 'ini';

const fileExtNameSelection = {
  '.json': JSON.parse,
  '.yml': yml.safeLoad,
  '.ini': ini.parse,
};

export default (data, extName) => {
  if (!(extName in fileExtNameSelection)) {
    throw new Error(`Format ${extName} is not valid`);
  }
  return fileExtNameSelection[extName](data);
};
