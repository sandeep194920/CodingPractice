`Approx time needed - 30 minutes`

Asked at `Amazon`

## 📝 Accordion

This question involves the following:

- BadAccordion - A bad way to design accordion, and I've written the reasons below for why it is bad even though the implementation looks simple

- Accordion I - Designing the accordion component that can work with any data, and also state manipulation wouldn't be costly unlike in BadAccordion

- Accordion II - **Accessibility**. Accordion component has more aria rules that we must follow, and we can learn about all those in AccordionII implementation

- Accordion III - **Keyboard controls**. A good accessible component not only should guide the users through aria-\*, but also should be able to control the component through key press. We can implement that here. This would make a complete robust accordion.

---

### Learnings

- `Set` datastructure is good instead of array for accordions
- `A11y`
- Keyboard controls
- `hidden` prop can be used on all HTML elements like div for example
- How to design an up-arrow and down-arrow using CSS
- :not(:last-child) - You don't need `<hr>`, you could do `border-bottom`
- circular controls (from last index, pressing down must go to 1. From first index, pressing up should go to last index)

---

#### 1. BAD Accordion

❌ Why this is a Bad Accordion

**1. State is tightly coupled with data**

Each item in initData has an isExpanded property baked in.
This makes the data impure — you can’t reuse it elsewhere without carrying unnecessary UI state.

**2. Inefficient toggle logic**

On every click, you use .map() to iterate over all items (O(n)), even though only one item actually changes.
For large lists, this leads to unnecessary computations.

**3. Unnecessary object re-creations**

Every time you toggle, a new object is created for each list item.
React’s reconciliation is efficient, but this still causes avoidable renders.

**4. Harder to scale**

Works fine for 3–10 items, but if you had 1,000 FAQ items or nested accordions, performance would degrade.

**5. Limited reusability**

Since state and data are mixed, you can’t pass in plain data (just title, contents) — it must include isExpanded.
This makes the component less generic and harder to reuse.

**6. Not declarative enough**

Parent components can’t easily control which accordion is open, since the state lives inside the data structure.
Hard to lift state up or sync it with external logic.

**👉 In short:**

Tightly coupled state + data → bad separation of concerns.
O(n) updates → inefficient.
Poor scalability & reusability → less flexible for real-world use.

---

#### 2. Good Accordion

**1. We use a Set to track accordion expanding and collapsing**

Why Set? As mentioned above in BadAccordion, if we map all elements to set the accordion state then it will be o(n). We can use a Set to make this operation O(1).

The idea is, if accordion value exists in Set then we can expand it, else it needs to be collapsed.

**2. How to set state of a Set?**

This might not be directly related to this question and it can clear up my confusion in general related to setting the states of primitive vs reference types.

The biggest confusion I had is, when should I copy the state and then update it, vs when should I do it directly in place.

Look at the below example which WOULD NOT WORK, as I am mutating the original Set.

```tsx
const Accordion: FC<AccordionProps> = ({ sections }) => {
  const [expanded, setExpanded] = useState(new Set<string>());

  const toggleAccordion = (value: string) => {
    setExpanded((prev) => {
      if (prev.has(value)) {
        prev.delete(value);
      } else {
        prev.add(value);
      }

      return prev;
    });
  };
};
```

Set or array or object or map, all these datastructures are reference based. Meaning, if we update any value inside that directly the react doesn't know it should re-render as THE REFERENCE OF THESE DS remains the same on updating a value inside it. Hence the above doesnt work.

If we add or delete to prev (which is original Set), then the reference of Set still remains same, and hence we need to change that reference. For that reason, it is essential to create a new Set and then change value in that and return it. So remember this,

"Do I need to copy/clone the state before I update? If I use reference based DS like Object, Array, Set and so on then yes because the value change in that DS alone doesn't change the reference of that state. For react to re-render we need to change the reference of that state". Hence below is how it needs to be done.

