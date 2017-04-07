## `getState` parameter in async action creators

Go see `next` action creator in juke.

In general, anytime you want your action creator to utilize some existing values for the (global) store state, `getState` is delightful.

## best practices for error handling

Throwing errors versus creating them: in general, we `return error`s when building utility methods for constructing useful error messages. We use `throw` _where_ the problem actually happens.

Express: we can unify error handling by having a single error handling middleware (i.e. a function that takes four parameters that we pass to `app.use`) at the "bottom" of our middleware stack. Then to trigger that error handling middleware we call `next()` on some error in any upstream middleware.

In express, if we're inside a promise chain we can `throw` the error and make sure to have `.catch(next)` so that the error will get passed to our error handling middleware.

## `can't set headers after they're sent`

We tried to send two responses, express didn't like that. But it was OK with it (i.e. just a warning).

How can this occur?

If we call `res.send()/end()/json()/render()` but continue executing code (i.e. it's not the last line in the function and the functino does not return directly after it), then we might end up calling `res.send()` again.

Keep in mind that `res.sendStatus` will set the status AND send a response—use `res.status` to set the status without sending a repsonse.

Watch out for any situations where you might calling `next()` AND sending a response—that next call will cause another middleware downstream to run, and likely something else will try to send an improper second response.

All middleware should only ever call next or send a response, never both, never neither.

## context of `this` inside a hook callback

The model (i.e. the class) NOT the instance. If you want access to the instance(s) that (those) will be the first parameter to the hook callback.

## `individualHooks` param

If this is set to true for a bulk operation it will end up executing the individual hooks for each of the instances it affects.

## `instance.destroy()`

It exists, needn't take arguments.

## controlled vs. uncontrolled components

(See here for more: https://facebook.github.io/react/docs/forms.html)

A controlled component keeps tracks of the value of that input.

If you have `value={anythingHere}` that is a controlled component. This forces the DOM to display that input as having THAT particular value.

An uncontrolled component does not keep track of the value of that input.

If you don't see `value=...` that is an uncontrolled component. This allows the DOM to display that input according to standard user interaction with it.

Uncontrolled components can still have `onChange` etc. handlers.

The only way an uncontrolled component value changes is through standard user interaction.

Controlled copmonents allow you set the input value for a reason OTHER THAN USER INTERACTION with it.
