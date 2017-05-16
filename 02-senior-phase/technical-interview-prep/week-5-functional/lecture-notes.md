# Functional Programming

## What is functional programming?

- Has partial function application ("currying" is a particular flavor of it)
- "Pure" / "stateless" function: predictable, given same input always produces same output
- First class functions: capture functions in variables, pass into other functions as input, return them
- Functions do not mutate (input, output, etc)
- "Functions should do one thing" (some person, probably a programmer)
- Often associated with declarative rather than imperative—describes high level input / output, but not step-by-step logic
- "Lots of little functions" (some other person)
- Has its roots in math / logic
- Recursion
- "Composition": basically combining functions
- The opposite of functional programming: big functions that do many things and have side-effects and mutate everything and don't return anything
- Object oriented programming can work with functional programming

## Javascript <3 / </3 functional programming

- Javascript wasn't really built for immutability, but can be extended to work that way
- Otherwise it has all the things we need to do functional programming

## Higher order functions

A function that takes in a function and/or returns a function. Essentially takes full advantage of first class functions.

Exercise: build an `EventEmitter` class. Instances should have two methods: `on` and `emit`. `on` takes an event name and a handler function, and registers that handler callback for that event name. `emit` takes an event name and some data, and invokes all callbacks registered to that event name (with the given data).

Follow-up: make `on` return a function that "deregisters" the given handler.

Example...

```js
const ee = new EventEmitter();
ee.on('cute', function (data) {
  console.log(data, 'is so cute!');
});
ee.emit('cute', 'FUNCTIONAL PROGRAMMING');
```

An stateful implementation, that nevertheless has an aspect of functional programming to it: higher-order functions.

```js
class EventEmitter {
  constructor () {
    this._handlers = {}; // <= state
  }
  on (eventName, callback) {
    this._handlers[eventName] = this._handlers[eventName] || [];
    this._handlers[eventName].push(callback);
    return function deregister () {
      this._handlers[eventName] = this._handlers[eventName].filter(function (eachCallback) {
        return eachCallback !== callback;
      });
    };
  }
  emit (eventName, data) {
    this._handlers[eventName].forEach((callback) => {
      callback(data);
    });
  }
}
```

## Partial function application

Taking a function, passing it *some* of its arguments, and getting a function back that takes the *remaining* arguments.

General idea for two-arg functions:

```js
function partiallyApply (originalFn, firstArg) {
  return function (secondArg) {
    return originalFn(firstArg, secondArg);
  };
}
function addTwoThings (a, b) {
  return a + b;
}
const addFiveToOneThing = partiallyApply(addTwoThings, 5);
addFiveToOneThing(10); // <= 15
```

Partial application for n-arg functions:

```js
partiallyApply(someFn, firstArg, secondArg, thirdArg); // <= returns a function that takes any number of arguments an will add them to its already-existing list of args
```

`.bind` does this! Javascript has had partial application all along (since es5).

```js
function addTwoThings (a, b) {
  return a + b;
}
const addFiveToOneThing = addTwoThings.bind(null, 5);
addFiveToOneThing(10); // <= 15
```

## Composition

Composition in general: we can take small things and make big things out of them.

When we "compose functions" we merge them. Results composition:

```js
function composeResults (...fns) {
  return function (arg) {
    return fns.reduce((accumulatedValue, nextFn) => {
      return nextFn(accumulatedValue);
    }, arg);
  };
}
function addFive (num) {
  return num + 5;
}
function multiplyByTen (num) {
  return num * 10;
}
const addFiveThenMultiplyByTen = composeResults(addFive, multiplyByTen); // <= returns a function (`flow` in lodash)
addFiveThenMultiplyByTen(3); // <= 80
```

Logical composition:

```js
function composeLogicalAnd (...predicates) {
  return function (arg) {
    return predicates.every((predicate) => {
      return predicate(arg);
    });
  };
}
function isEven (num) {
  return num % 2 === 0;
}
function isPositive (num) {
  return num > 0;
}
const isEvenAndPositive = composeLogicalAnd(isEven, isPositive);
isEvenAndPositive(3); // false
isEvenAndPositive(6); // true
isEvenAndPositive(-6); // false
```

## Composition vs. Inhertiance (object oriented programming)

Classical inheritane involves *extending* one class from another. It models the "is-a" relationship.

```js
class Fruit {
  constructor () {
    this.dropped = false;
  }
  dropFromPlant () {
    this.dropped = true;
  }
}
// inheritance
class Apple extends Fruit {
  turnIntoJuice () {
    return 'apple juice';
  }
}
```

Composition involves *using* one class from another. It models the "has-a" relationship.

```js
class Queue {
  constructor () {
    this._linkedList = new DoublyLinkedList();
  }
  enqueue (value) {
    return this._linkedList.addToHead(value);
  }
  dequeue () {
    return this._linkedList.removeFromTail();
  }
}
```

As opposed to (inheritance): 

```js
class Queue extends DoublyLinkedList {
  enqueue (value) {
    return this.addToHead(value);
  }
  dequeue () {
    return this.removeFromTail();
  }
}
```

Tradeoffs:

- Inheritance: can easily share and change functionality
- Inheritance: leads to a complex tree of methods / data that may or may not be necessary to subclasses ("You wanted a gorilla but you got the whole jungle." (some person))
- Composition: can easily pick and choose different data / methods to share / use between classes
- Composition: might have more redundancy when not needed

## Immutability

We don't mutate. But what the world? The world changes, right??? Well we model that by returning new states from previous ones. We have "tranformations" instead of "mutations".

Benefits:

1. Testability: more deterministic!
2. Traceability: easy to track / find changes in state, easy to keep record of changes that is unspoiled
3. Transparent dependencies (pure functions)
4. Predictable, makes debugging easier!
5. Structural sharing between successive states (to keep space minimal)

Exercise: build an immutable singly-linked list. It should have `head` property, and two methods: `addToHead` (which takes a value) and `removeFromHead` (which takes nothing). Each node in the linked list should have a `value` property (with the value given when it was added to the head) and a `next` property pointing to the next node, or null if it's the tail.

```js
const original = new ImmutableLinkedList();
const fiveAtHead = original.addToHead(5);
const sixAtHead = fiveAtHead.addToHead(6);

const removedSix = sixAtHead.removeFromHead();
/*

            removedSix
sixAtHead   fiveAtHead   original
    v           v           v
    6 --------> 5 -------> null

*/
```

```js
class ImmutableLinkedList {
  constructor (headNode) {
    if (headNode) {
      this.head = headNode;
    } else {
      this.head = null;
    }
  }
  addToHead (value) {
    const newHead = {
      value: value,
      next: this.head
    };
    return new ImmutableLinkedList(newHead);
  }
  removeFromHead () {
    if (!this.head) return this;
    return new ImmutableLinkedList(this.head.next);
  }
}
```

^^ We used classes above and immutability.