```ts
const toggleAccordion = (value: string) => {
  setExpanded((prev) => {
    /* DOESN'T WORK as we are not mutating the Set to re-render */

    /* WORKS as we are creating a new copy of set */
    const updatedValues = new Set(prev);

    /* I can't do ternary because delete or add doesnt return anything */
    if (updatedValues.has(value)) {
      updatedValues.delete(value);
    } else {
      updatedValues.add(value);
    }

    return updatedValues;
  });
};
```

**3. Hide the div or any HTML semantically**

Till now I used to do this

```ts
  {isExpanded && <div>
        <p>{contents}</p>
  <div/>}
```

But on any HMTL tag, we have a prop called hidden that we can make use of. That's more semantic so keep that in mind.

```ts
<div hidden={!expanded.has(value)}>
  <p> {contents}</p>
</div>
```

**4. Good Aria rules - mandatory to learn**

A good FE will defenitely not neglect aria rules. We should comply all the rules and best practices for making the accordion accessible. So these are some mandatory steps to consider.

###### a. Add type="button" to button

- I did initially think it was redundant to add this to a button, but then I learned that the default type on button is submit which is used in the form. So this is mandatory to make sure this is just a button and not a submit button.

```tsx
<button type="button" />
```

- `aria-hidden={true}` must be set on icon that doesn't convey anything. This will prevent screen readers from announcing it like "span".

- `aria-expanded={true}` or `aria-expanded={false}` must be set dynamically on button of accordion which tells the state of accordion header.

- `aria-controls={panelId}` must be set on button which is linked to panel (content) by using `aria-labelledby={headerId}` on the panel.

- In order to reverse link these two, both button and panel should have id defined on them.

```tsx

// header
<button
  type="button"
  id={headerId} // <--
  onClick={() => toggleAccordion(acc.value)}
  className="accordion-button"
  aria-expanded={expanded.has(value)}
  aria-controls={panelId} // <--  It controls the panel that has id set to panelId
>
  <span className="accordion-button__title">{title}</span>
  <span
    aria-hidden={true}
    className={`accordion-button__arrow ${
      expanded.has(value) && "accordion-button__arrow--rotated"
    }`}
  />
</button>

// panel
  <div
    role="region"
    aria-labelledby={headerId}  // <-- It is controlled by element that has id called headerId
    id={panelId} // <-- aria-controls of header is linked to this
    hidden={!expanded.has(value)}
  >
    <p> {contents}</p>
  </div>
```

Always use `useId` from react to get the unique id.

`useId()` generates a unique ID per **React render tree.**

This ensures that if you render multiple Accordion components on the same page, the header/panel IDs do not collide.

So even if value is "html" in multiple accordions, the IDs will be unique like:

```
Accordion1: id="accordion1-header-html" / id="accordion1-panel-html"

Accordion2: id="accordion2-header-html" / id="accordion2-panel-html"
```

Without useId(), if two accordion components have the same values, screen readers might get confused because aria-labelledby or aria-controls references would not be unique.

```
header button -> Should have `aria-controls` set to say XYZ
panel content -> should have `aria-labelledby` set to that XYZ, and also should have a unique id to represent the panelId.
```

- Set `role="region"`

**5. Purpose of role="region"**

**Landmark for navigation:**

Screen reader users can jump between regions quickly. It’s like giving a “bookmark” for a chunk of content.

**Context & labeling:**

When combined with aria-labelledby, the screen reader announces the region’s label.
Example:

```tsx
<div role="region" aria-labelledby="faq-header-1">
  <p>Accordion content here...</p>
</div>
```

The screen reader will say something like:
"Region: HTML" before reading the content. This adds context, which is critical for accessibility.

**Is it only for accordions?**

No, you can use it for any self-contained, labeled section of a page, such as:

Sidebars
Search panels
Tabs
Modal content
FAQ sections (like your accordion)

