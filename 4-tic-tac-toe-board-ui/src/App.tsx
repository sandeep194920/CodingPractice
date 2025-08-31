import { useState } from "react";
import "./App.css";

const BOARD_SIZE = 3;

let initBoard = [
  ["x", "x", "x"],
  ["x", "x", "x"],
  ["x", "x", "x"],
];

// OR

initBoard = Array.from({ length: BOARD_SIZE }, () =>
  Array.from({ length: BOARD_SIZE }, () => "X")
);

function App() {
  const [board] = useState(initBoard);

  return (
    <>
      {/* Using CSS  */}
      <CSSGridBoard board={board} />

      {/* Using tailwind  */}
      <TailwindGridBoard board={board} />

      {/* Using CSS  */}
      <CSSFlexBoxBoard board={board} />
    </>
  );
}

export default App;

const CSSGridBoard = ({ board }: { board: string[][] }) => {
  return (
    <div className="text-center my-4">
      <h3>CSS Grid board</h3>
      <article className="board">
        {board.map((row, rowIndex) => {
          return row.map((cell, colIndex) => (
            <button className="board__cell" key={`${rowIndex}${colIndex}`}>
              {cell}
            </button>
          ));
        })}
      </article>
    </div>
  );
};

const TailwindGridBoard = ({ board }: { board: string[][] }) => {
  return (
    <div className="text-center my-10">
      <h3>Tailwind Grid board</h3>
      <article className="grid [grid-template-rows:repeat(3,4rem)] [grid-template-columns:repeat(3,4rem)] border border-gray-400 w-fit m-auto">
        {board.map((row, rowIndex) => {
          return row.map((cell, colIndex) => (
            <button
              className="border-r border-b border-gray-400 text-2xl nth-[3n]:border-r-0  nth-[n+7]:border-b-0"
              key={`${rowIndex}${colIndex}`}
            >
              {cell}
            </button>
          ));
        })}
      </article>
    </div>
  );
};

const CSSFlexBoxBoard = ({ board }: { board: string[][] }) => {
  return (
    <div className="text-center">
      <h3>CSS Flex board</h3>
      <article className="board-flex">
        {board.map((row, rowIndex) => {
          return (
            <div className="board-flex__row" key={rowIndex}>
              {row.map((cell, colIndex) => (
                <button className="board-flex__cell" key={colIndex}>
                  {cell}
                </button>
              ))}
            </div>
          );
        })}
      </article>
    </div>
  );
};
