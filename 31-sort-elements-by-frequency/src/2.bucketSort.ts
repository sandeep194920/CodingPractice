/* Time - O(N)  => Not sorting - Wondering why it is bucket sort (we can clarify this later) */

export const sortByFreq = (arr: number[]): number[] => {
  const result: number[] = [];

  const freq: Record<string, number> = {};

  //  step 1 - Make freq map
  for (const el of arr) {
    freq[el] = (freq[el] || 0) + 1;
  }

  //  step 2 - Define Bucket array - max will the be value which is 2 here (Math.max(...Object.values(freq)))

  const bucket = new Array(Math.max(...Object.values(freq)) + 1).fill(0); // be careful here. you need 3 elements - not 2. So basically u need index 2

  // step 3 - Iterate and fill the bucket

  for (const [k, v] of Object.entries(freq)) {
    if (bucket[v] === 0) {
      bucket[v] = [+k]; // first time. Make sure that the key is a number. the key was a string before in the hashmap first so this is needed
    } else {
      bucket[v].push(+k);
    }
  }

  // step 4 - sort each bucket

  for (let i = 1; i < bucket.length; i++) {
    if (Array.isArray(bucket[i])) {
      bucket[i].sort((a: number, b: number) => a - b); // just sort() doesn't work on numbers
    }
  }

  // step 5 - Go to each bucket from end to start. While doing so, 'i' will be the bucket number. You need to loop those many times, and push each element into the result.

  for (let i = bucket.length - 1; i >= 0; i--) {
    if (!Array.isArray(bucket[i])) continue;

    /* 
               0    1     2
     bucket - [0  [1,6] [4,5] ]  
    
    */
    const subArr: number[] = bucket[i]; // [4, 5], i = 2

    subArr.forEach((element) => {
      for (let j = 0; j < i; j++) {
        result.push(element);
      }
    });
  }

  return result;
};

const result = sortByFreq([
  4, 6, 9, 19, 2, 16, 13, 11, 16, 17, 16, 8, 12, 16, 12, 18,
]); // [4, 4, 5, 5, 1, 6]

console.log({ result });

/* 

 [5, 5, 4, 6, 4]

 step 1 - Make freq map

 f = {
  5: 2,
  6: 1
  1: 1
  4: 2, 
 }


 step 2 - Define Bucket array - max will the be value which is 2 here


 0     1      2   <- Index

 0     0      0   <- Init with 0


 step 3 - Iterate the f and fill the bucket. the value of the bucket will be array of keys
 and those keys should go into index of bucket



0     1      2
0    [6,1]  [5,4]

step 4 - Sort each bucket

Loop from right side and sort -

At index 2 -> [4, 5]
At index 1 -> [1, 6]

The bucket looks like this

0     1       2
0    [1, 6]  [4, 5]


step 5 - Go to each bucket from end to start. While doing so, i will be the bucket number
. You need to loop those many times, and push each element into the result.

That's it!

*/
