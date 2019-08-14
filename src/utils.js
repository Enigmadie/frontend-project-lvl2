import { every } from 'lodash';

export default (...items) => every(items
  .map(el => el instanceof Object && !(el instanceof Array)));
