## [Deep clone - On JS Objects](https://www.greatfrontend.com/interviews/study/lodash/questions/javascript/deep-clone)

`Approx time - 15 minutes`

Expectation

```ts
const obj1 = { user: { role: "admin" } };
const clonedObj1 = deepClone(obj1);

clonedObj1.user.role = "guest"; // Change the cloned user's role to 'guest'.
clonedObj1.user.role; // 'guest'

obj1.user.role; // Should still be 'admin'.

const obj2 = { foo: [{ bar: "baz" }] };
const clonedObj2 = deepClone(obj2);

obj2.foo[0].bar = "bax"; // Modify the original object.
obj2.foo[0].bar; // 'bax'

clonedObj2.foo[0].bar; // Should still be 'baz'.
```

### Things learnt

#### What are JSON Serializable values

- `(null, boolean, number, string, Array, Object)` these are the ones.
- They don't contian Datastructures like `Date`, `Regex`, `Map` or `Set`

---

#### Structure to do a check for each type

We know values can be one of these

- null, undefined, number, string (all these can be returned as is as we dont need to deep clone them as they are value types and not reference types)

- Array

- Object

Now, all Arrays are also considered as objects. So `typeof [] === 'object'` is `true`. Hence we need to first do a check specifically for the arrays and then move to object.

If we do the other way round - If we check for objects first and then arrays, since all arrays are objects, even array checks are caught by object checks and they never reach array checks even if it is array.

So the correct order is

- Check for array

- Check for object (make sure you check if value is not null as it is also an object - bug in JS)

- All other types like null, undefined, number, string (which can be returned as is)

---

#### How to check for array

There are two ways to check

- `Array.isArray(val)` -> Better to use this

- `val?.constructor === Array` -> Here you will not get TS help and won't recognize val being an array inside the if-condition because, `val.constructor` is a run time check and TS can't guarantee us that this is going to be an array. So if we use this method for some reason, then make sure to typecast like this `val as unknown[]`

```ts
if (val?.constructor === Array) {
  return (val as unknown[]).map((el) => deepClone(el));
}
```

---

#### [TS] Generics - What type to use for this in terms of input and output param types of `deepClone` function?

I initially started doing this

```ts
const deepClone = (val: any): any => {};
```

then I thought this is too narrowed and not a good practice, and I did

```ts
const deepClone = (val: unknown): unknown => {};
```

but then the problem with above is, you will not get any typescript help if u call this function. You need to cast the return values yourself like this

`const result = deepClone({name:'Sandeep'}) as Record<string,string>`

becuase `deepClone({name:'Sandeep'})` produces unknown type or any type which is not very useful.

Hence generics are most suitable here.

```ts
const deepClone = <T>(val: T): T => {};
```

So here, you can do

`const result = deepClone({name:'Sandeep'})`

now, as soon as you pass `{name:'Sandeep'}` param, it becomes T and the return type is also T which gives you back same thing in the result that you can use.

**as T**

Notice that, using `const deepClone = <T>(val:T):T` there's one thing to remember. Let's consider this

```ts
if (Array.isArray(val)) {
  return val.map((el) => deepClone(el)) as T;
}
```

now what is val here. It is of type T. You need to check if T is actually an array and you are doing `(Array.isArray(val))` which is good.

But what's the type of each `el` in the array? **It will be of type unknown**. Becuase, obviously how can TS know what an array element of type T array is. So it considers it `unknown` type.

You then need to cast the return type of that array `as T`, coz you know as a developer that, whatever the input val we got, the output (what we will return) is going to be of same type. Hence we do **as T** which is a common pattern, so remember this always in your **SUBCONSIOUS**.

Why don't we need `as T` for default return (for primitives), because we are just returning the value we got as input so typescript has not lost track of this and will still know it is of type T.

**Summary**

Why as T is fine

_Array branch_: `val.map(...) as T` → TS can’t track element type after map.

_Object branch_: `clonedObject as T` → TS can’t track the shape after you build a new object.

_Primitive branch_: no cast needed, TS knows the type hasn’t changed.

---

[Reference ChatGPT notes](https://chatgpt.com/share/68cf3a5d-1328-800b-af92-537579e9ed7a)
