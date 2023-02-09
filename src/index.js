import fs from 'fs';
import path from 'path';
import { compare, makeString } from './utils.js';
import parser from './parsers.js';

export const genDiff = (filepath1, filepath2) => {
  const getExtention = (filepath) => path.extname(filepath).slice(1);

  const getCurrentPath = (filepath) => path.resolve((process.cwd(), filepath));

  const readFile = (currentPath) => fs.readFileSync(currentPath);

  const currentPath1 = getCurrentPath(filepath1);
  const currentPath2 = getCurrentPath(filepath2);

  const readFile1 = readFile(currentPath1);
  const readFile2 = readFile(currentPath2);

  const extention1 = getExtention(filepath1);
  const extention2 = getExtention(filepath2);

  const obj1 = parser(readFile1, extention1);
  const obj2 = parser(readFile2, extention2);

  const resultObject = compare(obj1, obj2);
  const str = makeString(resultObject);
  console.log(str);
  return str;
};
