import { useState } from "react";

type BoardT = Array<null | "X" | "O">;

const initBoard = () => Array(9).fill(null);

const CSSGridBoard = () => {
  const [board, setBoard] = useState<BoardT>(initBoard());
  const [xIsPlaying, setXIsPlaying] = useState(true);

  const winner = determineWinner(board);
  const isGameDraw = !board.includes(null);

  const handleClick = (index: number) => {
    // not required as we are checking this inline in button and disabling it
    //   const cell = board[index];
    // if (cell !== null) return;

    const turn = xIsPlaying ? "X" : "O";

    setBoard((prev) => {
      const newBoard = [...prev];
      newBoard[index] = turn;
      return newBoard;
    });

    setXIsPlaying((prev) => !prev);
    // setMessage(`${turn} marked in ${index}`);
  };

  const getMessage = () => {
    if (winner) {
      return `${winner} won the game!`;
    }

    if (isGameDraw) {
      return `The game is a draw`;
    }

    return `Player ${xIsPlaying ? "X" : "O"} turn`;
  };

  return (
    <div>
      <div aria-live="polite">{getMessage()}</div>
      {(winner || isGameDraw) && (
        <button
          onClick={() => {
            setBoard(initBoard());
          }}
        >
          Reset
        </button>
      )}

      <div className="grid-board">
        {board.map((sq, index) => (
          <button
            // aria-live="polite"
            // aria-label={message !== null ? message : undefined}
            disabled={board[index] !== null || !!winner}
            type="button"
            onClick={() => handleClick(index)}
            key={index}
          >
            {sq}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CSSGridBoard;

/* 

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

 */

const determineWinner = (board: BoardT): null | "X" | "O" => {
  const combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const row of combinations) {
    const [a, b, c] = row;
    if (board[a] !== null && board[a] === board[b] && board[b] === board[c]) {
      return board[a];
    }
  }

  return null;
};
