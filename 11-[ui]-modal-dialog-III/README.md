## UI - Modal Dialog III

[_First complete the previous question - Modal I, II_](https://github.com/sandeep194920/CodingPractice/tree/main/11-%5Bui%5D-modal-dialog-I%2CII)

`Approx time needed - 20 minutes`

### Things learned

- How to close the modal.
- mousedown vs MouseUp vs Click

1. Using Escape key
2. Clicking outside the modal (we already saw a solution for this in previous question), but in this we will see more robust and clean one.

There are two new interactions to support for closing the dialog: (1) Hitting the Escape key, and (2) Clicking outside the dialog contents.

To close the dialog, we simply have to call the onClose callback, so it's a matter of when to trigger that callback.

##### 1. Hitting the Escape key

We create a generic hook called `useOnKeyDown` that takes in a string key representing the keyboard key to respond to, and a callback to trigger when the key is pressed.

The hook adds an event listener for the keydown event to document. Within the event listener callback, check if event.key corresponds to the key argument, and trigger the callback argument if so.

To use the hook, call it with the following argument: useOnKeyDown('Escape', onClose).

So the hook looks like this:

```ts
const useOnKeyDown = (key: string, callback: VoidFunction) => {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === key) callback();
    }
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [key, callback]);
};
```

I initially thought we might not need useEffect, and just need `document.addEventListener("keydown", onKeyDown);`, but then I realized if the component is unmounted we need to cleanup the attached event listener, hence we need `useEffect` and a cleanup function with in that.

---

##### 2. Clicking outside the dialog contents

The tricky part of implementing this logic is to determine whether the click happened inside or outside the dialog contents body.

**Let's talk about some bad solutions first**

Initially I thought we could just add an event listener on backdrop to close the modal, but since the modal-dialog is inside the backdrop it would also close.

The workaround for this was the following:

```tsx
<section
  // Aria lables
  aria-modal="true" // can also be just aria-modal (omit the = true)
  role="dialog"
  aria-labelledby={titleId}
  aria-describedby={contentId}
  className="modal__backdrop"
  onClick={onClose} // ----Line 1
>
  <article
    ref={dialogRef}
    onKeyDown={handleKeyDown}
    className="modal__content"
    onClick={(e) => e.stopPropagation()} // prevent bubbling (can be a solution but not reusable)
  >
    <h1 id={titleId}>{title}</h1>
    <span id={contentId}>{children}</span>
  </article>
</section>
```

stop propogation was required because onClick or click in general, would propogate or event bubble up. When I click inside the modal anywhere, that click would propogate to top until Line 1 (on backdrop) and calls onClick={onClose} (line 1) which would close the modal.
So I had to use `e.stopPropogation()` on `modal-dialog` where it would stop the event propogating till backdrop.

```bash
A few quick things here to clear some confusions before we move on.

- A `mouse-down` happens when we press mouse down
- A `mouse-up` happens when mouse is released up after pressing down.
- A `click` happens when both mouse down + mouse up (full cycle of down + up) happens

NOTE: All 3 events, mouse-down, mouse-up and click BUBBLE UP, and not just the click event.
```

Let's continue: Why above solution is bad? Because here we are assuming that backdrop covers whole screen. But what if that is not the case (for a tool-tip for example, there's no backdrop most of the times). We still should be able to click anywhere outside the tool-tip and it should close the tool-tip.

**Let's now talk about a good recommended solution - which is a little tricky but fun to understand.**

First thing that needs to be understood is, in HTML everything is Node, and that Node contains a method called `.contains` that can be used to determine if the node is a decendant of a given node.

**The solution goes like this:**

_Step 1_ - We click anywhere on the screen, and the mousedown or touchstart (for touch screen) that must be recorded (not click event, we'll see why in a second).

_Step 2_ - We need to capture the element the mousedown was done on, and we see if there's a dialog node that's inside the DOM as descendant where we mousedowned/tochStarted. We could use useRef on dialog to have a reference to our dialog.

_Step 3_ - We close the modal-dialog if the step 2 conditions satisfy.

Like this

```tsx
const dialogRef = useRef<HTMLElement>(null);

// ...
const modalContent = (
  <section>
    <article
      ref={dialogRef} // here
      className="modal__content"
    >
      <h1 id={titleId}>{title}</h1>
      <span id={contentId}>{children}</span>
    </article>
  </section>
);

const useOnClickOutside = (
  dialogRef: RefObject<HTMLElement | null>,
  callback: VoidFunction
) => {
  useEffect(() => {
    const clickOutside = (e: MouseEvent | TouchEvent) => {
      /* 
dialogRef.current.contains(e.target) is what we need to check, but for this to be true, dialogRef.current must be an instance of Node and also not be null, 
hence we have 3 conditions here
*/

      if (
        e.target instanceof Node &&
        dialogRef.current !== null &&
        !dialogRef.current.contains(e.target)
      ) {
        callback();
      }
    };

    document.addEventListener("mousedown", clickOutside);
    document.addEventListener("touchstart", clickOutside);

    return () => {
      document.removeEventListener("mousedown", clickOutside);
      document.removeEventListener("touchstart", clickOutside);
    };
  }, [dialogRef, callback]);
};
```

That's pretty much it, but we need to answer a question that we left off above. In Step 1, we said the
document needs to listen to `mousedown` or `touchstart` like this `document.addEventListener("mousedown", clickOutside);` or `document.removeEventListener("touchstart", clickOutside);`

and not click `document.removeEventListener("click", clickOutside);`

WHY?

**Case 1: Using click for outside-click detection**

document -> CLICK listener (close modal)

     button -> CLICK listener (open modal) -> Inside the document _(if click happens here it bubbles up to the document.addEventListener('click))_

You click the “Open Modal” button.

The button’s onClick runs → modal mounts.

But the same click event is still bubbling upward.

It reaches document, which already has a click listener to close the modal.

That listener thinks: “This click is outside the modal” → closes it immediately.
➡️ Modal flashes open and closes right away.

**Case 2: Using mousedown for outside-click detection**
document -> MOUSEDOWN listener (close modal)

button -> CLICK listener (open modal)

You click the “Open Modal” button.

First, a mousedown fires, but at this time there’s no modal yet → the document listener isn’t triggered.

Then the mouseup → click sequence happens on the button.

The button’s onClick runs → modal mounts.

Later, when you actually click outside the modal (new mousedown), the document listener sees it and closes the modal correctly.
➡️ No accidental close on the same event that opened it.

🔑 The magic is in the timing difference:

mousedown happens before the modal mounts → so the listener doesn’t catch that initial open.

Future mousedowns outside will be caught as intended.

**[For more details, refer this Chat GPT thread.](https://chatgpt.com/share/68c5cdfb-4258-800b-9ff0-96555d682767)**

---
