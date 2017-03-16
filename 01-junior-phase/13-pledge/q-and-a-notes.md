## promise creation

A new promise should have a "executor" function. The executor function is in charge of resolving or rejecting this new promise. Executor runs right away, and its received callbacks `resolve` and `reject` may be called right away, soon, way later, or never. The executor only runs once.

## promise internal state

Promises can be pending, fulfilled, or rejected. We often use the term "settled" for non-pending (fulfilled or rejected).

## promise chaining and flow

Each `.then` off an existing promise ("upstream promise"—promise A) creates a new promise ("downstream promise"—promise B). 

Each `.then` will have up to two handlers, the first for success (resolution of the upstream promise) and the second for error (rejection of the upstream promise).

Each promise can have multiple "sibiling" `.then`s—one upstream promise can produce many downstream promises.

If an upstream promise resolves and has no success handler: the downstream promise resolves with the original resolution value.

If an upstream promise rejects and has no error handler: the downstream promise rejects with the original rejection reason.

If a handler RETURNS, the upstream promise's handler's return value determines the downstream promise's resolution value.

If a handler THROWS, the upstream promise's handler's thrown error determines the downstream promise's rejection reason.

"Assimilation": when a handler RETURNS a promise ("returned promise"), the downstream promise resolves with the same resolution value as the returned promise, or rejects with the same rejection reason as the returned promise. Or: the downstream promise settles matches the returned promise settles.


## when does it end?

If the terminal promise does not have a `.then` where does the value / error go?

The final `.then` determines the `'"result"'` of the promise chain.

## what are "handlers" generally speaking?

The word "handler" in Javascript: a function that gets triggered by an "event" happening. An event might be a user clicking or a promise resolving.

Promise "handlers": function that takes an input and based on some state, returns something. In promises, the handler's execution result determines the resolution / rejection of the downstream promise.

## failing to return promises in `.then` handlers

The downstream promise will resolve immediately to `undefined` and if the not-returned-promise errors, the whole chain won't know about it.
