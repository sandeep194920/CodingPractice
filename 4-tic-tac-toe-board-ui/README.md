`Asked in first round at a company`

`Approx time needed - 15 minutes for generating each board - grid and flex`

## 📝 Tic Tac Toe board (UI only)

### What you learn

- How to create 3D array like this using `Array.from`

```ts
const initBoard = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
```

- How to use CSS grid
- How to use CSS inside tailwind directly

  ```ts
  // Say you have this as your css
  .board {
  display: grid;
  grid-template-rows: repeat(3, 4rem);
  grid-template-columns: repeat(3, 4rem);
  }


  // and you want to do the same in tailwind, you could do

  <div className='grid [grid-template-rows: repeat(3, 4rem)] [grid-template-columns: repeat(3, 4rem)]' />

  // So wrapping your CSS with [] can be done directly in tailwind which I didn't know before
  ```

- How to target last children in CSS
- How important the `aspect-ratio` is?

```ts
// aspect-ratio works like a ratio between width and height, but the browser needs one fixed dimension to calculate the other:

// If you give width, the browser calculates height automatically.

// If you give height, it calculates width.

// If you give both, it uses the explicit values and ignores the ratio.


// Example
  width: 2rem;
  height: 2rem;

// is same as the below

  width: 2rem;
  aspect-ratio: 1/1;

// setting height or width alone and given aspect ratio will calculate the remaining one (width or height that wasn't given) automatically

```

#### Challenges in this problem

- It tests how well we can implement 3x3 board using a grid.

- It tests how well we can implement 3x3 board using a flex box (felt a little challenging as I initially missed `display:flex` property on `.board-flex__row` ).

- It tests how well we can use `Array.from` or whatever like `Array.fill` to dynamically generate cells.
