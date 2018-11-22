import IRelation from "../interfaces/Relation/IRelation";
import IMember from "../interfaces/Relation/IMember";
import Element from './Element';
import RelationJSON from "../interfaces/Relation/RelationJSON";
import Member from "./Member";
import DataSet from "./DataSet";

const ds: DataSet = DataSet.getInstance();

export default class Relation extends Element implements IRelation {
  members:Member[] = [];
  tags: Array<string> = [];
  static RELATION = 'relation';

  constructor(id: number = ds.nextNewId()) {
    super(Relation.RELATION, id);
  }

  public getMembers(): Member[] {
    return this.members;
  }

  /**
   * Builds Relation's counterpart RelationJSON
   */
  public build(): RelationJSON {
    return {} as RelationJSON;
  }
}