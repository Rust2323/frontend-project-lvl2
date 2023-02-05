/* eslint no-param-reassign: "error" */
const makeString = (obj) => {
  const string = JSON.stringify(obj);
  let newString = '';
  for (let i = 0; i < string.length; i += 1) {
    if (string[i] === '{') {
      newString = `${string[i]}\n${newString}`;
    }
    if (string[i] === '}') {
      newString = `${newString}\n${string[i]}`;
    }
    if (string[i] !== '"' && string[i] !== ','
        && string[i] !== '{'
        && string[i] !== '}') {
      newString += string[i];
    }
    if (string[i] === ',') {
      newString += '\n';
    }
    if (string[i] === ':') {
      newString += ' ';
    }
  }
  return newString;
};

const changeKeyName = (object, simbol = '') => {
  const keys = Object.keys(object);
  const result = keys.reduce((obj, key) => {
    obj[`${simbol} ${key}`] = object[key];
    return obj;
  }, {});
  return result;
};

const sort = (object) => {
  const newKeys = [];
  const keys = Object.keys(object);

  for (let i = 0; i < keys.length; i += 1) {
    newKeys.push(keys[i].slice(2));
  }
  const sortObj = newKeys.sort()
    .reduce(
      (obj, key) => {
        for (let i = 0; i < keys.length; i += 1) {
          const clearKey = keys[i].slice(2);
          const keySimbol = keys[i].slice(0, 2);
          if (key === clearKey && keySimbol === '  ') {
            obj[`    ${key}`] = object[`  ${key}`];
          } else if (key === clearKey && keySimbol === '- ') {
            obj[`  - ${key}`] = object[`- ${key}`];
          } else if (key === clearKey && keySimbol === '+ ') {
            obj[`  + ${key}`] = object[`+ ${key}`];
          }
        }

        return obj;
      },
      {},
    );
  return sortObj;
};

const compare = (object1, object2) => {
  const obj1 = changeKeyName(object1, '-');
  const obj2 = changeKeyName(object2, '+');
  const sum = { ...obj1, ...obj2 };
  const objectsKeys = Object.keys(sum);
  const result = {};
  /* eslint-disable-next-line */
  for (const key of objectsKeys) {
    const cleanKey = key.slice(2);
    if (!Object.hasOwn(object1, cleanKey)) {
      result[key] = obj2[key];
    } else if (!Object.hasOwn(object2, cleanKey)) {
      result[key] = obj1[key];
    } else if (object1[cleanKey] === object2[cleanKey]) {
      const newKey = `  ${cleanKey}`;
      result[newKey] = obj2[key];
    } else if (Object.hasOwn(object1, cleanKey) && Object.hasOwn(object2, cleanKey)) {
      if (key.slice(0, 1) === '-') {
        result[key] = obj1[key];
      } else {
        result[key] = obj2[key];
      }
    }
  }
  return sort(result);
};

export { compare, makeString };
