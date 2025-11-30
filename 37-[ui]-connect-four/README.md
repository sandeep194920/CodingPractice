## [Connect four](https://www.greatfrontend.com/questions/user-interface/connect-four?language=js&tab=coding)

`Approx time - 1h`

**_Little complex to get even with 1 hour. Goal is to get at this so strong that we need to do it less than 45 mins._**

Learn the method to determine the winner in this game, and you (apply the same to any kind of grid/matrix traversal)[https://claude.ai/share/49d48c59-6c98-4b39-9181-103d9e8341aa] like

- Tic-Tac-Toe
- Maze solver
- Flood fill
- Any 2D game

### Things learnt

- Steps to do this game - How to divide the game (Where to start)?

- How determine winner logic works using Delta pattern (same pattern applied to all 4 sides - row, col, left diag, right diag) to find the winner?

  - This pattern can be applied to most of 2D games including Tic-Tac-Toe.

- How to copy (Deep copy during state update) the matrix/2D array.

- How to show some element on hover on screen? (Using onMouseEnter on a `button`)

- `onMouseEnter` and `onMouseLeave`

---

#### Steps to do this game - How to divide the game (Where to start)?

1. Do the board (Game Grid)
2. Players move section
   a. `onMouseEnter`, `onMouseLeave` to show the current player's color on hover
   b. `onPlayerMove` to make to drop coin into the column
   c. winner check

#### How to copy (Deep copy during state update) the matrix/2D array.

```ts
setGrid((grid) => {
      const board = grid.map((row) => [...row]); // this way
      // ...
}

```

---

#### `mouseEnter` vs `mouseOver`

**onMouseEnter**

- Fires when mouse enters the element
- Does NOT bubble (doesn't trigger on child elements)
- Fires once when entering

**onMouseOver**

- Fires when mouse moves over the element OR any of its children
- Bubbles (can trigger multiple times as you move over children)
- Can fire many times as you move inside

##### `onMouseEnter` (Most Common) ✅

**Use for:** Showing/hiding UI elements, tooltips, highlights

```typescript
// Typical use cases:
<button onMouseEnter={() => setShowTooltip(true)}>
  Hover me


<div onMouseEnter={() => setHighlight(true)}>
  Highlight on hover

```

**Why it's preferred:** Simple, fires once, no bubbling issues.

##### `onMouseOver` (Less Common) ⚠️

**Use for:** When you need bubbling behavior or need to track movement over children

###### Example 1: Detecting which child is hovered

```typescript
<div onMouseOver={(e) => {
  console.log('Currently over:', e.target); // Which specific child?
}}>
  Child 1
  Child 2
  Child 3

```

###### Example 2: Tracking mouse movement for effects

```typescript
<div onMouseOver={(e) => {
  // Fires continuously as mouse moves
  updateParticleEffect(e.clientX, e.clientY);
}}>
  Interactive area

```

###### Example 3: Event delegation patterns

```typescript
<table onMouseOver={(e) => {
  if (e.target.tagName === 'TD') {
    highlightCell(e.target);
  }
}}>
  {/* Highlight any cell in any row without per-cell listeners */}

```

**Quick Comparison**

| Scenario                                  | Use This                       |
| ----------------------------------------- | ------------------------------ |
| Show tooltip on hover                     | `onMouseEnter` ✅              |
| Highlight element on hover                | `onMouseEnter` ✅              |
| Dropdown menu appears                     | `onMouseEnter` ✅              |
| Track which child element mouse is over   | `onMouseOver`                  |
| Continuous tracking (parallax, particles) | `onMouseOver` or `onMouseMove` |
| Event delegation on many children         | `onMouseOver`                  |

**Key Differences**

| Feature            | `onMouseEnter`   | `onMouseOver`            |
| ------------------ | ---------------- | ------------------------ |
| **Fires when**     | Entering element | Over element OR children |
| **Bubbles**        | ❌ No            | ✅ Yes                   |
| **Frequency**      | Once per entry   | Multiple times           |
| **Child elements** | Ignores children | Triggers on children     |

**TL;DR**

**95% of the time:** Use `onMouseEnter` ✅

**5% of the time:** Use `onMouseOver` when you specifically need:

- Bubbling behavior
- To know which child is hovered
- Continuous tracking

**For Connect 4:** `onMouseEnter` is perfect! 🎯

---
