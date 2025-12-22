## [Flatten](https://www.greatfrontend.com/questions/javascript/flatten?practice=practice&tab=coding)

`Approx Time - 10m`

We can do this problem in mainly two approaches that I have done in `flatten.ts`. We can even do a third approach by passing the result inside the flatten function as a second param itself. The core recursion concept is Approach 2 which I have shown below.

```ts
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
```

The comment is crucial to understand in above code. The core confusion that we get is, if we define `const result = [];` within the flatten function itself, then will that not wipe out previously tracked result? The answer is **NO** and the reason is that is a different context altogether that will execute in a different call stack.

Imagine we create callstacks like this

```css
callstack3 -> created third
callstack2 -> created second
callstack1 -> created first
```

The flow will be:

- Say we have input `[0,1, [2,3],[4,5]]`

- We call `flatten([0,1, [2,3],[4,5]])` and this is the first call. For first two elements `0, 1` **the result** **in callstack1**,

`flatten2(value[i])` gets executed in second callstack. there the result will be [] to start with and the element will be `[2,3]`. Once this is complete it returns result of `[2,3]` and is removed from `callstack` so **callstack2 gets removed and `[2,3]` will be returned to first callstack**.

**The keypoint is, in first callstack we had result `[0,1]`** already and now [2,3] will be stored in res which we append to the result. So result in callstack1 becomes [0,1,2,3]. Similar thing happens with callstack 3.
