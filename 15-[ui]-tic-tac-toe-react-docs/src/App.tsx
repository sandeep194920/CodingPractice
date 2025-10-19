import { useState } from "react";
import "./App.css";

type BoardState = (string | null)[];
type History = BoardState[];
type Winner = "X" | "O" | null;

export default function Game() {
  const [history, setHistory] = useState<History>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  const handlePlay = (nextSquares: BoardState) => {
    const newHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(newHistory);
    setCurrentMove(newHistory.length - 1);
  };

  const jumpsTo = (index: number) => {
    setCurrentMove(index);
  };

  const moves = history.map((_, move) => (
    <li key={move}>
      <button onClick={() => jumpsTo(move)}>Timeline {move}</button>
    </li>
  ));

  return (
    <>
      <div className="game">
        <Board squares={currentSquares} onPlay={handlePlay} xIsNext={xIsNext} />
        <div className="game-info">
          <ul>{moves}</ul>
        </div>
      </div>
    </>
  );
}

interface BoardI {
  squares: BoardState;
  onPlay: (board: BoardState) => void;
  xIsNext: boolean;
}

function Board({ squares, onPlay, xIsNext }: BoardI) {
  const handleClick = (index: number) => {
    if (squares[index] || !!winner) return;

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[index] = "X";
    } else {
      nextSquares[index] = "O";
    }
    onPlay(nextSquares);
  };

  const winner = calculateWinner(squares);

  let status;

  if (winner) {
    status = "Winner " + winner;
  } else {
    status = "Next player is " + (xIsNext ? "X" : "O");
  }

  return (
    <div>
      <h1>{status}</h1>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </div>
  );
}

function Square({
  value,
  onSquareClick,
}: {
  value: BoardState[number];
  onSquareClick: () => void;
}) {
  return (
    <button onClick={onSquareClick} className="square">
      {value}
    </button>
  );
}

const calculateWinner = (squares: (string | null)[]): Winner => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const line of lines) {
    const [a, b, c] = line;

    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a] as Winner;
    }
  }
  return null;
};
