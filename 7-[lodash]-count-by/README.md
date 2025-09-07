## Lodash - Count By

`Approx time needed - 20 minutes (10 minutes to read and understand the question, and 10 minutes to solve using reduce and for-of or for-each)`

**NOTE** - This question is similar to [1-transaction-list](https://github.com/sandeep194920/CodingPractice/tree/main/1-transactions-list).

Implement a function countBy(array, iteratee) that creates an object composed of keys generated from the results of running each element of array through iteratee. The corresponding value of each key is the number of times the key was returned by iteratee.

```
countBy(array, iteratee);
Arguments
array (Array): The array to iterate over.
iteratee (Function): The iteratee function to transform elements. The function is invoked with one argument: (value).
Returns
(Object): Returns the composed aggregate object.
```

```ts
Examples
countBy([6.1, 4.2, 6.3], Math.floor);
// => { '4': 1, '6': 2 }

countBy([{ n: 3 }, { n: 5 }, { n: 3 }], (o) => o.n);
// => { '3': 2, '5': 1 }
The function should return when array is empty and treat null / undefined keys after going through iteratee as it is.


countBy([], (o) => o); // => {}

countBy([{ n: 1 }, { n: 2 }], (o) => o.m); // => { undefined: 2 }

```

### Things to learn

- Some question descriptions will be very complicated to understand. First need to read the question part by part, imagine the words, and understand how the results could be.

- Then go and look at the examples to see if your understanding matches the example. You should never just directly look at example directly so it will be easy. Always make a habit of understanding the question thoroughly before looking at the examples.

- Learnt how to get object from an array.

- Learnt how to use reduce (similar to 1st question 1-transaction-list).
