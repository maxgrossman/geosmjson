import Element from './Element';
import IWay from '../interfaces/Way/IWay';
import DataSet from './DataSet';
import WayJSON from '../interfaces/Way/WayJSON';

const ds: DataSet = DataSet.getInstance();

// Sorta inspired by JOSM node class. It is a lovely class.
// https://github.com/openstreetmap/josm/blob/mirror/src/org/openstreetmap/josm/data/osm/Way.java 
export default class Way extends Element implements IWay {
  nodes: Array<number> = [];
  static WAY: string = 'way';
  static wayCrossWalk: object = {
    nd: 'getNodes'
  }

  constructor(id: number = ds.nextNewId()) { 
    super(Way.WAY, id);
  };

  /**
   * sets nodes to provided array
   * @param {Array<number>} nodes nodes to set...
   */
  public setNodes(nodes: Array<number>): void {
    this.setProp('nd', Way.WAY);
    for (let i = 0; i < nodes.length; i++) {
      const node: number = nodes[i];
      if (!ds.containsNode(node)) {
        throw Error('cannot add node not yet in dataset!');
      }
      this.nodes.push(node);
    }
  }

  /**
   * adds node to nodes array
   */
  public addNode(nodeRef: number): void {
    this.setProp('nd', Way.WAY);
    this.nodes.push(nodeRef);
  }

  /**
   * gets node at given index.
   */
  public getNd(nodeRef: number): number {
    return this.nodes[nodeRef];
  }

  public getNodes(): Array<number> {
    return this.nodes;
  }

  public build(): WayJSON {
    const way: any =  super.build()
    
    const wayProps: Set<string> = this.props.get(Way.WAY)!;
    for (let prop of wayProps) {
      const getter: string = (<any>Way.wayCrossWalk)[prop];
      way[prop] = (<any>this)[getter]();
    }
    
    return way as WayJSON;
  }

}