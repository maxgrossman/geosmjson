let instance: Tags;

class Tags {
  currentKeyCode: number;
  tags: Map<string, Array<string>>;
  keys: Map<number, string>;

  KEY_INDEX_OUT_OF_BOUNDS: string = 'This key index is out of bounds';
  VAL_INDEX_OUT_OF_BOUNDS: string = 'This val index is out of bounds';
  TAG_NOT_IN_MAP: string = 'This tag is not in the map!';

  constructor() {
    this.tags = new Map();
    this.keys = new Map();
    this.currentKeyCode = -1;
  }

  static getInstance(): Tags {
    if (!instance) {
      instance = new Tags();
    }
    return instance;
  }

  /**
   * given tagCode, returns full tag
   * @param {string} tagCode encoded tag part of element
   * @return {object<string, string>} full tag
   */
  public get(tagCode: string): object {
    const [keyIndex, valIndex]: Array<number> = tagCode.split(':').map(c => Number(c))

    // use keys map to reduce need for looping...
    let key: string | undefined = this.keys.get(keyIndex);

    if (!key) {
      throw new Error(this.KEY_INDEX_OUT_OF_BOUNDS)
    }

    const val: string = this.tags.get(key)![valIndex];

    if (!val) {
      throw new Error(this.VAL_INDEX_OUT_OF_BOUNDS);
    }

    return { [key]: val };
  }

  /**
   * Increments then returns currentKeyCode
   * @return {number} an updated keyCode
   */
  private incrementKeyCode(): number {
    this.currentKeyCode++
    return this.currentKeyCode;
  }

  /**
   * Replies keyCode for provided key
   * @param key {string} key in question.
   * @return {number} keyCode.
   */
  private getKeyCode(key: string): number {
    let keyCode: number = -1;
    for (let tagKey of Array.from(this.tags.keys())) {
      keyCode++;
      if (tagKey === key) break;
    }
    if (keyCode === -1) throw Error(this.TAG_NOT_IN_MAP);
    return keyCode;
  }

  /**
   * tags getter
   * @return {Map<string, string[]> tags map} tags
   */
  public getTags(): Map<string, string[]> {
    return this.tags;
  }

  /**
   * keys getter
   * @return {Map<number, string>} keys
   */
  private getKeys(): Map<number, string> {
    return this.keys;
  }

  /**
   * given key and val, init or update tags and return tagCode.
   * @param {string} key tag key
   * @param {string} val tag val
   * @return {string} tagCode
   */
  public set(key: string, val: string): string {
    let valCode: number = 0;
    let keyCode: number = 0;
    let exists: boolean = true;
    let nextVals: string[] = [];

    if (!this.getTags().has(key)) {
      this.getTags().set(key, [])
      exists = false;
      keyCode = this.incrementKeyCode();
      this.getKeys().set(keyCode, key);
      nextVals.push(val);
    }

    if (exists) {
      keyCode = this.getKeyCode(key);
      nextVals = nextVals.concat(this.getTags().get(key)!);
      const valIndex: number = nextVals.indexOf(val);
      valCode = valIndex > -1 ? valIndex: nextVals.length;
      nextVals.push(val);
    }

    this.getTags().set(key, nextVals);
    return `${keyCode}:${valCode}`;
  }
}

export default Tags;