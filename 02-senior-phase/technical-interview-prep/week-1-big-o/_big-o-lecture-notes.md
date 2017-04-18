# Big O

## What is it?

* The rate at which an algorithm functions
* Abstract measurement of time / space, no actual units involved in big O
* "How does it perform at scale?"
* We can talk about big O for best case, average case, worst case
* Is an "upper bound"
* "Fuzzy", order of magnitude—drops additive constants
* Describes how a resource need (e.g. time or space) changes as input changes
* In general we care because we want our algorithms to run at `O(1)` ideally (or just as fast as possible), rank the common big Os...
  - `O(n!)` (factorial)
  - `O(2^n)` (exponential)
  - (polynomial)
  - `O(n^2)` (quadratic)
  - `O(n * log n)` (loglinear)
  - `O(n)` (linear)
  - `O(log n)` (log)
  - `O(1)` (constant)

## General process

* Parse through the code with your brain
* Look for loops and/or splitting
* "Count the steps"
* Nested code (i.e. nested loops): multiplies
* Sibiling code (i.e. sibiling loops): adds
* Drop the constants
* Drop the less significant terms

```js
// where n is the size of the array
// where p is the average size of an element in it
// O(n * p)
// or if we assume p is some limited size
// O(n)
function logElems (arr) { // T(1 + n * p)
  arr.forEach(elem => { // T(1 + n * p)
    console.log(elem); // T(p) are you sure?
  });
}
```

## Multivariate

* Don't confuse independent terms
* Don't drop independent terms
* Consider if something that seems like an independent term is *actually* limited, cannot grow arbitrarily large

## Space complexity

* Really by space we mean memory
* Ordinarily concerned with "extra" space
* Very similar process to time complexity
* Only you're "counting the space"

## Exercises

```js
// time complexity O(n * p)

// space complexity O(n * p) (worst case)
// space complexity O(min(n, p)) (case with no duplicates)
// space complexity O(1) (best case)
// space complexity O(q^2) (q is the number of elements in common between n and p)
function intersection (arrA, arrB) {
  const intersected = [];
  for (let i = 0; i < arrA.length; i++) {
    for (let j = 0; j < arrB.length; j++) {
      if (arrA[i] === arrB[j]) {
        intersected.push(arrA[i]);
      }
    }
  }
  return intersected;
}
```

```js
// time complexity O(n + p)
// where n is arrA size and p is arrB size
// space complexity O(n + p)
function concatenate (arrA, arrB) {
  const merged = [];
  arrA.forEach(elemA => {
    merged.push(elemA);
  });
  arrB.forEach(elemB => {
    merged.push(elemB);
  });
  return merged;
}
```

```js
// where n is arrA size
// where p is arrB size
// O(n^2 + p)
function smush (arrA, arrB) {
  const merged = []; // O(1)
  arrA.forEach(elemA => { // O(n * n)
    arrA.forEach(elemA => { // O(n)
      merged.push(elemA + elemA); // O(1)
    })
    merged.push(elemA); // O(1)
  });
  arrB.forEach(elemB => { // O(p)
    merged.push(elemB); // O(1)
  });
  return merged;
}
```

## What big O is not!

* It is not (technically) a tight bound: "I can jump no more than 1000 feet in the air" (upper bound). A tight bound would be: "I can jump roughly 8 inches in the air". That's big theta.
* It does describe actual TIME or SPACE, no units
* It is not benchmarking
* It does not *have to* describe code
* It does not describe problems, it describes implementations

## Recursion

* The actual best way: math-y stuff
* Diagram out the call tree
* Reason about its shape / dimensions

## More exercises

```js
function printPowersOfTwo (upto) {
  for (let i = 1; i <= upto; i *= 2) {
    console.log(i);
  }
}
```

```js
function nthFibonacciNumber (n) {
  if (n === 0) return 0;
  else if (n === 1) return 1;
  return nthFibonacciNumber(n - 1) + nthFibonacciNumber(n - 2);
}
```

```js
function guessNumericPassword (length, submitOneAttempt) {
  let n = 0;
  let attempt = '';
  while (attempt.length <= length) {
    attempt = padLeftWithZeroes('' + n, length);
    const isPassword = submitOneAttempt(attempt);
    if (isPassword) return attempt;
    n++;
  }
  throw new Error('Nothing worked!');
}

function padLeftWithZeroes (str, minTotalLength) {
  const zeroesNeeded = minTotalLength - str.length;
  if (zeroesNeeded <= 0) return str;
  return '0'.repeat(zeroesNeeded) + str;
}
```