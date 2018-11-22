import ElementJSON from "../Element/ElementJSON";
import IMember from './IMember';

export default interface RelationJSON extends ElementJSON {
  members: IMember[];
}