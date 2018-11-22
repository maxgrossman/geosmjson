import test from 'ava';
import Tags from '../src/classes/Tags';

const testTags: Tags = Tags.getInstance();
test('Tags: sets tags and returns tag code', test => {
  [
    {
      key: 'building',
      val: 'yes',
      code: '0:0'
    },
    {
      tags: { building: 'house' },
      key: 'building',
      val: 'house',
      code: '0:1'
    },
    {
      key: 'highway',
      val: 'yes',
      code: '1:0'
    },
    {
      key: 'highway',
      val: 'tertiary',
      code: '1:1'
    }
  ].forEach(t => {
    const code: string = testTags.set(t.key, t.val);
    const tag: any = { [t.key]: t.val };

    test.deepEqual(t.code, code);
    test.deepEqual(tag, testTags.get(t.code));
  })
})
