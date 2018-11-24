import IRelation from "../interfaces/Relation/IRelation";
import Element from './Element';
import RelationJSON from "../interfaces/Relation/RelationJSON";
import Member from "./Member";
import DataSet from "./DataSet";
import IMember from "../interfaces/Relation/IMember";

const ds: DataSet = DataSet.getInstance();

export default class Relation extends Element implements IRelation {
  members:Member[] = [];
  tags: Array<string> = [];

  static RELATION = 'relation';
  static relationCrossWalk: object = {
    members: 'getIMembers'
  }

  constructor(id: number = ds.nextNewId()) {
    super(Relation.RELATION, id);
  }

  public addMember(member: Member) {
    this.setProp('members', Relation.RELATION)
    this.members.push(member);
  }

  public getMembers(): Member[] {
    return this.members;
  }

  public getIMembers(): IMember[] {
    return this.members.map(function(member) {
      return member.build();
    });
  }

  /**
   * Builds Relation's counterpart RelationJSON
   */
  public build(): RelationJSON {
    const relation: any = super.build();
    const relationProps: Set<string> = this.props.get(Relation.RELATION)!;

    for (let prop of relationProps) {
      const getter: string = (<any>Relation).relationCrossWalk[prop];
      relation[prop] = (<any>this)[getter]();
    }

    return relation as RelationJSON;
  }
}