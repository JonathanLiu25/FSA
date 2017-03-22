## factory functions

Omri's thoughts: a function that acts as a kind of "module". Often singleton—so we only call it once, or even if we call it multiple times we get the same thing. Use them when you want a module-thing.

## module

Code block, section, "class", "piece of the whole".

Many birds: flock.

Many functions: module.

A named collection of related functions / classes / data.

## attribute selector (v id selector)

Ids in HTML: unique! Also intended for design (yes, but not only).

Tend to avoid ids unless you're sure there'll only be one of something. Tends to lead to "specifics" as opposed to "generics".

## global vars: organizing them, finding them

Try to clump things into one object if you can—this can help reduce clashes, make those single objects easier to find.

Establish patterns and hold to them.

## `self` v `this`

This pattern allows us to close over the "outer this". We can also use arrow functions or `.bind` to acheive similar results. All of these are solid.

What is the *best* way? I'm not going to tell you.

## how many functions do I need? can there be too many?

The rule I go by: if a function hits more than 10 lines, I consider breaking it up.

Functional programming: we should have "lots of little functions". Easier to see "at a high" level what's happening.

Dev time complexity: `O(log n)` as opposed to `O(n)`

## how many files do I need?

As many as I need to make it understandable, but also as few as possible.

One module : one file ratio.

When modularity is tough because we don't have a module system (thank all browsers for this), it can be painful to split things up into files.

More files means fewer unnecessary merge conflicts.

The rule I go by: if a file hits more than 50 lines, I consider breaking it up.

## getting it done versus organizing it

Short projects (hackathons, workhops): organization hardly matters.

Long term projects: organization matters A LOT. Unorganized projects accumulate technical debt.

## choosing an organization / patterns / lower-level architecture

My advice:

1. List out user views / actions
2. ERD
3. Look at each view
  a. Figure out sub-view components
  b. Mock them up
4. Look at each action
  a. Figure out "the thing that will result"
  b. Map out data flow
5. The view components can be classes
6. The actions can be methods
7. The parts of those actions that you can split up, do

Consideration: what classes / constructors do I want?

Consideration: what functions do I want?

Look ahead: find the most complex thing, design your code for it.

## readability / maintainability

Totally ~objective~ subjective.

Some guidelines:

- Keep things small
- Good variable names (self documenting)
- Comments
- READMEs
- Naming / structural patterns that are consistent and universal
- Make "interfaces" that have "public APIs" and private implementation details (cellular)
