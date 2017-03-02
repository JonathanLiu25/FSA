## type coercion

Double equals is weird: https://dorey.github.io/JavaScript-Equality-Table/, my advice is only use it if you're trying to take advantage of that weirdness

...otherwise default to `===`.

## `tagName` v `localName` v `nodeName`

`Element` inherits from `Node`. People decided `localName` was better but `tagName` was first.

## `firstChild` text node, `children` v `childNodes`

Watch out for text nodes (parts of your html that are simply raw text).

## `continue` v `break`

Can appear inside `while` or `for` loops. Will not work with `forEach` or `map` (and friends).

`break`: stops the loop, keeps executing at code following the loop

`continue`: stops the current "cycle", keeps executing loop starting at top with next cycle

## `switch...case`?

Big thing to remember about switch case: it can only check based on equality. More rigid—but that can be good.

(See code for example)

## code style choice for `selectorTypeMatcher`

(We talked about it)

## invalid selectors

With invalid parameters in general, the "Javascript" philosophy default is don't error, maybe log a warning. Only throw an error if absolutely necessary.

## takeaways

- in node, we don't have `document` or other "browsery" things
- familiarity with `Node` / `Element` as in DOM stuff (built in)
- tree traversal
- practice with higher order functions, recursion
