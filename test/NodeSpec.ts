import test from 'ava';
import Tags from '../src/classes/Tags';
import Node from '../src/classes/Node';
import NodeJSON from '../src/interfaces/Node/NodeJSON';
import DataSet from '../src/classes/DataSet';

const ds: DataSet = DataSet.getInstance();
const testTags: Tags = Tags.getInstance();

const builtNode: NodeJSON  = {
  id: -1,
  lat: 0, 
  lon: 0,
  tags: ['0:0']
}

test('builds node', t => {
  const node: Node = new Node();
  node.setId(-1);
  node.setLoc([0,0])
  node.addTag(testTags.set('building', 'yes'));
  t.true(ds.containsNode(node.getId()));
  t.deepEqual([0,0], node.getLoc());
  t.deepEqual(node.build(), builtNode);
})