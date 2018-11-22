import INode from '../interfaces/Node/INode';
import Element from './Element'
import NodeJSON from '../interfaces/Node/NodeJSON';
import DataSet from './DataSet';

const ds: DataSet = DataSet.getInstance();

export default class Node extends Element implements INode {
  loc : Number[] = [];
 
  static NODE: string = 'node';
  static nodeCrossWalk: object = {
    lat: 'getLat',
    lon: 'getLon'
  }

  constructor(id: number = ds.nextNewId()) { 
    super(Node.NODE, id);
    ds.addNode(this);
  }

  /**
   * sets node location.
   * @param loc {Number[]} node location 
   */
  public setLoc(loc: Number[]): void {
    this.setProp('lat', Node.NODE);
    this.setProp('lon', Node.NODE);
    this.loc = loc;
  }

  /**
   * gets node location
   * @return {Number[]} node location
   */
  public getLoc(): Number[] {
    return this.loc;
  }

  /**
   * returns latitude
   */
  public getLat(): Number {
    return this.loc[0];
  }

  /**
   * returns longitude
   */
  public getLon(): Number {
    return this.loc[1];
  }

  /**
   * builds Node's NodeJSON counterpart
   */
  public build(): NodeJSON {
    const node: any = super.build();

    const nodeProps: Set<string> = this.props.get(Node.NODE)!;
    for (let prop of nodeProps) {
      const getter: string = (<any>Node).nodeCrossWalk[prop];
      node[prop] = (<any>this)[getter]();
    }

    return node as NodeJSON;
  }

}