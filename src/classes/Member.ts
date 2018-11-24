import IMember from "../interfaces/Relation/IMember";
import DataSet from './DataSet';
import Element from './Element';

const ds: DataSet = DataSet.getInstance();

export default class Member implements IMember {
  type: string;
  ref: number;
  role: string;

  constructor(type: string, ref: number, role: string = '') {
    this.type = type;
    this.ref = ref;
    this.role = role;
  }

  /**
   * return member type...
   * @return {string}
   */
  getType(): string {
    return this.type;
  }

  /**
   * Returns member reference.
   */
  getRef(): number {
    return this.ref;
  }

  /**
   * returns element member references
   * @return {Element}
   */
  getElement(): Element {
    return this.type === 'node' 
      ? ds.getNode(this.ref)
      : this.type === 'way'
      ? ds.getWay(this.ref)
      : ds.getRelation(this.ref);
  }
  build(): IMember {
    return {
      type: this.type,
      ref: this.ref,
      role: this.role
    } as IMember;
  }
}