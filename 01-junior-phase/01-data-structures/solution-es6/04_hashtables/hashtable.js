// es6 Classes: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
class HashNode {
  constructor(key, val) {
    this.value = val;
    this.key = key;
  }
}

class HashTable {
  // default parameters: If parameter is undefined we set it
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters
  constructor(num = 35) {
    this.numBuckets = num;
    this.buckets = new Array(35);
  }
  set(key, val) {
    if (typeof key !== 'string') throw new TypeError('Keys must be strings');
    let hash = this.hash(key);
    this.buckets[hash] = this.buckets[hash] || new LinkedList();
    this.buckets[hash].addToHead(new HashNode(key, val));
  }
  get(key) {
    let hash = this.hash(key);
    return this.buckets[hash].search(node => node.key === key).value;
  }
  hasKey(key) {
    let hash = this.hash(key);
    return Boolean(this.buckets[hash].search(node => node.key === key));
  }
  hash(str) {
    let sum = 0;
    for (let i = 0; i < str.length; i++) {
      sum += str.charCodeAt(i)
    }
    return sum % this.numBuckets;
  }
}
