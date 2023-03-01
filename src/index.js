import fs from 'fs';
import path from 'path';
import buildTree from './utils.js';
import parser from './parsers.js';
import format from './formatters/index.js';

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
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

  const resultObject = buildTree(obj1, obj2);

  return format(resultObject, formatName);
};

export default genDiff;
