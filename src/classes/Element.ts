"use strict";
import Tags from "./Tags";
import IElement from "../interfaces/Element/IElement";
import ElementJSON from "../interfaces/Element/ElementJSON";
import DataSet from "./DataSet";

import Node from './Node';
import Way from "./Way";

const tags: Tags = Tags.getInstance();
const ds: DataSet = DataSet.getInstance();

export default class Element implements IElement {
  type: string;
  id: number = 0;
  uid: number = 0;
  tags: string[] = [];
  user: string = "";
  changeset: number = 0;
  timestamp: Date = new Date();
  props: Map<string, Set<string>> = new Map<string, Set<string>>();
  visible: boolean = false;
  version: number = 0;
  static ELEMENT: string = 'element';
  static elementCrossWalk: object = {
    id: "getId",
    timestamp: "getTimestamp",
    uid: "getUid",
    changeset: "getChangeset",
    tags: "getTags",
    user: "getUser"
  };

  constructor(elementType: string = Element.ELEMENT, id: number = ds.nextNewId()) {
    this.type = elementType;
    this.props.set(Element.ELEMENT, new Set<string>());
    this.props.set(elementType, new Set<string>());
    this.setId(id);
    this.setProp('tags');
  }

  /**
   * sets element id.
   * @param id {number} numeric id
   */
  public setId(id: number): void {
    this.setProp('id');
    this.id = id;
  }

  protected setProp(prop: string, elementType: string = Element.ELEMENT): void {
    const elementSet: Set<string> = this.props.get(elementType)!;
    elementSet.add(prop);
    this.props.set(elementType, elementSet);
  }

  /**
   * sets element timestamp
   * @param {Date} timestamp
   */
  public setTimestamp(timestamp: Date): void {
    this.setProp("timestamp");
    this.timestamp = timestamp;
  }

  /**
   * sets element uid
   * @param {number} uid
   */
  public setUid(uid: number): void {
    this.setProp("uid");
    this.uid = uid;
  }

  /**
   * sets element visibility
   * @param visible {boolean}
   */
  public setVisible(visible: boolean): void {
    this.setProp("visible");
    this.visible = visible;
  }

  /**
   * sets element changeset
   * @param changeset {number} changeset id
   */
  public setChangeSet(changeset: number): void {
    this.setProp("changeset");
    this.changeset = changeset;
  }

  /**
   * sets element's tagRef.
   * @param tags {string[]} list of tag refs.
   */
  public setTags(tags: string[]): void {
    this.setProp("tags");
    this.tags = tags;
  }

  public addTag(tag: string): void {
    this.setProp("tags");
    this.tags.push(tag);
  }

  /**
   * sets element's version
   * @param version {number}
   */
  public setVersion(version: number): void {
    this.setProp("version");
    this.version = version;
  }

  /**
   * sets user
   * @param user {string} username
   */
  public setUser(user: string): void {
    this.setProp("user");
    this.user = user;
  }

  /**
   * returns map of human readable tags.
   * @return {object} map of node's tags
   */
  public getTagMap(): object {
    return this.tags.reduce((tagMap, tag) => {
      tagMap = Object.assign(tagMap, tags.get(tag));
      return tagMap;
    }, {});
  }

  /**
   * Returns element tags...
   * @return {string[]}
   */
  private getTags(): string[] {
    return this.tags;
  }

  /**
   * returns user
   * @return {string} user
   */
  public getUser(): string {
    return this.user;
  }

  /**
   * returns id
   * @return {number} id
   */
  public getId(): number {
    return this.id;
  }

  public getType() : string {
    return this.type;
  }

  /**
   * builds Element's ElementJSON counterpart
   */
  public build(): ElementJSON {
    const element: any = {};

    const elementProps: Set<string> = this.props.get(Element.ELEMENT)!;
    for (let prop of elementProps) {
      let getter: string = (<any>Element).elementCrossWalk[prop];
      element[prop] = (<any>this)[getter]();
    }

    return element as ElementJSON;
  }
}
