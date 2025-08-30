import verboseClamp from "./verboseClamp.js";
import cleanClamp from "./cleanClamp.js";

// Use them

console.log(verboseClamp(3, 0, 5)); // => 3

// Smaller than the lower bound.
console.log(verboseClamp(-10, -3, 5)); // => -3

// Bigger than the upper bound.
console.log(verboseClamp(10, -5, 5)); // => 5

console.log("--------------------------------");

console.log(cleanClamp(3, 0, 5)); // => 3

// Smaller than the lower bound.
console.log(cleanClamp(-10, -3, 5)); // => -3

// Bigger than the upper bound.
console.log(cleanClamp(10, -5, 5)); // => 5
