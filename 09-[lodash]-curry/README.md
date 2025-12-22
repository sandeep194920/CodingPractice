## Lodash - Curry

`Approx time needed - 20 minutes`

### Things learned

- Type of a function
- `.call`, `.apply` and `.bind`
- How to find function length and arguments length (meat of the problem)
- Trip ups about single parameter. How to limit user passing only one arg right from the beginning to end (point 4 and 5 below)
- How `bind` really works through this [blog](https://medium.com/@omergoldberg/javascript-call-apply-and-bind-e5c27301f7bb) before attempting curry using bind.
- **Important: For curriedAdd(3), my doubt was how does it form a closure with .apply(this, [...args,arg])? I mean it was hard to visualise mentally. [So refer claude's response scroll down below](https://claude.ai/share/c660ac09-553b-4335-a2bc-0036084552f1) - Ignore the interactive visualizer and come to how the scope works**

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

---

### Scope confusion

For curriedAdd(3), my doubt was how does it form a closure with .apply(this, [...args,arg])?

**The Key Insight: Function Parameters ARE Local Variables**

When you write:

```ts
function curried(this: any, ...args: any) {
  // args is available here
}
```

This is functionally identical to:

```ts
function curried(this: any) {
  const args = [all the arguments passed in];
  // args is available here
}
```

Parameters are just a convenient way to declare and initialize local variables at the same time!

**Visual Comparison**

Your Simple Example (variable declared inside):

```ts
const s = () => {
  let t = 1; // ← Variable declared INSIDE the function body
  return () => {
    t += 1;
  };
};
```

Curry Example (variable declared as parameter):

```ts
function curried(...args) {
  // ← Variable declared as PARAMETER
  return (arg) => {
    curried.apply(this, [...args, arg]);
  };
}
```

**They're the SAME! Here's proof:**

Version A - Parameter style (what curry uses):

```ts
function outer(x) {
  return () => console.log(x); // x captured
}
```

Version B - Variable style (what you're comfortable with):

```ts
function outer() {
  let x = arguments[0]; // x declared inside
  return () => console.log(x); // x captured
}
```

Both create the EXACT same closure!

Why Parameters Feel Different

You're thinking: "The parameter comes from outside, so how is it scoped to the function?"

But here's the truth:

When you call curried(3, 4), JavaScript immediately creates local variables for those parameters
args becomes a local variable that exists only within curried's scope
It just happens to be initialized with values from the function call

**Mental Model Shift**

Think of parameters as:

```ts
function curried(...args) {
  // JavaScript automatically does this:
  // let args = [3, 4];  ← Created at function entry

  return (arg) => {
    // This inner function captures the LOCAL variable 'args'
    curried.apply(this, [...args, arg]);
  };
}
```

**The Scope Rules Are Identical**

```ts
// Example 1: Variable inside
function outer() {
  let x = 1; // ← Scoped to outer
  return () => x; // ← Captures x
}

// Example 2: Parameter (same thing!)
function outer(x) {
  // ← x is scoped to outer (just initialized differently)
  return () => x; // ← Captures x
}

// Example 3: Your curry
function curried(...args) {
  // ← args is scoped to curried
  return (arg) => {
    [...args, arg]; // ← Captures args
  };
}
```

**The "Aha!" Moment**

Parameters ARE local variables. They're just:

1. Declared in the function signature instead of inside the body
2. Automatically initialized with the values passed when the function is called

So when the inner function captures args, it's capturing a local variable that belongs to the outer function's scope, exactly like capturing t in your simple example.

**Why This Matters**

This is why both of these work identically:

```ts
// Style 1: You're comfortable with this
const s = () => {
  let captured = 1;
  return () => captured;
};

// Style 2: This is the SAME thing
const s = (captured) => {
  return () => captured;
};
```

_The second one just saves you a line of code!_

Bottom line: Don't think of parameters as "coming from outside." Think of them as local variables that JavaScript automatically creates and initializes for you when the function is called. Once created, they're 100% local to that function's scope and can be captured by closures just like any other local variable.

**`return function curried(this: any, ...args: any) { }` can be visualized like this**

```ts
return function curried(this: any) {
  args; // got updated to [3]
};
```

When you call curriedAdd(3), this:

```ts
return function curried(this: any, ...args: any) {
  // ...
};
```

Can be mentally visualized as:

```ts
return function curried(this: any) {
  let args = [3]; // ← JavaScript automatically does this for you!
  // ...
};
```

**The Parameter Syntax is Just Sugar**

```ts
// What you write:
function curried(...args) {}

// What JavaScript effectively does internally:
function curried() {
  let args = Array.from(arguments); // Captures all passed arguments
}
```

So when you call curried(3), JavaScript:

1. Creates a new execution context
2. Creates a local variable args
3. Sets args = [3]
4. Runs the function body

**Visualization**

```ts

curriedAdd(3)
↓
// Executes this:
return function curried(this: any) {
  args = [3];  // ← "Updated" (initialized) to [3]

  if (args.length >= fn.length) { ... }

  return (arg) => {
    curried.apply(this, [...args, arg]);  // args is [3] here
  };
}
```

Then when you call addThree(4):

```ts
addThree(4)
↓
// The returned arrow function executes:
(arg) => {
  arg = 4;  // ← New parameter
  curried.apply(this, [[3], 4]);  // Reads [3] from closure, passes [3, 4]
}
↓
// This triggers a NEW execution:
return function curried(this: any) {
  args = [3, 4];  // ← "Updated" (initialized) to [3, 4] in this NEW execution
}
```
