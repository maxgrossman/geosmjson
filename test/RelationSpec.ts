
import test from 'ava';
import Tags from '../src/classes/Tags';
import Node from '../src/classes/Node';
import RelationJSON from '../src/interfaces/Relation/RelationJSON';
import DataSet from '../src/classes/DataSet';
import Relation from '../src/classes/Relation';
import Way from '../src/classes/Way';
import Member from '../src/classes/Member';

const ds: DataSet = DataSet.getInstance();
const testTags: Tags = Tags.getInstance();

const builtRelation: RelationJSON = {
    id: -7,
    tags: [],   
    members: [
        { type: 'way', ref: -5, role: ''},
        { type: 'way', ref: -6, role: ''}
    ]
};

test('builds relation', t => {
    const n1: Node = new Node();
    const n2: Node = new Node();
    const n3: Node = new Node();
    const n4: Node = new Node();

    const way1: Way = new Way();
    way1.setNodes([n1.getId(), n2.getId()]);

    const way2: Way = new Way();
    way2.setNodes([n3.getId(), n4.getId()]);
    
    const relation: Relation = new Relation();
    relation.addMember(new Member(way1.getType(), way1.getId()));
    relation.addMember(new Member(way2.getType(), way2.getId()));
    t.deepEqual(relation.build(), builtRelation);
})