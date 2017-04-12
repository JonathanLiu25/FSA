## How does include work in sequelize?

This is called eager loading, generate a SQL JOIN. We need an existing association that might use a join table.

Keep in mind for aliased associations: use the alias name AGAIN in the `include` expression. (See e.g. senior checkpoint solution.)

## Using app.param and app.all in express?

`app.param` (`router.param`): intercepts any route handler that matches the given param, can continue on towards next route handlers with data / work already done.

`app.all`: this registers a handler to match for a particular route FOR ANY VERB. It's different than `app.use` because `app.all` matches the EXACT url and `app.use` matches up to the next `/`.

What if you have multiple params? You can name them differently and have two `router.param`s, or you can split it up into multiple routers for example.

## The event handler stuff, like onsubmit, onclick

In native browser javascript, there are all sorts of built-in events that can occur due to user action / network change / etc. We can register callbacks to run when these events occur, and those callbacks will receive `event` objects. Those `event` objects have various methods and properties, some of which are true for all events, some of which are specific to particular events. Read more here: https://developer.mozilla.org/en-US/docs/Web/API/Event.

Sometimes in react we define anonymous functions that look like `...onChange={(e) => this.props.doSomething(e.target.value)}...`. Or other times we pass the method in directly `...onChange={this.props.doSomething}...`. Either can work depending on how we've defined that other method. Personal style choice.

## What goes in local state versus global state in redux

Global redux state: this is the store state! Can be passed to all / any components via e.g. `react-redux`'s `connect`. Global state is very useful for sharing information across components.

Local redux state: does not exist! Redux only has global state, if we want local state, we can do so with vanilla React.

Perhaps we could refer to "local redux state" as *what you map from the store to your props* and that seems pretty cool.

If we had a form and we were keeping track of its inputs, that might go in local state. Unless we need that input data in other components!

## Difference between library framework api ect

Library: tool that you use—bluebird, express, react-router, react. Think: "thing I install with npm".

Framework: tool that uses you. Kind of a particular flavor of library. Also defines the shape / architecture of our code / app.

API: a bunch of things, all of which have an "interface" that you can program with. A library is kind of "local" API, which brings classes and methods as its interface. A JSON endpoing is also a kind of "remote" API, which exposes routes to hit. Both are a "list of things you can do with a tool".

## Different between classical and prototypical inheritance

With classical inheritance (e.g. Java), classes are really their own thing, and parent/child relationships are explicit. The `class` keyword does something unique and special that could not otherwise be accomplished. Closed—not able to change class definition aftewards.

Prototypal inheritance is inherantly flexible and can "simulate" classical inheritance. The reverse is not true*. The `class` keyword (if we have one) is really just wrapping up a simulation of class. Open—able to change class definition afterwards.

* Citation needed.

Can behave very similarly.

## Envrioment apis/presistence on front end v backend

Persistence of data on the frontend: primarly we only have transient variables (`var`s) in memory, does not persist between page refresh. Except for cookies and local storage. More about local storage [here](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage). No file system!

Persistence of data on the backend: databases, the &^@*! file system. Really you can do whatever you want!

Environment APIs: a tool you have access to from the "environment" (browser, the OS, the toaster kernel) that you can USE but indirectly.

Examples:

- timer: both
- promises: not an environment API, maybe language API
- network: both
- redux: this is a library
- DOM: frontend
- file system: backend

## What are these things?

If programming were cooking...

- programming language (javascript): English, written language
- program (`console.log('yumm')`): recipe
- interpreter (v8): chef
- environment (node or chrome): kitchen
- environment APIs (see above): cookware, blenders, ovens, different tools
- operating system (sierra, windows NT, ubuntu): building
- actual machine (tosibha satellite and its processors and stuff): universe / physics

The ingredients would be...our data, variablse, things like that.

## What exactly makes something re render in react

Rule #1: `this.setState()` got called will cause re-render for THIS component and any of its children that receive new props (see rule #2).

Rule #2: if a component receives new props, it re-renders.

If something changes on the store and you're listening for it...this will only cause a re-render if your listener calls `this.setState(...)`. But otherwise `store.subscribe` does not itself trigger re-render when the redux store changes.

