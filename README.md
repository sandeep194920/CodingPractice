# FE Interview Practice

This repository contains **frontend interview practice questions**.  
Each question is organized with clear numbering, details, and supporting notes.

## Structure

- Every question is prefixed with a **question number** indicating the practice order.
- Each question folder contains:
  - A `README.md` with enough details to understand and practice the question.
  - A **Notion link** for additional notes and explanations.

## Purpose

The goal of this repo is to:

- Systematically practice frontend interview problems.
- Maintain detailed notes for quick revision.
- Build a reusable knowledge base for future reference.

### Index - Quick lookup on 'Things learnt' in each question

##### 0. Typescript basics

- `:` vs `satisfies`
- `type` vs `interface` - When to use what.
- `Readonly` vs `as const`

---

##### 1. Aggregate list (Transactions)

1. Use of `span` in "Render format: <Customer Name>: <Amount>".

2. Use `reduce` where possible - Compute customer balances by aggregating transactions (use `reduce` when you see a pattern where you use one variable for holding the result and next set of lines to compute that result).

- Find highest-balance customer by scanning the aggregated balances (try without `reduce` first and then convert that using `reduce`)

- Edge cases to consider: negative amounts (use `-Infinity`), multiple transactions per customer (building aggregate list first before getting balances key-val pair)

- Filtering - Make sure to avoid `useEffect` and use derived state. Also keep in mind that you need main list to filter out from, and not the filtered list.

---

##### 11. Modal Dialog IV

- How to focus on first element in modal-dialog when it mounts?

- How to trap the focus within the Modal dialog on tab/shift tab presses?

- How to focus back on the element that triggered the modal mounting after the modal unmounts?

- What is a tabbable element?
- Meaning of `tabIndex = 0`, tabIndex > and < than 0
- How to get all tabbable elements within a container?

- How to type a ref? `(RefObject<HTMLElement | null>)`
- Why we need to check if the element is instance of `HTMLElement` (returned from NodeList) before doing focus() on it?

- UseEffect gotchas:

  - `useRef` value change might not trigger the DOM so be careful with early returns
  - DOM not ready yet, so a few things must be defined inside the useEffect rather than outside.

- Why do we need `ring` (from tailwind) when `outline` exists? What's the difference b/w a border, outline and a ring?

---

##### 12. Deep Clone

1. What are JSON serializable values

---

##### 13. Deep Equal

- What is circular reference in object

- `Object.prototype.toString.call()` to check the types - Every type is different here so can become easy if we use this

- `Object.is(valueA, valueB)` vs `===`

  - Use`object.is` only if you care about NaN comparison (NaN === NaN if you want this to be true then use Object.is)

  - Use `object.is` only if you want -0 to be treated different from +0 (where mathematically both are different)

  - What is `NaN`?

    - Note that `typeof NaN; // "number"` **Very important**

  - **VERY IMPORTANT** - Arrays can still be objects. `[1,3,4] as Record<string,number> works`

    - `[1,2,4]` on this if you do `arr[2]` you get `4`, and `arr['2']` is also `4`. So, it is important to understand arrays are objects internally which would help you convert objects into arrays or vice-versa and do the comparison.

  - How to avoid `Object.prototype.toString.call()` to check the type and stick to traditional approach?

---

##### 14. Difference

