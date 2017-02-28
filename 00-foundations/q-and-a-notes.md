## `.call` and `.apply` and `.bind`

Implicit context: when a function gets invoked, its implied context is "the thing to the left of the dot".

We can also use `.call`, `.apply`, or `.bind` to explicitly define the context.

Call takes a function, an object, the arguments, and it returns whatever that function returns.


```js
function foo (a, b, c) {
  console.log(a + b + c);
  console.log(this);
}
foo.call({a: 1}, 1, 2, 3);
foo({a: 1}, 1, 2, 3);
```

How is `.apply` different? It takes an array of arguments instead of "inline". Below is equivalent to above:

```js
function foo (a, b, c) {
  console.log(a + b + c);
  console.log(this);
}
foo.apply({a: 1}, [1, 2, 3]);
```

Don't really do this, but here's kinda how it works...

```js
Function.prototype.call = function (context) {
  var remainingArgs = [].slice.apply(arguments, [1]);
  return this.apply(context, remainingArgs);
};
```

`.bind` takes a function, an object, and any remaining arguments and returns a new function with that object as its `this` and those arguments "baked in".

```js
function foo (a, b, c) {
  console.log(a + b + c);
  console.log(this);
}
var boundFoo = foo.bind({x: 10}, 7,8,9); // partial function application
boundFoo();
```

## `keyAdder` and `this`

```js
var keyAdder = function () {
    var obj = this; // Because of .call!
    var sum = 0;
    for (var key in obj) {
        if (obj.hasOwnProperty(key) && typeof obj[key] === 'number') {
            sum += obj[key];
        }
    }
    return sum;
};
// without `obj`
var keyAdder = function () {
    var sum = 0;
    for (var key in this) {
        if (this.hasOwnProperty(key) && typeof this[key] === 'number') {
            sum += this[key];
        }
    }
    return sum;
};
```
