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
