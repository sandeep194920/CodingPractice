## UI - Modal Dialog IV

First complete Modal I, II and III questions before attempting this.

`Approx time needed - 20 minutes`

### Requirement

We already implemented Escape key to close the modal. In this question, we will implement remaining keyboard interactions to navigate across different tabbable elements in the modal. We need to implement remaining keyboard interactions related to focus management. We need to implement the following:

**Add a red border to all elements that are focusable by pressing tab**

- We need to define style on focused element. Something like this:

```css
*:focus {
  outline: 2px solid red;
  outline-offset: 2px; /*gap between border and the border color red - Since we have this, then why do we need ring ?. Look below for explanation*/
}
```

**Focus first element**

- When a dialog opens, focus moves to the first element inside the dialog
- When a dialog closes, focus returns to the element that invoked the dialog

**Focus trapping**

- The default behaviour is, when you press tab inside modal, it navigates through all tabbable elements in order and goes out of the modal dialog to focus on the tabbable element outside the modal. We don't want this behaviour and need to implement focus trapping where, when the tab is pressed on last tabbable element inside the modal dialog, the focus shifts to first tabbable element in the modal. Same must happen with shift+tab. Overall, the tab presses should remain within the modal dialog.

**Focus back on element that was last focused when modal dialog closes**

- Focusing on the button (that opens the modal) using the tab and clicking Enter or Space, the modal gets open. Say we then press Escape key to close the modal, then the button (that opened the modal) should get focused again as the button was the last element that was focused by tabbing before the modal was opened.

---

### Things learned

#### 1. What is a tabbable element?

"Tabbable element" refers to element that can be focused by pressing tab. For example, `button`, `href`, `input`, `select`, `textarea`.

**How are all these elements focusable?**

They are focusable because they have a default `tabIndex` of `0` or a user defined tab index > 1. `tabIndex` is a prop on HTML element that dictates if an element must be focused on pressing tab.

**Can a tabIndex be negative?**

If the tab index is set to -ve, something like `-1`, then that element will not be focusable when user presses tab or shift+tab. That element can still be focused programatically by JS, using `.focus()`.

**Can a tabIndex be greater than 1. And what does that mean?**

A tab index is 0 by default. It can be set to some value like 1 which is greater than 0 but it's not advisable. Setting a higher tabIndex means, the element might get focused first before other tabbable elements.

Say there are 4 tabbale elements and you set `tabIndex = 1` for 4th element in the DOM. Then when the user presses tab then the 4th element will be focused first which leads to confusion. Hence it is not a good practice to set tabIndex > 0.

Note:

**"focusable" vs "tabbable":**

- Focusable elements can receive focus either by keyboard (Tab) or programmatically (using .focus()).
- Tabbable elements are those that can be reached using the Tab key alone.

---

#### 2. Why did we switch from `App => Modal [that has (!open) return null]` to `App => ModalDialog [that has (!open) return null] => Modal`?

