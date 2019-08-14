import yml from 'js-yaml';
import ini from 'ini';

export default (data, extName) => {
  const fileExtNameSelection = {
    '.json': JSON.parse,
    '.yml': yml.safeLoad,
    '.ini': ini.parse,
  };

  if (!(extName in fileExtNameSelection)) {
    throw new Error(`Format ${extName} is not valid`);
  }

  return fileExtNameSelection[extName](data);
};
