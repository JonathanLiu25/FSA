export const groupBy = (collection, iterator) => {
  // accumulate object from array
  return collection.reduce((grouped, element) => {
    // each key should correspond to the iterator called on the element (or the iterator property of the element)
    const key = (typeof iterator === 'function' ? iterator(element) : element[iterator]);
    // each value should be an array of all elements with the same resulting key
    grouped[key] = grouped[key] || [];
    grouped[key].push(element);
    return grouped
  }, {});
};

export const flowRight = (...fns) => {
  // compose functions right to left, so reverse the functions
  const reversed = fns.reverse();
  return function (...initialArgs) {
    // separate the first function to call from the remaining
    const [firstFn, ...remaining] = reversed;
    // call first function with all initial args passed in
    const firstResult = firstFn.apply(this, initialArgs);
    // accumulate single result by going through functions in order
    return remaining.reduce(
      // call each remaining function with just one arg, the result of the previous function call
      (previousResult, fn) => fn.call(this, previousResult),
      firstResult
    );
  };
};