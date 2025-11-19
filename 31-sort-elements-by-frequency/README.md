[Sort Elements by frequency](https://www.geeksforgeeks.org/dsa/sort-elements-by-frequency/)

`Approx time - 20m`

This is a medium problem that requires you to use frequency map, sort and bucket sort algo.

```ts
Input: arr[] = [5, 5, 4, 6, 4]

Output: [4, 4, 5, 5, 6]

// Explanation: The highest frequency here is 2. Both 5 and 4 have that frequency. Now since the frequencies are the same the smaller element comes first. So 4 4 comes first then comes 5 5. Finally comes 6. The output is 4 4 5 5 6.

```

### 1. My Approach Initially (Bucket Sort)

```ts
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


step 5 - Go to each bucket from end to start. While doing so, 'i' will be the bucket number
. You need to loop those many times, and push each element into the result.

That's it!

*/
```

---

### 2. Second approach just sorting - Absolutely love the sorting here. Very important to learn

<!--
Input: arr[] = [5, 5, 4, 6, 4, 1]

Output: [4, 4, 5, 5,1, 6]


step 1 - Find the frequencies

f = {
 5: 2,
 4: 2,
 6: 1
 1: 1
}

Or you can also use a map { 5 => 2, 4 => 2, 6 => 1, 1 => 1}

Step 2 - Now look closely, you need to sort this way

{ 4 => 2, 5 => 2, 1 => 1, 6 => 1}

Step 3 -  In order to get that, we have to apply this rule

- If two elements' values are same (5 => 2, 4 => 2) then we need to sort the associated key in ascending order - 4, 5 in this case

- If not, then we need to sort the values ascending order (not keys) so that 2 (value) will come first and then 1 (value) will come - so that it becomes { 4 => 2, 5 => 2, 1 => 1, 6 => 1}

 -->

---

### Things learnt

- Always remember - `sort()` doesn't work on numbers. We need to do `sort(a,b => a-b)`
