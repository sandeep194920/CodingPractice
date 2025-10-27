/* Approach 1 => Brute force way 

   [5,7,1,3]
i   |
j     |

Notice j always starts at i+1

*/
export function findDuplicatesBF(numbers: number[]): boolean {
  const len = numbers.length;
  for (let i = 0; i < len - 1; i++) {
    // you can take len or len-1
    for (let j = i + 1; j < len; j++) {
      if (numbers[i] === numbers[j]) return true;
    }
  }

  return false;
}

/* Approach 2 => Sort approach 

unsorted     [10,7,0,0,9]
  sorted     [0,0,7,9,10]
              | |


*/

export function findDuplicatesSort(numbers: number[]): boolean {
  const sorted = [...numbers].sort();

  for (let i = 0; i < numbers.length; i++) {
    if (sorted[i] === sorted[i + 1]) return true;
  }
  return false;
}

/* Approach 3 => Using Set approach (BEST)


Traverse the array. For every element, check if it exists in a set (set because checking will be in O(1) time) and return false if it does.

*/

export function findDuplicatesSet(numbers: number[]): boolean {
  const unique = new Set();

  for (const num of numbers) {
    if (unique.has(num)) return true;

    unique.add(num);
  }

  return false;
}

const numbers = [5, 7, 1, 3];

console.log(findDuplicatesBF(numbers));

/* 

Other approach with Set

The other approach with set is that, you can just create a new set from array like this

const unique = new Set(numbers)

unique would have removed duplicates now.

You can then return unique.size() === numbers.length

*/
