import Node from './Node';
import Way from './Way';
import Relation from './Relation';
import Tags from './Tags';
import GeosmJSON from '../interfaces/GeosmJSON';
import NodeJSON from '../interfaces/Node/NodeJSON';
import WayJSON from '../interfaces/Way/WayJSON';
import RelationJSON from '../interfaces/Relation/RelationJSON';

let instance: DataSet;

export default class DataSet {
  nodes: Map<Number, Node>;
  ways: Map<Number, Way>;
  relations: Map<Number, Relation>;
  newIds: number = 0;

  ABSENT_MEMBERS: string = 'Cannot add relation to dataset if relation members not already in dataset';

  constructor() {
    this.nodes = new Map();
    this.ways = new Map();
    this.relations = new Map();
  }

  static getInstance(): DataSet {
    if (!instance) {
      instance = new DataSet();
    }
    return instance;
  }
  
  public nextNewId(): number {
    this.newIds--;
    return this.newIds;
  }

  /** === NODES === **/

  /**
   * Adds node to dataset.
   * @param node {Node} OSM Node
   */
  public addNode(node: Node) {
    this.nodes.set(node.getId(), node);
  }

  /**
   * Determines if node already in the dataset
   * @param nodeRef {Number} node id
   * @return {boolean} true if node in id, false if not.
   */
  public containsNode(nodeRef: Number): boolean {
    return this.nodes.has(nodeRef);
  }

  /**
   * gets node referred by nodeRef.
   * @param nodeRef {Number} node reference.
   */
  public getNode(nodeRef: number): Node {
    return this.nodes.get(nodeRef)!;
  }
  
  /** === WAYS === **/
  
  public addWay(way: Way): void {
    this.ways.set(way.getId(), way);
  }

  /**
   * Determines if way already in the dataset
   * @param wayRef {Number} way id
   * @return {boolean} true if way in id, false if not.
   */
  public containsWay(wayRef: Number): boolean {
    return this.ways.has(wayRef);
  }

  /**
   * gets way referred by wayRef
   * @param wayRef {Number} way
   */
  public getWay(wayRef: number): Way {
    return this.ways.get(wayRef)!;
  }

  /**  === RELATIONS == **/
  
  /**
   * Adds relation to dataset if all members are already in the dataset
   * @param relation {Relation} relation to add
   */
  public addRelation(relation: Relation): void {
    for (let member of relation.getMembers()) {
      let type: string = member.getType();
      let exists: boolean = (<any>this)[type].has(member.getRef());
      if (!exists) throw new Error(this.ABSENT_MEMBERS);
    }

    this.relations.set(relation.getId(), relation);
  }

  /**
   * Determines if relation already in the dataset
   * @param relationRef {Number} relation id
   * @return {boolean} true if relation in id, false if not.
   */
  public containsRelation(relationRef: Number): void {
    this.relations.has(relationRef);
  }

  public getRelation(relationRef: Number): Relation {
    return this.relations.get(relationRef)!;
  }

  public build(): GeosmJSON {
    const nodes: NodeJSON[] = [];    
    const ways: WayJSON[] = [];
    const relations: RelationJSON[] = [];

    for (let node of this.nodes.values()) {
      nodes.push(node.build()); 
    }
    for (let way of this.ways.values()) {
      ways.push(way.build());
    }
    for (let relation of this.relations.values()) {
      relations.push(relation.build());
    }

    return {
      nodes: nodes,
      ways: ways,
      relations: relations,
      tags: Tags.getInstance().getTags()
    } as GeosmJSON;
  }
}