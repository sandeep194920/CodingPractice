# Basic typescript related knowledge that's useful for day-to-day coding

Look at `main.ts` file and learn each example. 'Things to learn' will teach some common questions that we get usually.

### Things to learn

##### 1. type vs interface - When to use what.

Types are Interfaces can be used to solve same purpose interchanably. Types are more flexible than interfaces when it comes to primitives type definition.

Interfaces are more useful when one type/interface needs to extend other. Mostly use interface as convention to type react state and component props.

Types can be more useful for primitive aliasing (give a new type for existing primitive type like number, string etc.), composition (combining multiple types to make a new type), and union types (one of many possibilities)

---

##### 2. Readonly vs as const - `[2,3,4] as const`, vs `Readonly<number[]> = [2,3,4]`

Both are similar:

- Arrays are immutable - no new element can be added, element cant be deleted, modified and so on

`as const` gives you literal type inference whereas readonly doesn't.

```ts
const readonlyarr = (Readonly<number[]> = [2, 3, 4, 5]); // can also be written as ReadonlyArray = [2,3,4,5]

const arr = [2, 3, 4, 5] as const;
```

Use `as const` when you need to infer type (when you hover on arr). It gives you type as `[2,3,4,5]` and not as `number[]` (generally useful for tuple types)

Use `Readonly` when you don't care about narrowed type like `[2,3,4,5]` and you're ok with `number[]`

---
