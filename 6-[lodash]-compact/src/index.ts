import compactSimple from "./compactSimple.js";
import compact from "./compact.js";

// Use them

console.log(compactSimple([0, 1, false, 2, "", 3, null])); // => [1, 2, 3]

console.log(compactSimple(["hello", 123, [], {}])); // => ['hello', 123, [], {}]

console.log("----------------------------------------------------");

console.log(compact([0, 1, false, 2, "", 3, null])); // => [1, 2, 3]

console.log(compact(["hello", 123, [], {}])); // => ['hello', 123, [], {}]