- `SameValueZero`
- Check for sparse array element
- `i in object` vs `Object.hasOwn(object, i)` -> Why the latter one is better
- `array.filter(Boolean)` is used to remove sparse elements + falsy values. But `array.filter((_,i) => i in array)` can remove only sparse elements (sparse elements = elements where key itself doesn't exist)

---

##### 16. Character frequency aggregate

- Asked at IBM
- Involves map datastructure - get from map

---

##### 17. Number base conversion

- Generally asked at IBM first round
- Decimal to binary
- Binary to decimal
- Decimal to octal
- Octal to decimal
- Up for any conversion where decimal isn't involved

---

##### 18. Fibinocci

- Find fibinocci number through recursion
- Find fibinocci number through loops
- Optimize the above
- Function to generate fibinocci series (not just return the number but return back the whole series)
- Function to generate fibinocci tree that prints the above generated sequence into number of rows the user wants

---

##### 19. Prime number or not

- Shows 3 ways to check:
  - non-optimized
  - optimized (check until sqrt)
  - more optimized (same as above optimized check but include a check to remove even numbers as well except for 2)

---

##### 20. HCF/GCD and LCM (You have to remember the formula)

- You need to _remember_ the Euclidian alogorithm so it will always be fresh in mind
- What is LCM and how's LCM related to GCD?

---

##### 21. Reverse a number - Also check for palindrome easily

- See how to mathematically reverse a number, not converting into a string
- You can then check by comparing the number and reversed to see if they are same to conclude if it is palindrome

---

##### 22. Missing words

- Asked in IBM
- Look at the [Missing words readme](https://github.com/sandeep194920/CodingPractice/tree/main/22-%5Bstring%5D-missing-words) to understand the way to approach manually first. _This is the key to solving any problem_

---

##### 23. Find duplicates in the array

- Right way to sort an array - `sort` mutates the array by sorting in-place. Hence, copying it before sorting is the best approach
- _3 ways_ to find duplicates in the array

---

##### 23. Find missing number in an array sequence

---

##### 24. File Explorer

**File Explorer I**

- Recursive way to think
- `sort` and `localeCompare`
- ARIA labels

---

##### 27. Data Table I

- `border-collapse:collapse` prop on table to get rid of double border
- `flex` vs `inline-flex`

---

##### 28. Data Table II

- Sort table data in ascending and descending orders
- Why we do `localCompare` to sort strings and not `>` or `<`

---

##### 29. Data Table III

- Avoid using `FC` with generics `T`
- `keyof T & string`

---

##### 30. TODO List

- How to create unique `key` for a list? How to also make it secure?
- How to submit on enter? This is basically by wrapping `input` and submit `button` inside the `form` to get this behaviour?
- How to add delete window confimation before deleting a task?
- QUIZ - What if you want to re-render only the items that have changed to the UI? -> **React Memo**
- `aria-live` for live updates - Important where something updates based on actions. For example, in todo list, the render area changes when a todo is added, deleted and so on.

---

##### 31. Sort elements by frequency

- Bucket sort
- Sort - `sort()` doesn't work on numbers. We need to do `sort(a,b => a-b)`
- How do you do

```ts
{
  5: 2,
  4: 2,
  6: 1,
  1: 1
}

// Or a Map => {5 => 2, 4 => 2, 6 => 1, 1 => 1} -> This represents (first value as number and second value as times)

// to get -> in ascending order where high frequency should come first but in ascending order

[4, 4, 5, 5, 1, 6]

```

- **Very important to learn this so you master the sorting**

---

##### 32. Job Board

- Why GreatFrontEnd solution is not perfect here?

- How to call APIs, and also use a ref to check if component exists before updating the state

- What is `isMounted` and why we need to use that?

- React Strict mode. Why `setState(normal array)` is **NOT** better than an updater function like `setState(prev => ...)` (Greatfrontend does `setState(normal array)` which is not good)?

- How to properly handle duplicate results caused by react strict mode? Why the duplicates are caused even after updating the state conditionally by checking if `isMounted.current === true`?

---

##### 33. Traffic Light

- State machine
- SetTimeout and cleanup function inside useEffect

---

##### 34. Tic-Tac-Toe Winner logic

- How to write winner logic for a 3x3 fixed board using 1D array
- How to use a matrix (2D array) for NxN board
- How to use 1D array for NxM or NxN boards

**In [official Tic-Tac-Toe II solution](https://www.greatfrontend.com/questions/user-interface/tic-tac-toe-ii), we use the last one, but their solution is little cluncky. Ours is better**

---

##### 37. Connect four

- Steps to do this game - How to divide the game (Where to start)?

- To determine winner using Delta pattern (same pattern applied to all 4 sides - row, col, left diag, right diag) to find the winner.

  - This pattern can be applied to most of 2D games including Tic-Tac-Toe.

- How to show some element on hover on screen?
- `onMouseEnter` and `onMouseLeave`

- How to copy (Deep copy during state update) the matrix/2D array.

---

##### 38. Image Carousel

- When to do `align-items:center` vs `left:50%; transform:translate(-50%)`? -> The later one is done for absolutely positioned elements.

- How to rotate b/w pages. From last page to first and then first to last? By doing

```ts
add`(prev - or + 1 totalImages)  % totalImages`;
```

**So add `totalImages) % totalImages`**

---

##### 39. Image Carousel 2 (smooth transition from one image to next)

- How to continue from image carousel 1.
- How to translateX (move) images with **animation** (**transition**).
- Hide other images by doing `overflow:hidden` on `image-carousel` container.
- `onTransitionEnd` - to detect when CSS transition completes

**Key Learnings:**

- **React render phases:** Trigger → Render → Commit → useEffect runs

  - `ref.current` is only available after commit phase
  - That's why we can safely access it in `useEffect`

- **Why we need `isTransitioning` state:**

  - Prevents transition during window resize (only transition on button clicks)
  - Apply transition class conditionally to `image-carousel__row` element
  - Disable buttons during transition to prevent rapid clicks

- **Window resize doesn't trigger React re-render by default:**

  - CSS recalculates automatically (`min(600px, 100vw)`)
  - But JavaScript state (`imageWidth`) stays stale
  - Need resize listener to sync browser state → React state via `setState`

- **Better alternative: ResizeObserver**

  - Watches specific element, not entire window
  - Automatically fires on initial observation (no manual initial call needed)
  - Only fires when the carousel element actually resizes
  - More efficient than `window.addEventListener('resize')`

- **Why `width: 100%` on images is better than `min(600px, 100vw)`:**

  - Single source of truth (only container defines width logic)
  - Images automatically inherit from parent
  - Changing container width doesn't require updating image styles

- **Common mistake:** Never use `useEffect` just to set initial state without external system synchronization

```tsx
// ❌ BAD - causes cascading renders
const [state, setState] = useState(false);
useEffect(() => {
  setState(true); // No external system, just setting state
}, []);

// ✅ GOOD - synchronizing with external system (DOM measurement)
useEffect(() => {
  function updateWidth() {
    setImageWidth(ref.current?.getBoundingClientRect().width ?? 0);
  }
  updateWidth(); // Initial + window resize subscription
  window.addEventListener("resize", updateWidth);
  return () => window.removeEventListener("resize", updateWidth);
}, []);
```

- **`getBoundingClientRect()` returns rendered size including padding and border**

  - Returns precise floating-point numbers
  - Position is relative to viewport (not document)
  - Use this for dynamic measurements

- **Debug tip:** Add `border: 5px solid red` to images to visualize actual bounds and catch sizing issues

---

##### 40. Image Carousel 3 (Performance optimization)

- What is `requestAnimationFrame` - How it works? Especially at which point the Browser paints?

- How to optimize to have a single image and then render another image to screen + animation when "Next" or "Previous" button is clicked?

---

##### 41. Transfer List Logic

- Use a map if you want to delete items from the list **_(This is very important to remember for you to decide when to use Map Vs Array)_**.
- Use an array if you don't modify the list
- `forEach` signature will have `(val, key)`. You can't use `map` or `filter` but can use `forEach` on Map
- `map.entries()` is very much same as doing `map itself`
- `map.forEach((val,key) => )` is different from arrays in terms of parameters

---

##### 42. Transfer List

- `map.entries()` is very much same as doing `map itself`
- If you see this pattern where a component has checkbox + label, it's better to make it a component because we need to use `useId()` to get the unique Id. This will be a clean approach.
- `map.forEach((val,key) => )` is different from arrays in terms of parameters

---

##### 43. Users Database

- Select option
- Multiple buttons for form submissions - button `name` and `value` prop pair usage.

```ts
const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
e.preventDefault()
const formData = new FormData(
  e.currentTarget,
  (e.nativeEvent as SubmitEvent).submitter
);

const intent = formData.get("intent");

```

- How to deal with a problem with `select` where an `option` still remains selected after clicking cancel button.

---

##### 44. Format Time

- Learn how to format time into hours, minutes, seconds and milliseconds when input is milliseconds

---

##### 45. Stop Watch

- Learn to Format Time (Previous question 44 first)
- How to divide the time in milliseconds into hours, minutes, seconds and milliseconds
- Why `setInterval` cannot be used alone and need some kind of variable to keep track of past time.

```ts
// ❌ Naive approach (inaccurate)
setInterval(() => {
  setTotalDuration((duration) => duration + 1); // Just add 1ms each tick
}, 1);
```

- What should be the second param of setInterval here? It must be 1 - which signifies 1 millisecond. The interval must run every millisecond so don't put 1000. 1000 means the interval should run every second which is not the case (Even if we don't show ms on the screen).

---

##### 46. Digital Clock

- Difference between [Stop Watch Delta concept](https://github.com/sandeep194920/CodingPractice/tree/main/45-%5Bui%5D-stop-watch#why-setinterval-cannot-be-used-alone-and-need-some-kind-of-variable-to-keep-track-of-past-time) vs this question. Same applies to Anaglog clock as well as both Digital and [Analog Clock](https://www.greatfrontend.com/questions/user-interface/analog-clock?practice=practice&tab=coding) questions are similar.

- Core logic of this problem with timer.

- How to plan CSS for the digits.

- How to get first and second numbers of a double digit number like 12 or 10 or 11 and so on?

- What semantic HTML to use for the time?

---
