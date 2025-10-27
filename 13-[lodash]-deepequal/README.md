## [Deep equal](https://www.greatfrontend.com/interviews/study/lodash/questions/javascript/deep-equal)

`Approx time - 20 minutes`

**Expectation**

Implement a function deepEqual that performs a deep comparison between two values. It returns true if two input values are deemed equal, and returns false if not.

You can assume there are only JSON-serializable values (numbers, strings, boolean, null, objects, arrays).

**There wouldn't be cyclic objects, i.e. objects with circular references.**

```ts
// Examples

deepEqual("foo", "foo"); // true
deepEqual({ id: 1 }, { id: 1 }); // true
deepEqual([1, 2, 3], [1, 2, 3]); // true
deepEqual([{ id: "1" }], [{ id: "2" }]); // false
```

---

### Things learnt

- What is a cicular reference?
- Difference b/w `Object.is` and `===`
- What is a NaN? What is typeof NaN?
- Arrays are Objects indeed. So you should know that internally arrays can still be used as objects.
- How to avoid `Object.prototype.toString.call()` to check the type and stick to traditional approach?

--

#### 1. What is a cicular reference?

An object with a circular reference is when the object directly or indirectly refers back to itself.

```ts
const obj = {};
obj.self = obj;
```

- Here, obj has a property self that points back to the same obj.
- So if you keep following the reference (obj.self.self.self...), it never ends.

Another, slightly more complex example:

```ts
const person = { name: "Sandeep" };
const address = { city: "Toronto" };

person.address = address;
address.owner = person; // circular reference created
```

person → has an address

address → has an owner back to person

So if you try to serialize (JSON.stringify) such objects, you’ll get an error:
`TypeError: Converting circular structure to JSON`

_Why this matters for deepEqual_

```ts
deepEqual(obj, obj);
// recursion would keep following obj.self forever
```

That’s why your question says:

_You can assume there are only JSON-serializable values (numbers, strings, boolean, null, objects, arrays). There wouldn't be cyclic objects._

---

#### 2. Difference b/w `Object.is` and `===`

**Differences**

- NaN check

```ts
NaN === NaN; // false ❌
Object.is(NaN, NaN); // true ✅
```

- Signed zeros

```ts
+0 === -0; // true ❌
Object.is(+0, -0); // false ✅
```

`Object.is` respects the sign bit of zero (important in some numeric edge cases like division).

**Otherwise identical**
For all other values, === and Object.is behave the same.

**Then why not always use Object.is?**

If `Object.is` is more "mathematically correct," why keep `===` at all?

- `===` is the standard equality operator
  It’s built into the language syntax, widely used, and optimized by JS engines for performance.

- `Object.is` is a function call, so `===` is always faster and cleaner for the common case.

- Most code doesn’t care about NaN or -0 - These are edge cases. In everyday comparisons (strings, numbers, booleans, objects, null, undefined), === is perfectly fine.

- Readability & convention - Developers expect to see === when checking strict equality. If you suddenly use `Object.is` everywhere, most people will wonder “why is he checking for NaN or -0 here?”. It signals a special case.

- Different intent
  - `===` → "Are these two values the same for normal strict comparison?"
  - `Object.is` → "I care about NaN and signed zero distinctions."

**📌 When to prefer Object.is**

- Checking for NaN explicitly.

- Working with floating-point math where +0 vs -0 distinction matters.

- Implementing polyfills or equality helpers (e.g., React’s Object.is in useState comparisons).

- Otherwise, stick with ===.

**✅ Rule of thumb:**

Use === by default, reach for Object.is only when you know you care about NaN or -0.

Think of `Object.is` as a specialist tool while `===` is your everyday hammer.

---

#### 3. What is a NaN? What is typeof NaN?

`typeof NaN; // "number"`

`NaN` stands for Not-a-Number.

It is a special numeric value in JavaScript that represents an invalid or unrepresentable number.

hence `typeof NaN; // "number"`

**Examples where NaN occurs:**

```ts
0 / 0; // NaN, division by zero is undefined
parseInt("abc"); // NaN, invalid numeric conversion
Math.sqrt(-1); // NaN, square root of a negative number
```

