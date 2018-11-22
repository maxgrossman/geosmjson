import IElement from './IElement';
import TagMap from '../Tags';

export default interface ElementJSON {
  tags: Array<string>; 
  id: number;
  user?: string;
  uid?: number;
  timestamp?: Date;
  visible?: boolean;
  version?: number;
  changeset?: number
}