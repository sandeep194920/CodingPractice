## UI - Modal Dialog I, II

`Approx time needed - 20 minutes`

### Things learned

**Modal terminology**

The modal itself is called dialog. The background that covers it which is transparent/ low opacity is called Backdrop (or sometimes Overlay).

**What is the difference between Overlay and Backdrop? Which one to use?**

- People often use both interchangably.
- Both overlay and backdrop means they have a light transparent background that covers the screen and doesn't allow any elements to be clicked on the screen.
  The main difference is, if that background has some kind of foreground on top of that like a dialog then it is called backdrop.

```tsx
<div className="backdrop" />   {/* dims page */}
<div className="modal" />      {/* sits on top */}
```

If it doesn't have a foreground like dialog then it is called overlay. (e.g., a transparent overlay that just captures clicks isn’t a “backdrop”).

So:
✅ All backdrops are overlays.
❌ Not all overlays are backdrops (e.g., a transparent overlay that just captures clicks isn’t a “backdrop”).

[Reference](https://chatgpt.com/share/68c55a0c-f170-800b-a0e4-bd34918a9028)

---

##### Things learnt from [Modal dialog I](https://www.greatfrontend.com/questions/user-interface/modal-dialog)

- react portal (from react-dom)

- `position:fixed` vs `position:absolute`

- hidden attibute on HTML element like `<Section hidden={true}/>` is related to CSS `display` prop on that element. It would only work if display is block and not flex. (See more in details)

We learnt about the hidden attribute in [Accordion question](https://github.com/sandeep194920/CodingPractice/tree/main/08-%5Bui%5D-accordion#2-good-accordion)

- How to prevent closing the dialog onClick on anywhere inside the dialog (except close button)? We can use `onClick={(e) => e.stopPropagation()}` inside the dialog that prevents event bubbling.
  - This is necessary because the backdrop also has onClick close, and dialog also has the close button. When dialog's close button is clicked, it propogates upto the backdrop allowing it to close the modal when we click anything inside the backdrop. This happens due to event bubbling, and we can prevent it by adding `onClick={(e) => e.stopPropagation()}` inside the dialog.

##### Things learnt from [Modal dialog II](https://www.greatfrontend.com/questions/user-interface/modal-dialog-ii?practice=practice&tab=coding)

- aria-modal
- use `useId` for any kind of id for HTML elements, like aria-labelledby and so on as we learnt in Accordion question.
- aria-describedby (see below explanation)

---

### Details

#### Modal I learnings

##### 0. `position:fixed` vs `position:absolute`

For modal backdrop it is better to choose **`positon:fixed`**.

The main difference is that `position: fixed` places an element relative to the browser viewport (meaning it stays in the same spot when the page scrolls), while `position: absolute` places an element relative to its closest positioned ancestor (and moves with the page if that ancestor scrolls).

We dont want scroll to happen and also fixed is always relative to browser's view port which is what we need.

---

**1. Hidden attibute on HTML element like `<Section hidden={true}/>` is related to CSS `display` prop on that element**

I was tripped up as this code related to `hidden` didn't work

```tsx

const Modal: FC<PropsWithChildren<ModalProps>> = ({
  open,
  onClose,
  children,
}) => {
  const modalContent = (
    // hidden didn't work
    <section hidden={!open} className="modal__backdrop" onClick={onClose}>
      <article className="modal__content">{children}</article>
    </section>
  );
```

I thought it would work as we did in accordion question. Later I realized it was due to the fact that I was using `display:flex` on `modal__backdrop` which overrides hidden. Basically `hidden` means we use `display:none`, but since we are using `display:flex` this hidden doesn't work and not apply the `none` prop.

The better way to close a modal is like this

```tsx
const Modal: FC<PropsWithChildren<ModalProps>> = ({
  open,
  onClose,
  children,
}) => {
  if (!open) return null; // bail out here

  const modalContent = (
    <section className="modal__backdrop" onClick={onClose}>
      <article className="modal__content">{children}</article>
    </section>
  );

  return createPortal(modalContent, document.body);
};

export default Modal;
```

That's the reason, using hidden prop is not always safe on HTML elements. We should only use if we are very sure it is not flex or something like grid.

We will learn about accessibility and stuff in next Modal II

---

#### Modal II learnings

`aria-labelledby` → Points to the element(s) that label the dialog (i.e., what it’s called). In your case, that’s the `<h1>` title. Screen readers will announce it as the dialog’s name.

`aria-describedby` → Points to the element(s) that describe the dialog (i.e., extra information about it). In your case, that’s the children content. Screen readers will announce this as the dialog’s description, after the label.`

So we use 4 aria-lables in the modal

- aria-modal="true" // can also be just aria-modal (omit the = true)
- role="dialog"
- aria-labelledby={titleId}
- aria-describedby={contentId}

---

_We wil cover keyboard interactions in modal-III-IV question_
