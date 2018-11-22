import IElement from '../Element/IElement';

export default interface Way extends IElement {
  nodes: Array<number>
}