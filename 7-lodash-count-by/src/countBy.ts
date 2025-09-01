const countBy = <T>(array: Array<T>, iteratee: (n: T) => number | string) => {
  const results: Record<string, number> = {};

  if (!array.length) return results;

  for (const element of array) {
    const result = iteratee(element);

    results[result as string] = (results[result as string] || 0) + 1;
  }

  return results;
};

export default countBy;
