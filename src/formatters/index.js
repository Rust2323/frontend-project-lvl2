import plain from './plain.js';
import stylish from './stylish.js';
import json from './json.js';

const format = (tree, formatName) => {
  switch (formatName) {
    case 'stylish': {
      return stylish(tree);
    }
    case 'plain': {
      return plain(tree);
    }
    case 'json': {
      return json(tree);
    }
    default:
      throw new Error('Invalid format.\n Use json, plain or stylish formatters');
  }
};

export default format;
