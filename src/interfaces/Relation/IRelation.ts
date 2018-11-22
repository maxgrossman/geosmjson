import IElement from "../Element/IElement";
import IMember from './IMember';

export default interface IRelation extends IElement {
  members: IMember[];
}