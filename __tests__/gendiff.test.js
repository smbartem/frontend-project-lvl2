import gendiff from '../src/index.js';

const rightAnswer =
`{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('genDiff', () => {
  expect(gendiff('__tests__/__fixtures__/file1.json', '__tests__/__fixtures__/file2.json')).toBe(rightAnswer);
  expect(gendiff('__tests__/__fixtures__/file1.yml', '__tests__/__fixtures__/file2.yml')).toBe(rightAnswer);
  expect(gendiff('__tests__/__fixtures__/file1.ini', '__tests__/__fixtures__/file2.ini')).toBe(rightAnswer);
});
