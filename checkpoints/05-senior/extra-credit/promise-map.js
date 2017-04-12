Promise.map = (collection, iterator) => {
  // accumulate promise for array of resolved values (initial is promise for empty array)
  return collection.reduce((masterPromise, elem) => {
    // use iterator to convert any element value into a promise
    const promise = Promise.resolve(elem).then(iterator);
    // convert existing promise for results into promise for results plus one more
    return masterPromise
    .then(existingResults => promise.then(
      // add new result to end of existing results
      oneResult => existingResults.concat(oneResult)
    ));
  }, Promise.resolve([]));
};