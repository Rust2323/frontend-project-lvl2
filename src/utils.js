/* eslint no-param-reassign: "error" */

import _ from 'lodash';

const buildTree = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const unionKeys = _.sortBy(_.union(keys1, keys2));

  const result = unionKeys.map((key) => {
    if (!_.has(obj1, key)) {
      return {
        name: key,
        value: obj2[key],
        type: 'added',
      };
    }
    if (!_.has(obj2, key)) {
      return {
        name: key,
        value: obj1[key],
        type: 'deleted',
      };
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return {
        name: key,
        type: 'nested',
        children: buildTree(obj1[key], obj2[key]),
      };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        name: key,
        value1: obj1[key],
        value2: obj2[key],
        type: 'changed',
      };
    }
    return {
      name: key,
      value: obj1[key],
      type: 'unchanged',
    };
  });
  return result;
};

export default buildTree;
