/* Find fibinocci number

? What?
First two numbers are fixed, 0, 1
We need to find any other numbers. User says which number he wants.
We loop from 2 through n


0 1 1 2 3
Here, if user thinks 0th number is 0, then we have 4th number as 3. OR if user thinks 1st number is 0 then 5th number is 3.
Just to keep in mind

Core idea is, start from index 2 (as we already know index 0 and 1)

Something like fib[n] = fib[n-1] + fib[n-2]

*/

// 0 1 1 2 3
export const findFibNumberRecursive = (n: number): number => {
  if (n <= 1) return n; // base case
  return findFibNumberRecursive(n - 1) + findFibNumberRecursive(n - 2);
};

console.log("findFibNumberRecursive", findFibNumberRecursive(4)); // 4th number is 3

/* **************************************************************************************************** */

/* Optimized recursive solution

The time complexity gets to O(2^n) for the above approach as the recursive solution above re-computes same thing multiple times.

Computing fib can be repetitive. We can solve that by using frequency map. This reduces time comp largely from O(2^n) to O(n)
Space for both approaches is O(n) - recursive depth
*/

export const findFibNumberRecursiveOpt = (
  n: number,
  frequencyMap: Map<number, number> = new Map()
): number => {
  if (n <= 1) return n; // base case

  const computedFib = frequencyMap.get(n);
  if (computedFib !== undefined) {
    return computedFib;
  }

  const fib =
    findFibNumberRecursiveOpt(n - 1) + findFibNumberRecursiveOpt(n - 2);
  frequencyMap.set(n, fib);

  return fib;
};

console.log("findFibNumberRecursiveOpt", findFibNumberRecursiveOpt(4)); // 4th number is 3

/* **************************************************************************************************** */

/* Fib using loop */

/* 
   0   1   1   2
       f
           s
               n
*/
export const findFibLoop = (num: number): number => {
  let first = 0;
  let second = 1;

  if (num === 0) return 0;
  if (num === 1) return 1;

  let next = first + second;

  for (let i = 2; i < num; i++) {
    first = second;
    second = next;
    next = first + second;
  }

  return next;
};

console.log("findFibLoop", findFibLoop(4)); // 4th number is 3

/* 
Loops are always better for fib as the Time is O(n) and space is O(1)
*/

export const findFibLoopImproved = (num: number): number => {
  if (num === 0) return 0;
  if (num === 1) return 1;

  let first = 0;
  let second = 1;

  for (let i = 2; i <= num; i++) {
    const next = first + second;
    first = second;
    second = next;
  }
  return second;
};

console.log("findFibLoopImproved", findFibLoopImproved(4)); // 4th number is 3

/* Fib sequence  */

const generateFibSequence = (num: number): number[] => {
  const series = [0, 1];

  if (num === 0) return [0];
  if (num === 1) return series;

  for (let i = 2; i <= num; i++) {
    const fib = series[i - 1] + series[i - 2];
    series.push(fib);
  }

  return series;
};

console.log("Fib Sequence", generateFibSequence(4)); // [0 1 1 2 3]

/* Generate fib tree */
const generateFibTree = (rows: number): string => {
  let first = 0;
  let second = 1;
  let tree = ``;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j <= i; j++) {
      tree += `${first} `;
      const next = first + second;
      first = second;
      second = next;
    }
    tree += `\n`;
  }
  return tree;
};

console.log(generateFibTree(4));

/* Generated tree for rows 4
0
1   1
2   3   5
8  13  21  34    
*/
