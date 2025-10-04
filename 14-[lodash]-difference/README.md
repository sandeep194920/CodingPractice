## [Difference](https://www.greatfrontend.com/interviews/study/lodash/questions/javascript/difference)

`Approx time - 10 minutes`

**Question**

Implement a function `difference(array, values)` that creates an array of values not included in the other given array using `SameValueZero` for equality comparisons. The order and references of result values are determined by the first array.

```ts
difference([1, 2, 3], [2, 3]); // => [1]
difference([1, 2, 3, 4], [2, 3, 1]); // => [4]
difference([1, 2, 3], [2, 3, 1, 4]); // => []
difference([1, , 3], [1]); // => [3] (case of a sparse array)
```

The function should return the original array values if values is empty.

```ts
difference([1, 2, 3], []); // => [1, 2, 3]
```

_What does the problem say_

- From the first array, return only the elements that do not appear in the second array.

**What is `SameVaueZero`**

- This part defines how equality between elements is checked.
- In JavaScript, SameValueZero is an **equality comparison rule** — it’s the same one used by methods like Array.prototype.includes() and Set.

```ts
Comparison  SameValueZero                     Result
1 vs 1	                                     ✅ equal
'a' vs 'a'	                                 ✅ equal
NaN vs NaN	                                 ✅ equal (unlike ===, which says false)
0 vs -0	                                     ✅ equal
Different types (e.g., '1' vs 1)	         ❌ not equal
```

The rule says:

Return all elements from the first array that are not present in the second array, using SameValueZero for comparison (ignore sparse array elements) like [1,,3].

### Things learnt

- Check for sparse array element
- `i in object` vs `Object.hasOwn(object, i)` -> Why the latter one is better
- How to remove sparse array elements using `filter`?

---

#### Check for sparse array element

All arrays are objects. So `a = [1,2,3]` is indeed same as `a = {0: 1, 1: 2, 2: 3}`. That means, `a = [1,,3]` is same as `a = {0: 1, 2: 3}` (the key itself doesn't exist here), this is the key takeaway in this problem.

What does it mean by **"the key itself doesn't exist here"**?

Meaning, it's not about the value, it's about the key's existance. And don't confuse

```ts
[1, , 3]; // key 1 doesn't exist
```

with

```ts
[1, undefined ,3], // key 1 exists but the value of key 1 is undefined
```

So we always check if `!(i in array)` Or `!(Object.hasOwn(array, i))` -> Look below why this is better

```ts
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
```

---

#### `i in object` vs `Object.hasOwn(object, i)` -> Why the latter one is better

`i in object` -> Checks if the key i exists in object. If not, it checks the object prototype as well, and returns if found somewhere in the prototype chain

We might need to check if the key i exists in our object alone and not the prototype. For that, we can use `Object.hasOwn(object,i)`.

Also, `Object.hasOwn(array, i)` or `object.hasOwnProperty(i)` — they’re effectively equivalent.

The newer Object.hasOwn() is just shorter and more modern.

---

#### How to remove sparse array elements using `filter`?

`const nonSparseArray =  array.filter((_,i) => i in array)`

Note: `array.filter(Boolean)` removes sparse elements and also falsy values which might not be what we want.

---
