## Lodash - Curry

`Approx time needed - 20 minutes`

### Things learned

- Type of a function
- `.call`, `.apply` and `.bind`
- How to find function length and arguments length (meat of the problem)
- Trip ups about single parameter. How to limit user passing only one arg right from the beginning to end (point 4 and 5 below)
- How `bind` really works through this [blog](https://medium.com/@omergoldberg/javascript-call-apply-and-bind-e5c27301f7bb) before attempting curry using bind.

These are essential things you need to know before attempting the problem.

<!-- Note: 4th point is very important and don't miss that to understand multiple args passed at once (sufficient args) will work right away - the question might seem confusing here, so read point 4 -->

**1. How to type a function parameter that takes mutliple args in TS?**

`Function` is the type, lol. It didn't know that.

```ts
function curry(fn: Function) {}
```

The function accepts a function and returns a function.

```ts
function curry(fn: Function): Function {}
```

---

**2. How to know the length of arguments a function could accept**

- By doing fn.length

```ts
function curry(fn: (a: number, b: number) => number) {
  const fnArgs = fn.length;
}
```

---

**3. `this` keyword must be specified in TS function arg (as first argument) but not required in JS**

JS version

```js
function curried(...args) {
  if (args.length >= func.length) {
    return func.apply(this, args); // 'this' here is understood that it is part of ...args.
  }
}
```

In TS however, you need to specify `this` in the arguments as first arg. Otherwise TS errors out.

```ts
return function curried(this: any, ...args: Array<any>) {
  if (args.length >= func.length) {
    return func.apply(this, args);
  }
};
```

---

**4 Very important - The question says the curried function should accept one parameter**

[This is what the question says](https://www.greatfrontend.com/interviews/study/gfe75/questions/javascript/curry)

> Implement the curry function which accepts a function as the only argument and **returns a function that accepts _single_ arguments**

So I was largely tripped up by this while implementing. NEVER FORGET THIS POINT.

What it means is that, the function that you return when there are not enough args, that function should accept a single arg, and not the top level returning function itself where you destructure your args.

What I mean is, and the reason I got confused is: If you do

```ts
const curriedAdd = curry(add);
const firstAdd3 = curriedAdd(3);
const thenAdd4AndGetResult = firstAdd3(4);
console.log(thenAdd4AndGetResult); // 7
```

the above is expected to work, but if you do the following

```ts
const curriedAll = curry(add);
console.log(curriedAll(2, 3));
```

It still works where I got confused.

I was initially thinking, it should work only for a single arg like we did here (one arg at a time), but it also works if we do all args in the first call like I showed above.

```ts
const curriedAdd = curry(add);
const firstAdd3 = curriedAdd(3);
const thenAdd4AndGetResult = firstAdd3(4);
console.log(thenAdd4AndGetResult); // 7
```

What doesn't work is, multiple args if passed like this - single arg first and then multiple args (doesn't work as the returned function at last takes only one arg at a time)

```ts
function add(a: number, b: number, c: number) {
  return a + b + c;
}

const curriedAdd = curry(add);
const firstAdd3 = curriedAdd(3);
const thenAdd4AndGetResult = firstAdd3(4, 5);
console.log(thenAdd4AndGetResult); // 5 is not assigned to c
```

But this works

```ts
const curriedAdd = curry(add);
const firstAdd34 = curriedAdd(3, 4); // <- where I give multiple args
const thenAdd4AndGetResult = firstAdd34(5);
console.log(thenAdd4AndGetResult); // 12
```

---

**5 Very important - Continuing on point 4, how can we make the function to strictly accept one parameter at a time**

This is the perfect version that I can practice on

```ts
export function singleCurry(fn: Function): Function {
  function curried(this: any, ...args: Array<any>) {
    if (args.length >= fn.length) return fn.apply(this, args);

    return (next: any) =>
      next === undefined
        ? curried.apply(this, args)
        : curried.apply(this, [...args, next]);
  }

  return function (this: any, arg: any) {
    // no args needed
    if (fn.length === 0) return fn.call(this);

    return arg === undefined ? curried.call(this) : curried.call(this, arg);
  };
}
```

---

**6 Why the return type Function works, when we are actually not returning a function in `fn.apply(this, args)`?**

Notice these lines

```ts
export function curryUsingBind(fn: Function): Function {
  return function curried(this: any, ...args: Array<any>): Function {
    // Here
    if (args.length >= fn.length) return fn.apply(this, args);
  };
}
```

In line 2 we are specifying return type as `Function` and that is for insuffuicient args case. For sufficient args case, we reach this line `if (args.length >= fn.length) return fn.apply(this, args);` which actually returns the value and not a function.

So why doesn't typescript complain about it? Why return type Function works?

That is because the return type of `fn.apply` is `any`.

Hence I removed the return type to avoid confusion.

---

**6. Using `.bind`**

This is very interesting to write curry function using `.bind`. To understand how bind works, [better read this blog first before attempting](https://medium.com/@omergoldberg/javascript-call-apply-and-bind-e5c27301f7bb)

```ts
export function curryUsingBind(fn: Function) {
  return function curried(this: any, ...args: Array<any>): any {
    if (args.length >= fn.length) return fn.apply(this, args);

    return curried.bind(this, ...args);
  };
}
```

`return curried.bind(this, ...args);` this holds this keyword and accumulates any args that were previously called.