[Read it here, in 7b](https://github.com/sandeep194920/CodingPractice/tree/main/11-%5Bui%5D-modal-dialog-IV)

---

#### 3. How to type ref?

`const dialogRef = useRef<HTMLElement>(null);`

`elRef: RefObject<HTMLElement | null>` <- this is how dialogRef can be typed in as a parameter

Example

```ts
const getTabbableElements = (elRef: RefObject<HTMLElement | null>) => {
  // checking for null or undefined using == null.
  if (elRef.current == null) return [];

  // Node list of all tabbable elements (note that it's not array because querySelectorAll returns node list)
  return elRef.current.querySelectorAll(
    "button, [href], select, input, textarea, [tabIndex]:not([tabIndex = -1])" // there can be many more like button:not([disabled]) -> look at readme
  );
};
```

---

#### 4. Why we need to check if the element is instance of `HTMLElement` (returned from NodeList) before doing focus() on it?

| **Type**      | **What it represents**                                                                    | **Has `.focus()`?**                |
| ------------- | ----------------------------------------------------------------------------------------- | ---------------------------------- |
| `Node`        | The base type for _everything_ in the DOM tree — elements, text, comments, document, etc. | ❌ No                              |
| `Element`     | A subtype of `Node` — represents any DOM element (SVG, HTML, etc.)                        | ❌ Not always                      |
| `HTMLElement` | A subtype of `Element` — specifically HTML elements (like `<button>`, `<div>`, etc.)      | ✅ Yes (`focus()`, `blur()`, etc.) |

---

#### 5. How to get tabbable elements?

```ts
/* getTabbableElements -> gets all elements that are tabbable inside a given area like modal dialog (which can be referenced using ref)  
This returns NodeList (not an array actually) because of which we need to check if returned element here is an instance of HTMLElement in order to do the focus().
*/
const getTabbableElements = (elRef: RefObject<HTMLElement | null>) => {
  // checking for null or undefined using == null.
  if (elRef.current == null) return [];

  // Full Node list of all tabbable elements (note that it's not array because querySelectorAll returns node list)
  return elRef.current.querySelectorAll(
    'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), details, [tabindex]:not([tabindex="-1"])'
  );
};
```

---

#### 6. Why `document.activeElement` doesn't change in `useReturnFocusToTrigger` but changes in `useFocusTrap` on chaning the focus element (by tabbing)?

Before we dive into it, please understand that `document.activeElement` doesn't actively change when you change focus. It just changes only once when component mounts.

**For it to actively change as you press tab, you need to be listening to keyDown event.**

Let's see two hooks first one below the other so we know what's going on.

```ts
const useReturnFocusToTrigger = () => {
  const triggerElement = useRef<Element | null>(null);

  useEffect(() => {
    triggerElement.current = document.activeElement;
    return () => {
      if (
        triggerElement.current instanceof HTMLElement &&
        triggerElement.current != null
      ) {
        triggerElement.current.focus();
      }
    };
  }, []);
};
```

- In the `useReturnFocusToTrigger()` we have `document.activeElement` that gets called only once when modal mounts, and is never called again

- Whereas in `useFocusTrap` it internally uses another hook called `useOnKeyDown` that has code to track event 'onKeyDown' due to which activeElement keeps changing as we tab on different elements.

```ts
const useFocusTrap = (el: RefObject<HTMLElement | null>) => {
  const trapFocus = (e: KeyboardEvent) => {
    if (el.current === null) return;

    const getAllTabbedElements = getTabbableElements(el);

    const firstElement = getAllTabbedElements[0];
    const lastElement = getAllTabbedElements[getAllTabbedElements.length - 1];

    console.log("active element", document.activeElement);
    console.log("first", firstElement);
    console.log("last", lastElement);

    // e.shiftKey = true if it is shift tab
    if (e.shiftKey) {
      if (
        firstElement === document.activeElement && // document.activeElement changes here due to keydown event listening that happens inside useOnKeyDown
        lastElement instanceof HTMLElement
      ) {
        e.preventDefault(); // Very important because the browser tries to focus on an element and we are overriding it with our .focus(), so if we comment this line then browser focus and our focus will cause it to skip first and last elements
        lastElement.focus();
      }
    } else {
      if (
        lastElement === document.activeElement &&
        firstElement instanceof HTMLElement
      ) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

  useOnKeyDown("Tab", trapFocus); // this will also work for shift + Tab

  /* 
  // useKeyDown hook

   useEffect(() => {
     function onKeyDown(e: KeyboardEvent) {
       if (e.key === key) callback();
     }
     document.addEventListener("keydown", onKeyDown);

     return () => {
       document.removeEventListener("keydown", onKeyDown);
     };
   }, [key, callback]);

  */
};
```

---

#### 7. DOM not yet ready `useEffect` gotchas:

**This is very important to understand to be a good react dev**

##### 7a. Why do I need to put getAllElements call inside `useEffect` and not outside?

See these two versions:

_Version 1 - NOT WORKING_

```ts
/* 
useFocusFirstTabbableElement -> Focuses on first tabbable element when the modal gets opened
*/
const useFocusFirstTabbableElement = (elRef: RefObject<HTMLElement | null>) => {
  // OUTSIDE THE USEEFFECT
  const allTabbableElements = getTabbableElements(elRef);

  useEffect(() => {
    const [firstTabbableElement] = allTabbableElements;

    if (firstTabbableElement instanceof HTMLElement)
      firstTabbableElement.focus();
  }, [allTabbableElements]);
};
```

_Version 2 - WORKING_

```ts
/* 
useFocusFirstTabbableElement -> Focuses on first tabbable element when the modal gets opened
*/
const useFocusFirstTabbableElement = (elRef: RefObject<HTMLElement | null>) => {
  useEffect(() => {
    // INSIDE THE USEEFFECT
    const allTabbableElements = getTabbableElements(elRef);
    const [firstTabbableElement] = allTabbableElements;

    if (firstTabbableElement instanceof HTMLElement)
      firstTabbableElement.focus();
  }, [elRef]);
};
```

The version 1 doesn't work because `getTabbableElements(elRef)` exists outside the useEffect. What does this mean?

**UseEffect runs only when the DOM elements are ready** (This is the key point that should be put into your subconsious) - _You can read more about react render phase, commit phase and effect phase (but that's a deep dive topic that's not necessary to understand this for now)_

That means, if `const allTabbableElements = getTabbableElements(elRef)` is put outside the effect then it runs before DOM is ready and will be null, so by the time rest of the code inside effect runs, `firstTabbableElement` will also be null so the result is not the expected one.

Now you might ask, "Oh! I have put `allTabbableElements` as a dependancy. So I expect `useEffect` to run again when DOM elements are ready" - This is another concept to keep in mind why it doesn't work.

Here's the steps to understand:

- First, `getTabbableElements(elRef)` gets called even before DOM elements exist, so you get back empty node list inside `useFocusFirstTabbableElement`

- DOM elements mount, `useEffect` runs for first time with already calculated `allTabbableElements` which was empty node list.

- Now `useEffect` waits to re-run again on dependancy changes i.e, it waits for `allTabbableElements` to change. But that `allTabbableElements` never changes even though DOM elements get mounted because `querySelectorAll` doesn't run again when DOM elements will become available.

- Even when DOM nodes appear, React won’t re-run the effect because React doesn’t magically know the DOM changed - it only re-runs effects when state or props change.

**_NodeList itself doesn’t “update” or trigger re-renders - it’s just a static snapshot_**.

Meaning, the below code never runs the second time which is `getTabbableElements(elRef)` when the DOM gets painted.

```ts
return elRef.current.querySelectorAll(
  "button, [href], select, input, textarea, [tabIndex]:not([tabIndex='-1'])"
);
```

- That means any DOM querying logic (like querySelectorAll, getBoundingClientRect, .focus(), etc.)
  must go inside useEffect, not outside, so that it runs only when DOM elements are available.

---

##### 7b. Why do I need to wrap Modal into it's own component and have `if (!open) return null` call outside of it?

This is also for the same reason as stated in 7a.

Notice, we have hooks in `Modal.tsx` like these ones below:

```ts
useReturnFocusToTrigger();
useFocusFirstTabbableElement(dialogRef);
useFocusTrap(dialogRef);
```

and earlier you had a return statement below these hooks call.

```ts
if (!open) return null;
```

The problem with this is, initially the Modal is not present for react to render so `open` is `false` at which point, the `dialogRef.current` is still null. But once react renders the Modal (DOM gets painted for Modal) and `open` becomes true, the `dialogRef.current` doesn't automatically become available.

In other words, `dialogRef.current` does eventually point to the dialog element once it mounts, but because React does not trigger a re-render when refs change, the hooks that ran before the DOM existed never re-run automatically to pick up that new ref value.

The idea is, if `dialogRef.current` value change AND because of that if component re-renders THEN your check `if (!open) return null` makes sense. But unfortunately that doesn't happen.

**Now you may ask why `dialogRef.current` value change doesn't re-render the component?**

That is because, the harsh truth is, `useRef`' change doesn't re-render the component. Only state or prop change re-renders the component.

The only way this could've worked is, for example, if you had code like this

`useFocusFirstTabbableElement(some state or prop);` instead of `useFocusFirstTabbableElement(dialogRef);` then some state or prop (referenced inside ref) might have re-rendered your component and might have worked as expected.

Now, answering the question: **_Why do I need to wrap Modal into it's own component and have `if (!open) return null` call outside of it?_**

That's because,

- Hooks inside Modal now run only after the modal’s DOM has been inserted into the tree.
- On close, the entire modal unmounts, triggering cleanup from your custom hooks.

**Wrapping the modal ensures that its internal effects only run when the modal is mounted - meaning by the time those effects run, the dialog’s DOM is guaranteed to exist.**

So always make sure, when you do early returns in a component that has some hooks or useEffects, make sure that the dependancy of those hooks are something that would re-render the component (either props or state and not ref). You always must do this check before doing early returns.

---

#### 8. Why do we need ring when outline exists?

We have **three types of boundary styles** in CSS:

- `border` – lives inside the border box and is included in layout (affects width and height).
- `outline` – lives outside the border box and does not affect layout.
- `ring` – Tailwind’s abstraction using box-shadow; also lives outside the box and doesn’t affect layout.

🟥 outline limitations

outline is simple and native, but:

You can only control color, style (solid/dashed/dotted), and thickness.

You can offset it with outline-offset, but that’s just a fixed gap.

You can’t make it glow, blur, or have layered effects.

It always follows the shape of the element’s box, so you can’t make fancy rounded or soft focus styles easily.

Example:

```css
outline: 3px solid #2563eb;
outline-offset: 2px;
```

✅ Simple
❌ No blur, no softness, limited customization

💙 ring (Tailwind’s focus ring)

Under the hood, ring is a box-shadow.
That means you can do things like:

Add a soft glow (blur radius)

Add multiple layers (ring color + ring offset)

Combine inner + outer shadows

Use transparent overlays

Example (Tailwind version):

```ts
<button class="focus:ring-4 focus:ring-blue-500 focus:ring-offset-2">
  Click
</button>
```

Equivalent CSS:

:focus {
box-shadow: 0 0 0 4px #3b82f6, 0 0 0 6px white;
}

✅ Custom thickness (ring-2, ring-4, etc.)
✅ Glowy/soft effect
✅ Can combine with rounded corners perfectly

🔍 TL;DR
Feature outline ring (Tailwind)
Performance Very lightweight Slightly heavier (box-shadow)
Looks native ✅ Yes ❌ No
Rounded corners Not perfect ✅ Matches border-radius
Glow / Blur ❌ No ✅ Yes
Custom layers ❌ No ✅ Yes
Accessibility ✅ Good ✅ Good (if visible enough)

👉 So if you want something clean and minimal → outline is perfect.
👉 If you want something visually rich or branded (like blue glows) → use Tailwind’s ring.

---
