import fs from 'fs';
import path from 'path';
import { compare, makeString } from './utils.js';

export const genDiff = (filepath1, filepath2) => {
  const obj1 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), filepath1), 'utf-8'));
  const obj2 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), filepath2), 'utf-8'));
  const obj3 = compare(obj1, obj2);
  const str = makeString(obj3);
  console.log(str);
  return str;
};


