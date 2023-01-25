#!/usr/bin/env node

const makeString = (obj) => {
    const string = JSON.stringify(obj);
    let newString = '';
    for (const letter of string) {
      if (letter === '{') {
        newString = `${letter}\n${newString}`;
      }
      if (letter === '}') {
        newString = `${newString}\n${letter}`;
      }
      if (letter !== '"' && letter !== ','
          && letter !== '{'
          && letter !== '}') {
        newString += letter;
      }
      if (letter === ',') {
        newString += '\n';
      }
      if (letter === ':') {
        newString += ' ';
      }
    }
    return newString;
  };
  
  const makeMinus = (obj) => {
    const result = {};
    const entries = Object.entries(obj);
    for (const [key, value] of entries) {
      result[`- ${key}`] = value;
    }
    return result;
  };
  
  const makePlus = (obj) => {
    const result = {};
    const entries = Object.entries(obj);
    for (const [key, value] of entries) {
      result[`+ ${key}`] = value;
    }
    return result;
  };
  
  const sort = (object) => {
    const newKeys = [];
    const keys = Object.keys(object);
  
    for (const key of keys) {
      newKeys.push(key.slice(2));
    }
    const sortObj = newKeys.sort()
      .reduce(
        (obj, key) => {
          for (let i = 0; i < keys.length; i += 1) {
            if (key === keys[i].slice(2) && keys[i].slice(0, 2) === '  ') {
              obj[`    ${key}`] = object[`  ${key}`];
            } else if (key === keys[i].slice(2) && keys[i].slice(0, 2) === '- ') {
              obj[`  - ${key}`] = object[`- ${key}`];
            } else if (key === keys[i].slice(2) && keys[i].slice(0, 2) === '+ ') {
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
    const obj1 = makeMinus(object1);
    const obj2 = makePlus(object2);
  
    const entries1 = Object.entries(obj1);
    const entries2 = Object.entries(obj2);
  
    const result = { ...obj1, ...obj2 };
    for (const [key1, value1] of entries1) {
      for (const [key2, value2] of entries2) {
        if (key1.slice(2) === key2.slice(2)) {
          delete result[key1];
          delete result[key2];
          if (value1 === value2) {
            delete result[key2];
            const newKey = `  ${key1.slice(2)}`;
            result[newKey] = value1;
          } else {
            result[key1] = value1;
            result[key2] = value2;
          }
        }
      }
    }
    return sort(result);
  };
const o1 = {
    "host": "hexlet.io",
    "timeout": 50,
    "proxy": "123.234.53.22",
    "follow": false
  };

  const o2 = {
    "timeout": 20,
    "verbose": true,
    "host": "hexlet.io"
  };

console.log(makeString(compare(o1,o2)));