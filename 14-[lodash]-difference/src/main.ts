const difference = <T>(array: T[], values: T[]): T[] => {
  const result = [];

  const valuesSet = new Set(values);

  for (let i = 0; i < array.length; i++) {
    /* check for sparse array element */

    // if(!(i in array)) continue

    // OR

    if (!Object.hasOwn(array, i)) continue; // precise check and checks only the array and not the prototype

    const val = array[i];

    if (valuesSet.has(val)) result.push(val);
  }

  return result;
};

console.log(difference([1, 2, 3], [2, 3])); // => [1]
console.log(difference([1, 2, 3, 4], [2, 3, 1])); // => [4]
console.log(difference([1, 2, 3], [2, 3, 1, 4])); // => []
console.log(difference([1, , 3], [1])); // => [3] (case of a sparse array)
console.log(difference([null, undefined, 1, NaN], [undefined, 2, 3])); // null, 1, NaN
