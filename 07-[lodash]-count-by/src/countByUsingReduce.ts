const countBy = <T>(array: Array<T>, iteratee: (n: T) => number | string) => {
  return array.reduce<Record<string, number>>((results, el) => {
    const result = iteratee(el);

    results[result] = (results[result] || 0) + 1;

    return results;
  }, {});
};
