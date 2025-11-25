`Approx time needed - 15 minutes for generating each board - grid and flex`

## 📝 Tic Tac Toe board (UI only)

### What you learn

- How to create 3D array like this using `Array.from`
- What is `min()` function of font-size (mentioned at last)

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

### Important - There's also one way to remove extra borders without actually targeting nth child or last row

That is to do it using margins which I didn't know earlier. I learnt after seeing this tic-tac-toe game from [react-docs](https://react.dev/learn/tutorial-tic-tac-toe)

Do `margin-right:-1px` and `margin-top:1px` as shown in `15-[ui]-tic-tac-toe-react-docs` question (or as shown below for both GRID and FLEX)

```tsx
import "./App.css";

const BOARD_SIZE = 3;

let initBoard = [
  ["x", "x", "x"],
  ["x", "x", "x"],
  ["x", "x", "x"],
];

// OR

initBoard = Array.from({ length: BOARD_SIZE }, () =>
  Array.from({ length: BOARD_SIZE }, () => "x")
);

function App() {
  return (
    <div className="container">
      <CSSGridBoard board={initBoard} />
      <CSSFlexBoxBoard board={initBoard} />
    </div>
  );
}

export default App;

interface BoardProps {
  board: string[][];
}

const CSSFlexBoxBoard = ({ board }: BoardProps) => {
  return (
    <div className="flex-board">
      {board.map((row, rowIndex) => (
        <div className="flex-board__row" key={rowIndex}>
          {row.map((sq, colIndex) => (
            <button key={colIndex}>{sq}</button>
          ))}
        </div>
      ))}
    </div>
  );
};

const CSSGridBoard = ({ board }: BoardProps) => {
  return (
    <div className="grid-board">
      {board.map((row) =>
        row.map((sq, colIndex) => <button key={colIndex}>{sq}</button>)
      )}
    </div>
  );
};
```

```css
.container {
  margin: 10rem;
  display: flex;
  gap: 5rem;
}

/* GRID Board */
.grid-board {
  display: grid;
  grid-template-columns: repeat(3, 4rem);
  grid-template-rows: repeat(3, 4rem);
  width: fit-content;
}

.grid-board button {
  background-color: transparent;
  border: 1px solid gray;
  font-size: 1.5rem;
  margin-bottom: -1px;
  margin-right: -1px;
  font-size: min(
    48px,
    2vw
  ); /*min function helps adapt font size based on available width. For small screens 48px is the fallback, and for large screens 2% of view port*/
}

/* FLEX Board */
.flex-board__row button {
  font-size: 1.5rem;
  width: 4rem;
  aspect-ratio: 1/1;
  border: 1px solid gray;
  background-color: transparent;
  margin-right: -1px;
  margin-bottom: -1px;
  font-size: min(
    48px,
    2vw
  ); /*min function helps adapt font size based on available width. For small screens 48px is the fallback, and for large screens 2% of view port*/
}
```
