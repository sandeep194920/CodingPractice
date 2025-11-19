// This is the solution where we are not using bucket sort, but just the normal sorting. We could use Objects like we did in
// bucket sort, but let's use Map so we can practice it and is also more efficient.

/* Time - O(N LogN)  => Log N is due to sorting */

export const sortUsingMap = (arr: number[]) => {
  const freq = new Map<number, number>();

  // step 1 - freq map

  for (const el of arr) {
    freq.set(el, (freq.get(el) || 0) + 1);
  }

  // freq is now  {5 => 2, 4 => 2, 6 => 1, 1 => 1}

  // step 2 -> sort the map by value. Note - sort on Map doesnt mutate the map unlike array

  // Very very important to master this kind of sorting - Look at readme Second approach for explanation
  const sortedArray = [...freq.entries()].sort((a, b) => {
    // O(log N) to sort N elements

    if (a[1] === b[1]) {
      return a[0] - b[0];
    }
    return b[1] - a[1];
  });

  console.log(sortedArray);

  const result = sortedArray.reduce<number[]>((res, [val, times]) => {
    for (let i = 0; i < times; i++) {
      res.push(val);
    }

    return res;
  }, []);

  return result;
};

const input = [5, 5, 4, 6, 4, 1];

console.log(sortUsingMap(input)); // [4, 4, 5, 5, 1, 6]

/* 

[5, 5, 4, 6, 1, 4]

{
2: [5, 4],
1: [6, 1]
}




*/
