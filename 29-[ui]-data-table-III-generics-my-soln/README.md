# Data table III

`Approx time - 20m`

This is a continuation of [Data Table II](https://www.greatfrontend.com/questions/user-interface/data-table-ii/react?framework=react&tab=coding). So first complete that where you first do User table I and then sorting that user data.

You will learn Generics here - you need to modify user table into generic data table, so it will be a good practice to do this.

## Things learnt

- Avoid using `FC` with generics `T`
- `keyof T & string`

---

### Avoid using `FC` with generics `T`

- FC (React.FunctionComponent) + Generics\*

This is the part that is awkward.

Example of what doesn’t work nicely:

```ts
const DataTable: FC<DataTableProps<T>> = ({ data }) => { ... }
```

This fails because you can’t put `<T>` on the left side of the assignment when using FC.

So when I say “FC + generics is awkward”, I mean:

You can do it

But you end up wrestling with TypeScript

It’s harder for TS to infer the generic

And it makes your component less reusable

So we avoid FC when writing generic components.

**Summary**

Avoid: FC<DataTableProps<T>>

Use: `function DataTable<T>(...)` or `const DataTable = <T,>(...) => ...`

Both of those are good — the first (function) is the cleanest and most readable.

---

### `keyof T & string`

This is for type narrowing similar to `as const`

```ts
const days = ["Sunday", "Monday"]; // this will be inferred as string[]
```

we need it to be inferred as it is, and not as any type of strings. So we will type narrow it.

Either by doing

```ts
const days = ["Sunday", "Monday"] as const; // this will be inferred as ['Sunday','Monday']
```

OR

```ts
const days: ("Sunday" | "Monday")[] = ["Sunday", "Monday"];
```

On, similar anology, we have `keyof T & string`.

**What is `keyof T & string`?**

_(Note that, as soon as we do keyof something, know that we are most likley talking about a key inside an object)_

Say we have

```ts
const user = {
  name: "Sandeep",
  age: 32,
};
```

the type for this would be

```ts
type User = {
  name: string;
  age: number;
};
```

If we need to extract all keys inside User, then we do

```ts
type UserKey = keyof User; // this would give: "name" | "age" (string literal union)
```

Also, a key thing while working on generic type instead of specific type like User

```ts
type ObjectKey<T> = keyof T; // this would give union type of keys i.e., string | number | symbol
```

Notice that `symbol` and `number` feels strange here. You might think that,
Objects in javascript can only have string keys but that's not true. Most of the times it is right but we can also have symbols as keys.

Ok, symbol is fine, but what about number? I mean, even 123 below

```ts
type Something = {
  123: "Hello";
};
```

will also get converted into "123" string key right? Like this

```ts
type Something = {
  "123": "Hello";
};
```

Yes, but typescript will treat 123 as number only behind the scenes. The reason for that is,

we can do something[123] and also something['123'] and both works because of this reason. So, _typescript treats this as number_

"Hence, `keyof T` can potentially be `string | number | symbol` types (literal unions of these)."

Now, coming back to the main topic we were on, if you want to say, give me keyof User that is of string type, we can do

```ts
type UserKey = keyof User & string; // this would give union type of keys that are string only
```
