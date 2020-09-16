import gendiff from '../src/index.js';

const rightAnswerStylish =
  `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const rightAnswerPlain =
`Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From '50' to '20'
Property 'verbose' was added with value: 'true'`;

const difRightAnswerStylish =
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

const difRightAnswerPlain =
`Property 'common.follow' was added with value: 'false'
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From 'true' to [complex value]
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From 'too much' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;

describe('Stylish format', () => {
  test('Simple files', () => {
    expect(gendiff('__tests__/__fixtures__/file1.json', '__tests__/__fixtures__/file2.json')).toBe(rightAnswerStylish);
    expect(gendiff('__tests__/__fixtures__/file1.yml', '__tests__/__fixtures__/file2.yml')).toBe(rightAnswerStylish);
    expect(gendiff('__tests__/__fixtures__/file1.ini', '__tests__/__fixtures__/file2.ini')).toBe(rightAnswerStylish);
  });
  test('Recursive files', () => {
    expect(gendiff('__tests__/__fixtures__/treeFile1.json', '__tests__/__fixtures__/treeFile2.json')).toBe(difRightAnswerStylish);
    expect(gendiff('__tests__/__fixtures__/treeFile1.yml', '__tests__/__fixtures__/treeFile2.yml')).toBe(difRightAnswerStylish);
    expect(gendiff('__tests__/__fixtures__/treeFile1.ini', '__tests__/__fixtures__/treeFile2.ini')).toBe(difRightAnswerStylish);
  });
});

describe('Plain format', () => {
  test('Simple files', () => {
    expect(gendiff('__tests__/__fixtures__/file1.json', '__tests__/__fixtures__/file2.json', 'plain')).toBe(rightAnswerPlain);
    expect(gendiff('__tests__/__fixtures__/file1.yml', '__tests__/__fixtures__/file2.yml', 'plain')).toBe(rightAnswerPlain);
    expect(gendiff('__tests__/__fixtures__/file1.ini', '__tests__/__fixtures__/file2.ini', 'plain')).toBe(rightAnswerPlain);
  });
  test('Recursive files', () => {
    expect(gendiff('__tests__/__fixtures__/treeFile1.json', '__tests__/__fixtures__/treeFile2.json', 'plain')).toBe(difRightAnswerPlain);
    expect(gendiff('__tests__/__fixtures__/treeFile1.yml', '__tests__/__fixtures__/treeFile2.yml', 'plain')).toBe(difRightAnswerPlain);
    expect(gendiff('__tests__/__fixtures__/treeFile1.ini', '__tests__/__fixtures__/treeFile2.ini', 'plain')).toBe(difRightAnswerPlain);
  });
});
