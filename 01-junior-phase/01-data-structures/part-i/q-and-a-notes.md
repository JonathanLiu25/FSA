## What is stateful?

What is state in programming?

The set of values at a given moment, it changes!

Reducing the number of moving parts is always a good idea, so reduce the number of variables that change in your program.

## Garbage collection, JS sanitation division

What is that?

Freeing up memory whose data is no longer needed—automatically.

Javascript does this with objects that nothing is pointing to. The v8 does this automatically every so often.

## Node one argument

Sure.

## Amortized clearing

It's better to do something infrequently than always (if we can get away with it).

Trading time for space.


## Plus plus

```js
var x = 9;
var y = x++; // increments variable but returns previous value
console.log(y); // 9
console.log(x); // 10
```

...it's sort of like:

```js
function plusPlus (obj, property) {
  var old = obj[property];
  obj[property] = obj[property] + 1;
  return old;
}

var thing = {x: 4};
var oldValue = plusPlus(thing, 'x');
```