- **NaN is not equal to anything, including itself:**

```ts
NaN === NaN; // false ❌
Object.is(NaN, NaN); // true ✅
```

###### **Why `NaN === NaN` is false?**

       - NaN represents an invalid number, not a specific numeric value.Mathematically, it is undefined, so it is treated as unequal to any value—including another NaN.

###### **How to check if a value is NaN**

###### 1. Using Number.isNaN() (recommended)

```ts
Number.isNaN(NaN); // true
Number.isNaN(5); // false
```

###### 2. Using `Object.is()` for equality checks in deep comparisons

```ts
Object.is(parseInt("abc"), parseInt("abcd")); // true
```

###### 3. Why deepEqual treats `NaN` as equal?

In deep equality, we usually care about values, not their origin.
So two different operations resulting in NaN are considered “equal” because both values are NaN:

```ts
deepEqual(parseInt("abc"), parseInt("abcd")); // true ✅
```

Philosophical vs practical perspective:

Philosophically: NaN from parseInt("abc") is not the same as NaN from parseInt("abcd").

Practically: In JavaScript programming, we treat them as equal for value comparisons because they behave the same in arrays/objects, and that’s usually what matters.

###### Summary:

NaN is a number type that represents an invalid numeric value.

NaN === NaN is false.

Object.is(NaN, NaN) is true and is preferred in deep equality checks.

In practical programming, NaNs are treated as equivalent for value-based comparisons.

---

#### 4. Arrays are Objects indeed. So you should know that internally arrays can still be used as objects.

In JavaScript, arrays are actually special kinds of objects. This is important to understand when implementing deep equality, because it allows you to treat arrays and objects in a similar way when checking their keys and values.

Example:

```ts
const arr = [1, 2, 4]; // this can also be arr = [1,2,4] as Record<string, number>

// Updating an element using index
arr[2] = 4;

// Updating an element using string key
arr["2"] = 4;
```

Why does this work?

```ts
arr = [1, 2, 4];

// Internally, this is equivalent to:

arr = {
  "0": 1,
  "1": 2,
  "2": 4,
  length: 3,
};
```

Each index in the array is actually a string key in the object.

Arrays also have a length property, but otherwise they behave like objects with numeric keys.

**Why this matters for deepEqual**

When doing deep comparison:

```ts
return entriesA.every(([key, val]) => {
  return (
    Object.hasOwn(valueB as Array<unknown> | Object, key) &&
    deepEqual((valueB as Record<string, unknown>)[key], val)
  );
});
```

- Object.hasOwn() works for both arrays and objects, checking if the key exists.

- Treating valueB as a Record<string, unknown> works for both arrays and objects.

- This allows us to access elements in arrays and properties in objects the same way: value[key].

✅ Takeaway: Arrays can be treated like objects when comparing keys and values. This simplifies the deepEqual logic, allowing a unified approach for arrays and objects.

---

##### 5. How to avoid `Object.prototype.toString.call()` to check the type and stick to traditional approach?

The problem currently is, I tried avoiding

```ts
const typeA = Object.prototype.toString.call(valueA);
const typeB = Object.prototype.toString.call(valueB);
```

and instead tried. For both arrays and objects we get typeA and B as object which is fine because we could do Object.entries on both arrays and objects

```ts
const typeA = typeof valueA;
const typeB = typeof valueB;
```

The problem was, then `deepEqual({},[])` will be treated true which is not what we want. So we need a way to treat them separately. With `Object.prototype.toString.call` we used to get this out-of-box because both arrays and objects had a different signatures `"[object Array]"` and `"[object Object]"` respectively that made our lives easy. So stick with that.

Alternatively we can do this to eliminate `Object.prototype.toString.call`

```ts
// If either is null or not an object, they are not equal
if (
  valueA === null ||
  valueB === null ||
  typeof valueA !== "object" ||
  typeof valueB !== "object"
) {
  return false;
}

// Handle arrays explicitly
const isArrayA = Array.isArray(valueA);
const isArrayB = Array.isArray(valueB);
if (isArrayA !== isArrayB) return false; // array vs object mismatch
```

But I still would stick to our current official solution.

---
