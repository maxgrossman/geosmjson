import ElementJSON from './ElementJSON';

export default interface IElement {
  id: number;
  tags: Array<string>;
  user?: string;
  uid?: number;
  timestamp?: Date;
  visible?: boolean;
  version?: number;
  changeset?: number;
  build(): ElementJSON;
}