import countBy from "./countBy.js";

// Use them

console.log(countBy([6.1, 4.2, 6.3], Math.floor)); // => { '4': 1, '6': 2 }

console.log(countBy([{ n: 3 }, { n: 5 }, { n: 3 }], (o) => o.n)); // => { '3': 2, '5': 1 }

console.log("----------------------------------------------------");

// The function should return when array is empty and treat null / undefined keys after going through iteratee as it is.

console.log(countBy([], (o) => o)); // => {}

console.log(countBy([{ n: 1 }, { n: 2 }], (o: any) => o.m)); // => { undefined: 2 }
