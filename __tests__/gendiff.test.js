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

const difRightAnswer =
  `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: {
            key: value
        }
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: too much
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        fee: 100500
        deep: {
            id: {
                number: 45
            }
        }
    }
}`;

describe("Simple files", () => {
  test('genDiff', () => {
    expect(gendiff('__tests__/__fixtures__/file1.json', '__tests__/__fixtures__/file2.json')).toBe(rightAnswer);
    expect(gendiff('__tests__/__fixtures__/file1.yml', '__tests__/__fixtures__/file2.yml')).toBe(rightAnswer);
    expect(gendiff('__tests__/__fixtures__/file1.ini', '__tests__/__fixtures__/file2.ini')).toBe(rightAnswer);
  });
});
describe("Recursive files", () => {
  test('genDiff', () => {
    expect(gendiff('__tests__/__fixtures__/treeFile1.json', '__tests__/__fixtures__/treeFile2.json')).toBe(difRightAnswer);
    expect(gendiff('__tests__/__fixtures__/treeFile1.yml', '__tests__/__fixtures__/treeFile2.yml')).toBe(difRightAnswer);
    expect(gendiff('__tests__/__fixtures__/treeFile1.ini', '__tests__/__fixtures__/treeFile2.ini')).toBe(difRightAnswer);
  });
});
