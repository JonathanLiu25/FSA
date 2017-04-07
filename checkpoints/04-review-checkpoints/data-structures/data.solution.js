// NOTE: for queues and stacks, you could use simple array methods to get the necessary behavior. That's a basic Data Structure that implements the Q/S ADTs. Going one step further, you can use indices only (no .length or array methods) to not only implement how those methods must be working, but also to improve performance in the case of the Queue. Finally, another DS to implement these ADTs is your Linked List — with a double-ended linked list that can add/remove from either end, it is trivial to go back and use it to implement your Q/S.

//-----------------------------------------
// Stacks

function Stack () {
  this.data = [];
  this.head = this.tail = 0;
}

Stack.prototype.add = function (item) {
  this.data[this.tail++] = item;
  return this; // for chaining, do not edit
};

Stack.prototype.remove = function () {
  if (this.head === this.tail) return;
  return this.data[--this.tail];
};

//-----------------------------------------
// Queues

function Queue () {
  this.data = [];
  this.head = this.tail = 0;
}

Queue.prototype.add = function (item) {
  this.data[this.tail++] = item;
  return this; // for chaining, do not edit
};

Queue.prototype.remove = function () {
  if (this.head === this.tail) return;
  // amortized garbage collection
  // if (this.head === 100) {
  //   this.data = this.data.slice(this.head);
  //   this.head = 0;
  //   this.tail -= 100;
  // }
  return this.data[this.head++];
};

//-----------------------------------------
// Linked lists

function LinkedList () {
  this.head = this.tail = null;
}

function ListNode (item, prev, next) {
  this.item = item;
  this.next = next || null;
  this.prev = prev || null;
}

LinkedList.prototype.addToTail = function (item) {
  var newNode = new ListNode(item, this.tail);
  if (this.tail) this.tail.next = newNode;
  else this.head = newNode;
  this.tail = newNode;
  return this; // for chaining, do not edit
};

LinkedList.prototype.removeFromTail = function () {
  if (!this.tail) return;
  var oldTail = this.tail;
  this.tail = oldTail.prev;
  if (this.tail) this.tail.next = null;
  else this.head = null;
  return oldTail.item;
};

LinkedList.prototype.forEach = function (iterator) {
  var currentNode = this.head;
  while (currentNode) {
    iterator(currentNode.item);
    currentNode = currentNode.next;
  }
};

//-----------------------------------------
// Association lists

function Alist () {
  this.head = null;
}

function AlistNode (key, value, next) {
  this.key = key;
  this.value = value;
  this.next = next;
}

// Alists can be implemented in two ways: `set` can simply add a new head node, then `get` will automatically retrieve the most recent value for a key; or, `set` can search the list to check if a node with a given key exists, and change its value. The former way is often preferred because of its O(1) addition time, but the downside is a gradual accumulation of garbage memory. When used in a hash table (as Alists most often are) the constant-time addition is considered worth the small memory penalty. If you made the extra effort to find any old node with the same key, however, that is good too! The pros and cons depend on your use case.

Alist.prototype.set = function (key, value) {
  this.head = new AlistNode(key, value, this.head);
  return this;
};

// Alist.prototype.set = function (key, value) {
//   var currentNode = this.head;
//   while (currentNode) {
//     if (currentNode.key === key) {
//       currentNode.value = value;
//       return this;
//     }
//     currentNode = currentNode.next;
//   }
//   this.head = new AlistNode(key, value, this.head);
//   return this;
// };

Alist.prototype.get = function (key) {
  var currentNode = this.head;
  while (currentNode) {
    if (currentNode.key === key) return currentNode.value;
    currentNode = currentNode.next;
  }
};

//-----------------------------------------
// Hash tables

function _hash (key) {
  var hashedKey = 0;
  for (var i = 0; i < key.length; i++) {
    hashedKey += key.charCodeAt(i);
  }
  return hashedKey % 20;
}

function HashTable () {
  this.buckets = Array(20);
  for (var i = 0; i < this.buckets.length; i++) {
    this.buckets[i] = new Alist();
  }
}

HashTable.prototype.set = function (key, value) {
  this.buckets[_hash(key)].set(key, value);
  return this; // for chaining, do not edit
};

HashTable.prototype.get = function (key) {
  return this.buckets[_hash(key)].get(key);
};

// you can see that an association list makes implementing a hash table much easier than using a vanilla linked list.

//-----------------------------------------
// Binary search trees

function BinarySearchTree (val) {
  this.value = val;
}

BinarySearchTree.prototype.insert = function(val) {
  var direction = val < this.value ? 'left' : 'right';
  if (this[direction]) this[direction].insert(val);
  else this[direction] = new BinarySearchTree(val);
  return this;
};

// // iterative
// BinarySearchTree.prototype.insert = function(val) {
//   let node = this;
//   let direction = val < node.value ? 'left' : 'right';
//   while (node[direction]) {
//     node = node[direction]
//     direction = val < node.value ? 'left' : 'right';
//   }
//   node[direction] = new BinarySearchTree(val)
//   return this;
// };

BinarySearchTree.prototype.min = function() {
  return this.left ? this.left.min() : this.value;
};

// // iterative
// BinarySearchTree.prototype.min = function() {
//   var minNode = this;
//   while (minNode.left) minNode = minNode.left;
//   return minNode.value;
// };

BinarySearchTree.prototype.max = function() {
  return this.right ? this.right.max() : this.value;
};

// iterative max is almost idenitcal to iterative min

BinarySearchTree.prototype.contains = function(val) {
  if (this.value === val) return true;
  var direction = val < this.value ? 'left' : 'right';
  if (this[direction]) return this[direction].contains(val);
  return false;
};

// // iterative
// BinarySearchTree.prototype.contains = function(val) {
//   var currentNode = this;
//   while (currentNode) {
//     if (currentNode.value === val) return true;
//     var direction = val < currentNode.value ? 'left' : 'right';
//     currentNode = currentNode[direction];
//   }
//   return false;
// };

BinarySearchTree.prototype.traverse = function(iterator) {
  if (this.left) this.left.traverse(iterator);
  iterator(this.value);
  if (this.right) this.right.traverse(iterator);
};

// // iterative
// // this is a bit tricky! See if you can follow the logic
// BinarySearchTree.prototype.traverse = function(iterator) {
//   var stack = [],
//       currentNode = this;
//   while (stack.length || currentNode) {
//     if (currentNode) {
//       stack.push(currentNode);
//       currentNode = currentNode.left;
//     } else {
//       currentNode = stack.pop();
//       iterator(currentNode.value);
//       currentNode = currentNode.right;
//     }
//   }
// };

// // in English:
// // keep going down the left side, adding nodes to a stack.
// // if you run out of left children, pop off the stack and process that node.
// // then go to that node's right child, and start again:
// // keep going down the left side, adding nodes to a stack…
// // etc.
// // it helps to draw a diagram!

// // Note that pre-order or BFS iterative traversal is much simpler.
