import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedResult = readFile('stylish.txt');
const expectedPlainDiff = readFile('plain.txt');
const expectedJson = readFile('json.txt');
const filepath1 = getFixturePath('file1.json');
const filepath2 = getFixturePath('file2.json');

test('compare two json objects', () => {
  expect(genDiff(filepath1, filepath2))
    .toEqual(expectedResult);
});

const filepathYml1 = getFixturePath('file1.yml');
const filepathYml2 = getFixturePath('file2.yml');
test('compare two yml objects', () => {
  expect(genDiff(filepathYml1, filepathYml2))
    .toEqual(expectedResult);
});

test('compare plain genDiff', () => {
  expect(genDiff(filepath1, filepath2, 'plain'))
    .toEqual(expectedPlainDiff);
});

test('compare json format genDiff', () => {
  expect(genDiff(filepath1, filepath2, 'json'))
    .toEqual(expectedJson);
});