The key is that the region needs a label (aria-labelledby) and is a logical grouping of content.

Why it’s used in an accordion

Each accordion panel is a collapsible, meaningful content section.

Without role="region", screen readers may just read the content inline, without signaling it’s part of a collapsible section.

With it + aria-labelledby, the user knows:
“This is the HTML panel under FAQ” and can jump to it if needed.

💡 TL;DR:
`role="region"` is not exclusive to accordions, but it’s a best practice whenever you have a labeled, significant section of content that might not be obvious from HTML alone.

---

#### 3. How to make accordion fully accessible? By adding Keyboard events (WAI - Web accessibility Initiative)

**1. Keydown vs Keypress**

Don't use Keypress (as it is deprecated). Always use Keydown.

**keypress** works only for keys that result in visible characters being typed. It wouldn't affect arrows, home, end keys and must not be used as it is inconsistent.

For these reasons, we should be using the keydown event. We'll add a keydown event listener to the root <div> element.

**2. `document.activeElement` is used to track the current focused element. We can use this along with keydown**

This is a simple `useEffect` that you can use to test focused element

```tsx
const focusElement = () => {
  console.log("Focused element", document.activeElement);
};

useEffect(() => {
  document.addEventListener("focusin", focusElement);

  return () => {
    document.removeEventListener("focusin", focusElement);
  };
}, []);
```

Or you can also narrow this down to a specific container - If you want to listen to only specific container and not the whole Document.

```tsx
const containerRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  const updateFocus = () =>
    console.log("Focused element", document.activeElement);
  const container = containerRef.current;

  container?.addEventListener("focusin", updateFocus);

  return () => container?.removeEventListener("focusin", updateFocus);
}, []);
```

**3. `data-accordion-value` can be used on header button to help keydown**

What is data-\*?

1. What data-accordion-value is

```tsx
<button
  data-accordion-value={value}
>
```

This is a custom data attribute.
Anything that starts with data- is valid HTML5.
You can store extra info in it without breaking HTML validity.
Here, data-accordion-value is storing the value of this accordion section, so you can later read it in JS:
`const value = event.currentTarget.dataset.accordionValue;`

dataset is a built-in DOM API that automatically maps data-\* attributes to camelCase keys.

You can also do `.getAttributes('data-accordion-value')` on activeElement. Example : `document.getActiveElement.getAttributes('data-accordion-value')`

This would actually give you back the element if it has `data-accordion-value` on the element.

**2. Can you use any random attribute?**

No, not really.
HTML only allows specific attributes by spec. Random attributes (like <button foo="bar">) are invalid HTML.
To safely store custom data, you must use data-\*:

```tsx
<div data-my-custom-info="123"></div>
```

This is valid and accessible via JS:

const el = document.querySelector('div');
console.log(el?.dataset.myCustomInfo); // "123"

✅ Rule of Thumb

Any attribute that doesn’t exist in HTML spec → prefix with data-.
Use camelCase when accessing via dataset (data-accordion-value → dataset.accordionValue).

**The other thing to note is, tab and shift+tab works out-of-the-box in any browser and we need not code them. The only keys we need to take care of are ArrowUp, ArrowDown, Home, End**

**3. How to rotate? I mean if the control reaches -1, then it should become last element of array. If the control goes out of bounds then it should reach index 0**

This is a common interview question and a common pattern that can be seen in many problems like pagination, image carousel and so on. This can be achieved using mod. Practice this.

```ts
// Say arr = [1,2,3]

/* I am on element 2 (index 1) and press LEFT ARROW, I should go to 1, and pressing left again should go to 3. I can do */

((index - 1 + arr.length) %
  arr.length(
    // this takes me to 2 (index 2)

    /* I am on element 2 (index 1) and press RIGHT ARROW, I should go to 3, and pressing right again should go to index 0. I can do */

    index + 1
  )) %
  arr.length;
```
