import chunkWithSlice from "./withSlice.js";
import chunkWithoutSlice from "./withoutSlice.js";

// Use them
console.log(chunkWithSlice([1, 2, 3, 4, 5], 2));
console.log(chunkWithoutSlice([1, 2, 3, 4, 5], 2));
