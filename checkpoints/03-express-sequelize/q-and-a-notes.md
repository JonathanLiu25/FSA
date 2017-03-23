## hooks v `defaultValue`

What would be the difference between:

```js
...
{
  hooks: {
    beforeCreate: function (instance) {
      instance.someField = 'some default value';
    }
  }
}
...
```

...and...

```js
...
{
  someField: {
    type: Sequelize.STRING,
    defaultValue: 'some default value'
  }
}
...
```

One behavioral difference: the `beforeCreate` hook won't run if we `build` the instance, but the default value would be established by `build`.

One semantic difference: default value is more specific / expressive—so we should use it when we can.

So in general, prefer `defaultValue` is my advice.

## making sure `req.body` corresponds to sequelize model field names

(So that you can do `SomeModel.create(req.body)`.)

Document your API for the frontend programmer.j

The frontend programmer will specify the "request body" by sending over form data with `name`d inputs (old style) OR specify that as the data in an AJAX request.

```js
...
axios.post('/api/articles', {
  title: 'Whatever',
  content: 'something else'
});
...
```

## some es6

(See source code for refactorings.)

Use `const` for variables that are never re-assigned. Use `let` otherwise (`var` is not really necessary anymore and leads to some confusing use cases, see example below).

From foundations checkpoint...

```js
// DOES NOT WORK AS EXPECTED
function createFunctions (n) {
  var arrOfFns = [];
  for (var i = 0; i < n; i++) { // notice `var i` (function scope)
    arrOfFns.push(function () {
      return i;
    });
  }
  return arrOfFns;
}

// TOTALLY WORKS AS EXPECTED
function createFunctions (n) {
  var arrOfFns = [];
  for (let i = 0; i < n; i++) { // notice `let i` (block scope)
    arrOfFns.push(function () {
      return i;
    });
  }
  return arrOfFns;
}
```

`this`

Ordinary function: `this` is defined by the function's execution ONLY.

Arrow function (or bound function): `this` is defined by the function's definition ONLY.
