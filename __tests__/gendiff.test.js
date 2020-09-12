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
  expect(gendiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toBe(rightAnswer);
});
