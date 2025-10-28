/* Approach 1 - Use set and a loop

[3,0,4,2,1]

They say one number is missing b/w 0 and n where n is the last element of the array. We need to find that number.

Only one number is missing - indicates that 0 to n array has array length sane as n. I mean

Say we have 

[0, 1, 2, 3, 4, 5] -> nothing is missing. The length is 6. If one number is missing then length will be 5 which is same as n.

So this indicates that we can run a for loop from 0 to n (including n). We can put the entire array to a set before hand so that it will be quick check of O(1)

*/

export function findMissingNumber(numbers: number[]): number {
  const set = new Set(numbers);

  for (let i = 0; i <= numbers.length; i++) {
    if (!set.has(i)) return i;
  }

  return -1; // just a fallback but never occurs
}

const numbers = [1, 3, 0];

console.log(findMissingNumber(numbers));

/* Approach 2 - Brute force - Very interesting (GOOD TO DO IT to get the intuition) 

Two loops, i and j. i keeps track of the index and j checks the number itself. For example

     i
a = [1, 2, 4, 5, 0]
     j

- use a flag = false (if we find the number then we flip this to true)
- we check if i === a[j]. 
  - 0(i) is checked with 1 (a[j]) -> not same so j continues
  - 0 is checked with 2 -> not same so j continues
  - 0 with 4 -> no
  - 0 with 5 -> no
  - 0 with 0 -> yes. Flip the flag to true and break


The idea is, if we complete j that means the number is not found so the flag remains false and if that is the case we return i as missing number

*/

export function findMissingNumberBF(numbers: number[]): number {
  // note: i <= numbers.length because one number is missing so we need to also include length as index like we did in above approach
  for (let i = 0; i <= numbers.length; i++) {
    let found = false;

    for (let j = 0; j < numbers.length; j++) {
      if (i === numbers[j]) {
        found = true;
        break; // breaks out of inner loop j
      }
    }

    if (!found) {
      return i;
    }
  }

  return -1; // should not occur- just to satisfy typescript return type
}

/* Approach 3 - Sort



     i
a = [1, 2, 4, 5, 0]
     
Can be sorted to 


a = [0, 1, 2, 4, 5]

We can check if array.length is same as last element. If not then last number is the one that is missing 
We can check if first number is 0. If not then 0 one is the missing

We can start traversing array from index 1. Check if previous index number + 1 is same as the current one. If not then 

    i
[0, 1, 2, 4, 5]

first => being on 1, we check 0 + 1 = 1, yes so move i
second =>being on 2, we check 1 + 1 = 2, yes so move i
third => being on 4, we check 2 + 1 = 3, so the missing number is 3 because expected was 3 and the current was 4. so we return expected.

*/

export function findMissingNumberSort(numbers: number[]): number {
  const nums = numbers.sort((a, b) => a - b);

  if (nums[0] !== 0) return 0;
  if (nums[nums.length - 1] !== nums.length) return nums.length;

  // start from 1 and compare previous number. Previous number will definitely be 0 because we checked it above
  for (let i = 1; i <= nums.length; i++) {
    const expectedCurrent = nums[i - 1] + 1;
    if (expectedCurrent !== nums[i]) return expectedCurrent;
  }

  return -1; // fallback
}

/* Approach 4 - Mathematically calculate

[0, 1, 2, 4, 5]

If nothing is missing here, then it will be 0 + 1 + 2 + 3 + 4 + 5 = 15

So it will be first n natural numbers which is n(n+1)/2 

So for array length of 5, it is 5(5+1)/2 = 15

Then we can add up all the array elements and subtract from 5(5+1)/2

Then we get 15 - (0+1+2+4+5) = 3
*/

export function findMissingNumberMath(numbers: number[]): number {
  const n = numbers.length;
  const expectedSum = (n * (n + 1)) / 2;

  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += numbers[i];
  }

  return expectedSum - sum;
}
