type ArrayValue = any | Array<ArrayValue>;

// Approach 1 - If we need result outside the scope of flatten function

const result: any[] = []; // result defined outside

export function flatten1(value: Array<ArrayValue>): Array<any> {
  for (let i = 0; i < value.length; i++) {
    if (Array.isArray(value[i])) {
      flatten1(value[i]);
    } else {
      result.push(value[i]);
    }
  }

  return result;
}

// Approach 2 (recommended which tests recursion skills) - If we need result inside the scope of flatten function

export function flatten2(value: Array<ArrayValue>): Array<any> {
  const result = [];

  for (let i = 0; i < value.length; i++) {
    if (Array.isArray(value[i])) {
      const res = flatten2(value[i]);

      result.push(...res); // Here, result will have the values and will not become empty due to above line flatten2() as that is the separate call in callstack.
      // Once the flatten2() returns res, the flatten2 is removed from callstack and notice in this line our result2 still is from previous scope and have values in that. So
      // don't get confused.
    } else {
      result.push(value[i]);
    }
  }

  return result;
}
