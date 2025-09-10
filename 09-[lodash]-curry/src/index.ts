/* 

Currying is the technique of converting a function that takes multiple arguments into a sequence of functions that each takes a single argument.

Implement the curry function which accepts a function as the only argument and returns a function that 
accepts single arguments and can be repeatedly called until at least the minimum number of arguments 
have been provided (determined by how many arguments the original function accepts). The initial 
function argument is then invoked with the provided arguments.

*/

import { singleCurry, curry, curryUsingBind } from "./curry.js";

function add(a: number, b: number, c: number, d: number) {
  return a + b + c + d;
}

// const mulThree = (a: number, b: number, c: number) => a * b * c;

// const curriedMult3 = curry(mulThree);
// console.log("curried mul 3", curriedMult3()()()()(4)(2)(3));

// const curriedAdd = curry(add);
// console.log("curriedAdd", curriedAdd(3)(4)(4)(4));

// function show(this: { x: number }, a: number, b: number) {
//   return this.x + a + b;
// }

// const obj = { x: 10 };
// const curried = curryUsingBind(show);

// console.log(curried(1, 2, 3));

const curriedAdd = curryUsingBind(add);

const curried2BoundFn = curriedAdd(2);
console.log(curried2BoundFn(3)(4)(5));
