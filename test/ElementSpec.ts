import test from 'ava';

import DataSet from '../src/classes/DataSet';
import Tags from '../src/classes/Tags';
import Element from '../src/classes/Element';
import ElementJSON from '../src/interfaces/Element/ElementJSON';

const ds: DataSet = DataSet.getInstance();
const testTags: Tags = Tags.getInstance();

const builtElementJSON: ElementJSON = {
  tags: ['0:0'],
  id: -1,
  user: 'Giblet'
}

test('builds element', t => {
  const element: Element = new Element();
  element.setUser('Giblet');
  element.addTag(testTags.set('building', 'yes'));

  t.deepEqual({ 'building': 'yes' }, element.getTagMap());
  t.deepEqual(-1, element.getId());
  t.deepEqual('Giblet', element.getUser());
  t.deepEqual(element.build(), builtElementJSON);
})