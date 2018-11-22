import test from 'ava';
import Tags from '../src/classes/Tags';
import Node from '../src/classes/Node';
import Way from '../src/classes/Way';
import WayJSON from '../src/interfaces/Way/WayJSON';
import DataSet from '../src/classes/DataSet';

const ds: DataSet = DataSet.getInstance();
const testTags: Tags = Tags.getInstance();

const builtWay: WayJSON  = {
  id: -3,
  nd: [-1, -2],
  tags: ['0:0']
}

test('builds way', t => {
  const n1: Node = new Node();
  const n2: Node = new Node();
  
  n1.setLoc([0,0]); n2.setLoc([0,1]);
  
  const way: Way = new Way();
  way.setNodes([n1.getId(), n2.getId()]);
  way.addTag(testTags.set('building', 'yes'));
  t.deepEqual(way.build(), builtWay);
})