# Optimus prime

## Ask the audience

- Consider your for loops (nested or sibling) and whether you _really_ need to visit every element
- Figure out the big O of slow solutions, too, so that you can accurately compare
- Consider whether hash tables or indexes can help (if you're looking for a particular key / value pair)
- Consider whether a certain data structure might be appropriate
- Avoid mutating areas—can avoid unnecessary bugs
- Useful tool: binary search (ask yourself if you think it'll be relevant)
- Make sure to exit loops as soon as possible (don't spend unnecessary cycles)
- With recursion, think about how it's changing the input size each step
- Consider using iteration instead of recursion (micro optimization)
- Memoization: cache results of previous function executions (dynamic programming)

## Listen for details

- Every iota of information is probably useful
- Ask questions!

## Consider the best conceivable runtime

- Determine how fast you think it could go (or ask)
- Try to reverse engineer it
- Keep in mind pre-computations, ask whether the algorithm will be called repetitively

## Precomputation

- Is the data in a useful format? If not, consider a different one, and cache that for future executions
- Hash maps are particularly relevant here
- Indexing: can I come up with a "glossary" for the incoming data?
- This is most useful for repeated executions, but sometimes even useful for one round

## Data structure to consider

- Hash tables
- Tree
  - Binary search trees
  - Trie
  - Red-black tree (or any kind of self-balancing tree)
  - Heap
- Graph
  - Adjacency matrix
- Set
- Sorted set, sorted array
- Linked list
- Queue
- Stack

## Sorting

- Algorithms that have sorted inputs can be smart
- Binary search
- "Ratcheting", traverse a sorted array without "backtracking" nor "trying all possibilities"

Example: given an array of sorted numbers, and another number (the target), return true if any pair of numbers in the array adds to the target.

Naive approach: `O(n^2)` (time) nested loops—so go through every number in the array, and for that number go throughh every other number in the array, see if it adds up to the target.

Optimized approach: burn the candle from both ends—start and index at the left and right, check whether that sum is greater or lesser than the target. If lesser move the left index up one, if greater, move the right index down one. Keep going until you hit the right answer or the middle, in which case return false. `O(n)` time.

```js
hasPairSum(16, [1,6,7,9,11]);

function hasPairSum (target, arr) {
  let leftIdx = 0;
  let rightIdx = arr.length - 1;
  while (leftIdx !== rightIdx) {
    const possibleSum = arr[leftIdx] + arr[rightIdx];
    if (possibleSum === target) return true;
    if (possibleSum < target) leftIdx++;
    else if (possibleSum > target) rightIdx--;
  }
  return false;
}
```

Now let's pretend it's not sorted, can we do better than `O(n^2)`?

Precomputation: sort it `O(n log n)` then do the ratcheting thing which is `O(n)`, so that gives us `O(n log n)` (higher order, dominant term).

...can we do better?

Use a hash map, to store each "difference" we come across. This should be `O(n)` time. Space complexity is now `O(n)`.

```js
function hasPairSum (target, arr) {
  const differences = {};
  for (const num of arr) { // loop through values
    if (differences.hasOwnProperty(num)) return true;
    differences[target - num] = true;
  }
  return false;
}
// a set should be sub-linear lookup / add time, often O(1) could be O(log n) depending on the set implementation
function hasPairSum (target, arr) {
  const differences = new Set();
  for (const num of arr) { // loop through values
    if (differences.has(num)) return true;
    differences.add(target - num);
  }
  return false;
}
```

## Time or space?

- Definitely ask about both! And be aware of both
- You'll often have a tradeoff between the two
- People tend to care more about time complexity (assuming the complexity isn't awful)
- Checkout out tail call optimization for recursion (it's cool) 2ality article about this

## Dynamic programming

- Have answers to pieces of your question that you can continue to use as you continue execution
- Problems with "overlapping subproblems" can be optimized
- "Top-down" (recursive, involve memoization) versus "bottom-up" (iterative, involve a cache) approaches
- Memoziation: keep track of corresponding inputs and outputs for a function, immmediately return previous output given same inputs (functions must be "pure")

Example: find the "nth" fibonacci number. Fibonacci sequence: `[0, 1, 1, 2, 3, 5, 8, 13]`.

```js
function fibonacci (n) {
  if (n < 2) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
```

What's the runtime?

Call tree:

- f(4)
  - f(3)
    - f(2)
      - f(1)
      - f(0)
    - f(1)
  - f(2)
    - f(1)
    - f(0)

Well that looks like a tree with two (ish) branches every time and depth n so that's `O(2^n)` (ish) exponential time.

Recursive memoized ("top-down"):

```js
const memo = {};
function fibonacci (n) {
  if (memo.hasOwnProperty(n)) return memo[n];
  if (n < 2) return n;
  const result = fibonacci(n - 1) + fibonacci(n - 2);
  memo[n] = result;
  return result;
}
```

- f(4)
  - f(3)
    - f(2)
      - f(1)
      - f(0)
    - f(1)
  - f(2) <= memoized

Time complexity `O(n)` because now we visit each number less than or equal to `n` just once (ish).

Iterative cached ("bottom-up"):

```js
function fibonacci (n) {
  const cache = {
    0: 0,
    1: 1
  };
  for (let x = 2; x < n; x++) {
    cache[x] = cache[x-1] + cache[x - 2];
  }
  return cache[n-1] + cache[n-2];
}
```

## "Marginal" gains

- Know the difference betwee an optimization that changes the big O and one that does not (e.g. using a `while` loop because you know the interpreter is optimized for that, or "returning early")
- Still really important to consider these and implement them
- Handle special cases
- Break out of a loop as soon as possible
- Start your loops as late possible

## Try it manually

- Pretend you personally were asked to accomplish this task
- Come up with your own procedure for doing it
- Naturally lead to optimizations
- Note: this process can be slow, so feel free to ask for time if that's appropriate

## Recognizing logarithmic time

- Are you splitting the search space in half each step?