How does `react-redux`'s' `connect` interact with `setState` and will it always cause re-rendering of the wrapped component. `connect` will produce a component that is automatically listening to the store and calling `setState` when the store changes. It will only cause re-rendering of the wrapped component if the props it is passing to the wrapped component (via `mapStateToProps`) are different.

## How to tell when an operation is asynchronous

You cannot do this with mortal powers. Use the docs to be sure.

On the other hand, you can OFTEN infer. Like if it's using callbacks (especially error-first callbacks). Array methods like `map`, `forEach`, `reduce` are not async—those callbacks are not error-first callbacks. Promise-y looking things also a dead-giveaway for async stuff: `.then`.

## CRUD vs REST

CRUD: create, read, update, delete. Common data operations. "CRUD apps" describe software that do such things. Potentially many games might not be "CRUD apps"—also another example: calculator. External description of app behavior.

REST: representational state transfer. Standard for applications and in particular communication of data ("state") in applications. Internal description of its behavior. RESTful...

1. Client server model
2. Layered system
3. Stateless, each action is totally independent of previous ones
4. Cacheable
5. Code on demand
6. Interface is uniform
  a. Conforms to naming convention where URI is noun and method is verb
  b. Message contains enough information to properly render the data
  c. HATEOAS: choose-your-own-adventure story

[Link here for more](https://en.wikipedia.org/wiki/Representational_state_transfer)

REST is so cool because it standardizes how we communicate using our webapp APIs.

## React routes, what goes on under the hood? A get request? To the component?

What happens when a get request (i.e. I clikc on a link) occurs on a page that already has react router loaded?

- Changes the URL (through history API)
- Looks for route(s) that match and renders its (their) component(s)
- IT DOES NOT: cause a foreground request to the server

## Computational complexity/big O notation (differences between the two types)

Computational complexity: classify algorithms by their growth in some resource (time or space) as the input size grows.

Big O notation: describing shape of growth curve for algorithms by their growth in some resource (time or space) as the input size grows.

Big O time: determine the "number of steps" an algorithm takes as its input grows (you get to define what you mean by "input") then drop the non-dominant terms and the multiplicative constants.

## What is purpose of making something a child in react router

Examples of children in react router:

A:

```js
<Route to="outer" component={parent}>
  <Route to="inner" component={child} />
</Route>
```

B:

```js
<Route to="outer">
  <Route to="inner" component={child} />
</Route>
```

C:

```js
<Route to="outer">
  <Route to="inner" component={child} />
  <IndexRoute component={parent}>
</Route>
```

When we set up a parent / child relationship in react router, the matching URIs nest (for non absolute paths). So in A, B, and C, to render the `child` component the matching URI should be `outer/inner`.

Another thing happens when we set up a parent / child relationship: we create a view hierarchy where `parent` will receive `child` as its `props.children`. For example A in particular. E.g. when the URI is `outer/inner` the `parent` route matches and renders the `parent` component, which itself receives `props.children = child`.

## Senior checkpoint: `flowRight`

Tricky problem, go look at the solution and ask people questions about your implementation or ours.

## Approching recursive problems

Think about what your base case might be! You can do so by imagining inputs to the function that are _straightforward_. Usually inputs will be smallest / empiest they can be. Work outwards from there: think "what's one step away from my base case".

If you find it weird to look at recursion (seeing a function called inside itself), rename the recursive call. 

```js
function fibonacci (n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return magicalFibonacci(n - 2) + magicalFibonacci(n - 1);
}
```

Then when you're done replace the renamed function with the actual recursive name:

```js
function fibonacci (n) {
  if (n === 0) return 0;
  if (n === 1) return 1;
  return fibonacci(n - 2) + fibonacci(n - 1);
}
```

Tip: draw out the stack / stack trace / execution. There are some neat visualizers out there, e.g.: http://www.pythontutor.com/visualize.html#mode=edit.

Tidbit to look into if you're curious (won't help you write recursive algorithms, it's just a neat thing): http://2ality.com/2015/06/tail-call-optimization.html.
