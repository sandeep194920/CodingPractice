import { useState } from "react";

type BoardValues = "X" | "O" | null;

type BoardT = BoardValues[][];

const initBoard = (size: number): BoardT =>
  Array.from({ length: size }, () => Array.from({ length: size }, () => null));

const gridStyles = (size: number) => {
  const style = `repeat(${size}, 4rem)`;

  return { gridTemplateRows: style, gridTemplateColumns: style };
};

const Board = ({ size }: { size: number }) => {
  const [board, setBoard] = useState<BoardT>(initBoard(size));
  const [xIsPlaying, setXIsPlaying] = useState(true);
  const [winner, setWinner] = useState<BoardValues>(null);

  const handleClick = (rowIndex: number, colIndex: number) => {
    // not required as we are checking this inline in button and disabling it
    //   const cell = board[index];
    // if (cell !== null) return;

    const turn = xIsPlaying ? "X" : "O";

    setBoard((prev) => {
      const newBoard = prev.slice();
      newBoard[rowIndex][colIndex] = turn;
      return newBoard;
    });

    setXIsPlaying((prev) => !prev);

    const newBoard = [...board.map((row) => row.map((sq) => sq))];
    newBoard[rowIndex][colIndex] = turn;
    const winner = determineWinner(newBoard, rowIndex, colIndex, turn, size);

    if (winner) {
      setWinner(winner);
    }

    // Check who the winner is

    // setMessage(`${turn} marked in ${index}`);
  };

  // const getMessage = () => {
  //   if (winner) {
  //     return `${winner} won the game!`;
  //   }

  //   if (isGameDraw) {
  //     return `The game is a draw`;
  //   }

  //   return `Player ${xIsPlaying ? "X" : "O"} turn`;
  // };

  return (
    <div>
      {/* <div aria-live="polite">{getMessage()}</div> */}
      {/* {(winner || isGameDraw) && (
        <button
          onClick={() => {
            setBoard(initBoard());
          }}
        >
          Reset
        </button>
      )} */}

      {winner && <p>The winner is: {winner}</p>}

      <div style={gridStyles(size)} className="grid-board">
        {board.map((row, rowIndex) =>
          row.map((sq, colIndex) => (
            <button
              disabled={board[rowIndex][colIndex] !== null}
              type="button"
              onClick={() => handleClick(rowIndex, colIndex)}
              key={colIndex}
            >
              {sq}
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default Board;

const determineWinner = (
  board: BoardT,
  rowIndex: number,
  colIndex: number,
  turn: "X" | "O",
  boardSize: number
) => {
  let winner = null;
  /* 
  [
  00, 01, 02, 03
  10, 11, 12, 13
  20, 21, 22, 23
  30, 31, 32, 33
  ]

  can also be 
    [
  x                  x                x                 x
 [00, 01, 02, 03], [10, 11, 12, 13], [20, 21, 22, 23], [30, 31, 32, 33]

  ]

  Row -> 
  
  
  */

  // Check vertical column

  // 00, 10, 20, 30
  // 01, 11, 21, 31 -> notice, right side increases. left side (rowIndex) stays the same
  // we need to check only the current column. Say user inserted at (1,2) -> check 02, 12, 22, 32

  // board[][colIndex].every(col => )

  // let verticalEntries = 0;
  // for (let row = 0; row < boardSize; row++) {
  //   if (board[row][colIndex] === turn) {
  //     verticalEntries++;
  //   }
  // }

  // winner = verticalEntries === boardSize ? turn : winner;
  const isVerticalMatch = board.every((row) => row[colIndex] === turn);

  // Check horizontal row
  const isHorizontalMatch = board[rowIndex].every((col) => col === turn);

  // Check left top to bottom right diag

  const leftDiagonalMatch =
    rowIndex === colIndex && board.every((row, rIndex) => row[rIndex] === turn);

  // Check right top to bottom left diag
  const rightDiagonalMatch =
    rowIndex + colIndex === boardSize - 1 &&
    board.every((row, index) => row[boardSize - 1 - index] === turn);

  if (
    isVerticalMatch ||
    isHorizontalMatch ||
    leftDiagonalMatch ||
    rightDiagonalMatch
  ) {
    winner = turn;
  }

  return winner;
};
