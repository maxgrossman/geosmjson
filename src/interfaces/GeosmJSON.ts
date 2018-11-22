import RelationJSON from "./Relation/RelationJSON";
import NodeJSON from "./Node/NodeJSON";
import WayJSON from "./Way/WayJSON";

export default interface GeosmJSON {
  nodes: NodeJSON[],
  ways: WayJSON[],
  relations: RelationJSON[];
  tags: Map<string, string[]>
}