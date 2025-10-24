/* In this file, we will try to learn complex types from basics - and try to remove the common confusions as much as possible */

/* Example 1 */

/*
- Infer types from object - directly from const
- Infer types from array - directly from const
*/

const person = {
  name: "Sandeep",
  age: 30,
};

type Person = typeof person; // this would give signature of person type
type PersonName = typeof person.name; // signature of name

type PersonAge = Person["age"]; // other way to get this from Person type directly

const evenNumbers = [2, 4, 6, 8];

type EvenNumbers = typeof evenNumbers; // gives array of number[]
type EvenNumber = (typeof evenNumbers)[number]; // gives number

const fixedEvenNumbers = [2, 4, 6] as const;
type FixedEvenNumbers = typeof fixedEvenNumbers; // type FixedEvenNumbers = readonly [2, 4, 6]

/*******************************************************/

/* Example 2 */

/* 
  Generics
 - Write a simple function that takes an object as first param, one of its key as second param and returns its value. Learn how to type two params and the return type 
*/

// No type - This is how we start without typing (JS version)

const getValueNoTypes = (obj, key) => {
  return obj[key];
};

console.log(getValueNoTypes(person, "name"));

// We need to type obj, key and return type
/* 
The requirement is, 
- We need to know how type obj
- how to type key -> where key is the key of that object
- how to return it
*/

// const getVerboseTypes = <T,K>(obj:T, key:K): T[K] => {
// return obj[key]
// }

// The problem with above is that, we need to specify what type is T (we need to say it is an object), also we need to say what type is the K

const getVerboseTypes = <T extends Record<string, any>, K extends keyof T>(
  obj: T,
  key: K
): T[K] => {
  return obj[key];
};

// This absolutely is better. But see we say T can have 'any' kind of values. We also say K is key of T (K extends keyof T).

// IMPORTANT: Whenever you see extends twice, that means you can optimize it. This is something you SHOULD REMEMBER! Think about it, when you
// say K extends keyof T, that means T is indeed an object. In that case, you don't have to be explicit with T extends... as it is understood that
// T is an object from the K extends ... part.

const getProperTypes = <T, K extends keyof T>(obj: T, key: K): T[K] => {
  return obj[key];
};

/*******************************************************/

/* Example 3 */

/* 
How to type an element inside an array 
*/

const countByNoType = (arr, fn) => {};

// countBy counts the number of times a key appeared in an object. The key should actually be the result of iteratee (second param) function
countBy([6.1, 4.2, 6.3], Math.floor); // {6: 2, 4: 1}
countBy([{ n: 3 }, { n: 5 }, { n: 3 }], (o) => o.n); // {n: 3}

// We need to type arr, fn and return type

// arr is Array<something>. So we can accept something as T. The reason is we need same T for computing fn type as well because fn accepts a param of type T and returns string or number or undefined

const countBy = <T>(
  arr: T[],
  fn: (el: T) => string | number | undefined
): Record<string, number> => {
  return {};
};

/*******************************************************/
const arr: Readonly<number[]> = [2, 3];
