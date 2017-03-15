## logging objects

One tip: `console.log('label', obj)` (will print key / val pairs) instead of `console.log('label' + obj)` (will print `[object Object]`).

Checkout "console wrapper for JS" package for sublime 3.

Sequelize objects will print with all of their fluff (e.g. `previousDataValues`), too. Use `instance.get({plain: true})` to see a _simple_ ("plain") object come back, or you can use `JSON.stringify(instance, null, 2)` to simply stringify into something plain yourself.

## scope of `beforeEach` (what is "each?")

The handler will run for any `it` (that's the "each") inside this current describe OR inside any nested describes.

## describe for scope and structure only?

Yes.

## validation testing

More validations in sequelize: http://docs.sequelizejs.com/en/v3/docs/models-definition/#validations.

## empty string v null in sequelize

These get validated separately. Use `...{fieldName: {validate: {notEmpty: true}}...` in your model defintion for the empty string one.

## writing tests that fail properly, too

Make sure to modify the SOURCE code (not the test code) when confirming that a test "fails when it should".

## how does `it` work with `done`?

Let's build `it`.

```js
// assume passTest(), failTest(), and callNextSpec() are already defined
...
function it (label, testToRun) {
  // run the function, if it throws an error, fail this test, if it does not, pass this test
  function completeThisSpec (error) {
    if (error) {
      failTest(label, error);
    } else {
      passTest(label);
    }
    callNextSpec();
  }
  // if async spec
  if (testToRun.length > 0) {
    testToRun(completeThisSpec);
  } else { // otherwise
    var error;
    var result;
    try {
      result = testToRun();
    } catch (_error) {
      error = _error;
    }
    if (error) {
      completeThisSpec(error);
    } else if (typeof result.then === 'function') { // if the spec returns a promise
      result
      .then(
        function () {
          completeThisSpec();
        },
        function (err) {
          completeThisSpec(err);
        }
      );
    } else { // it was synchronous and did not error
      completeThisSpec();
    }
  }
}
...
```
