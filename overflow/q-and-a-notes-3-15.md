## `res.json` v `res.send`

`res.send` is utterly generic: it will figure out the content type of the response payload based on whatever we give it—e.g. it might send html. `res.json` will directly set the content type to JSON and send over whatever we give it.

If we do `res.json(someObj)` it's actually exactly the same as `res.send(someObj)` (because `res.send` detects that we _should_ set the content type to JSON for that particular argument).

I personalaly prefer using `res.json` because: a "good" constraint, more semantic. If I'm reading some code and I see `res.json(...)` I don't have to care about the `...`. On the other hand, if I see `res.send(...)` I have to figure out what the `...` is and how `res.send` will interpret it.

## promises

Help us add "order" to asynchronous operations, which otherwise could happen in arbitrary order.

## status messages in the response

One gotcha in express: `res.status(someNumber)` will not send a response, it will just set the status. `res.status(someNumber).end()` will send an empty response. OR you can do `res.sendStatus(someNumber)`. You can also do `res.send(someNumber)` and express will interpret that as a "set status and send it". Or you could have:

```js
...
res.status(201);
res.send(someThing);
...
```

What are these statuses? Numbers? Messages? Both? In general a status code has meaning just based on the first digit (of the three digits):

1xx: "processing" (I think)
2xx: everything went well
3xx: redirects
4xx: client error
5xx: server error

A status code is essentially just a number BUT in HTTP it will correspond to some message, like `200` corresponds to `OK`. 

In express the default status is 200, if you want 201 ("created") or something else, you'll have to go out of your way to set it.

## sequelize `bulkCreate`

Things to watch out for: won't run validations by default. You should be able to add a configuration option something like `{runValidators: true}`.

`bulkCreate` is nice when it works, but I tend to just use `.create` and `.map`.

## promises return something in a handler v using resolve and reject

In general, we need to return values in a promise's handler for the _next_ to promise's handler to receive that resolved value.

`resolve` and `reject` often appear in the `Promise` constructor. (Check out practical promises.)

There's also `Promise.resolve` and `Promise.reject`. `Promise.resolve` will take any value and convert it into a _promise for that value_ (if it was already a promise, it just stays as is).

You can't do:

```js
var x = 5;
x.then(function (result) { // ERROR!
  console.log(result);
});
```

...but you could do:

```js
var x = 5;
Promise.resolve(x)
.then(function (result) {
  console.log(result); // 5
});
```

## `.build` v `.create` in sequelize

`SomeModel.build()` just instantiates a brand new object in local memory using that model—NOTHING gets added to the database (until/unless you `.save` it). This is very useful for testing frequently, because we don't want the added overhead of the DB, we just want the methods / validations / getters associated with an instance. Note: `.find` operations will never return things that have _only_ been `build`ed.

`SomeModel.create()` will `.build` then `.save`—meaning the instance will also end up stored in the DB.
