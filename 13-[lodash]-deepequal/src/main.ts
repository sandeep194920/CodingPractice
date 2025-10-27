const deepEqual = (valueA: unknown, valueB: unknown): boolean => {
  /*
  first check if you should deep compare. for array/object you should
    - check if both types are same
    - then check if you should deep compare that type

  if not array or object, normal compare with object.is
  */

  const typeA = getType(valueA);
  const typeB = getType(valueB);

  if (typeA === typeB && shouldDeepCompare(typeA) && shouldDeepCompare(typeB)) {
    // or(and) shouldDeepCompare(typeB)
    const entriesA = Object.entries(valueA as Array<unknown> | Object); //  Array<unknown> | Object -> we are saying that entries can be either type. Both objects and arrays will then behave as Array after converting it with Object.entries, so we should be fine.
    const entriesB = Object.entries(valueB as Array<unknown> | Object);

    if (entriesA.length !== entriesB.length) return false;

    return entriesA.every(([key, val]) => {
      // Note that Object.hasOwn works for both arrays and objects
      return (
        Object.hasOwn(valueB as Array<unknown> | Object, key) &&
        deepEqual((valueB as Record<string, unknown>)[key], val)
      );
    });
  }

  return Object.is(valueA, valueB);
};

const getType = (value: unknown) => {
  return Object.prototype.toString.call(value);
};

const shouldDeepCompare = (type: string) => {
  return type === "[object Array]" || type === "[object Object]";
};

console.log(deepEqual("foo", "foo")); // true
console.log(deepEqual({ id: 1 }, { id: 1 })); // true
console.log(deepEqual([1, 2, 3], [1, 2, 3])); // true
console.log(deepEqual([{ id: "1" }], [{ id: "2" }])); // false
