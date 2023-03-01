import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return typeof (value) === 'string' ? `'${value}'` : String(value);
};

const plain = (tree) => {
  const iter = (currentValue, path) => {
    const lines = currentValue
      .filter(({ type }) => type !== 'unchanged')
      .map((obj) => {
        const nameOfObject = [...path, obj.name];
        const property = nameOfObject.join('.');

        switch (obj.type) {
          case 'added':
            return `Property '${property}' was added with value: ${stringify(obj.value)}`;
          case 'deleted':
            return `Property '${property}' was removed`;
          case 'changed':
            return `Property '${property}' was updated. From ${stringify(obj.value1)} to ${stringify(obj.value2)}`;
          case 'nested':
            return iter(obj.children, nameOfObject);
          default:
            throw new Error('Unknown type');
        }
      });
    return lines.join('\n');
  };

  return iter(tree, []);
};

export default plain;
