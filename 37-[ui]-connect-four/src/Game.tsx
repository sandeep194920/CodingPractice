import { useState } from "react";

const ROWS = 6;
const COLS = 7;
const COUNT_TO_WIN = 4;

const PLAYERS = ["red", "yellow"] as const;

type Player = (typeof PLAYERS)[number];

type CurrentPlayerIndex = number;

const EMPTY_CELL = "#fff";

const PLAYER_TOKENS: Record<Player, string> = {
  red: "#d9313d",
  yellow: "#fdc601",
};

type GameGridCellValue = Player | null;

type GameGridType = Array<Array<GameGridCellValue>>;

const getInitialGrid = () => {
  return Array(ROWS)
    .fill(null)
    .map(() => Array(COLS).fill(null));
};

const GameGrid = ({ grid }: { grid: GameGridType }) => {
  return (
    <div
      className="grid"
      style={{
        gridTemplateRows: `repeat(${ROWS}, var(--grid-item-size))`,
        gridTemplateColumns: `repeat(${COLS}, var(--grid-item-size))`,
      }}
    >
      {grid.map((rows, rowIndex) =>
        rows.map((cellValue, colIndex) => (
          <div
            className="grid-item"
            key={`${rowIndex}-${colIndex}`}
            style={{
              backgroundColor:
                cellValue !== null ? PLAYER_TOKENS[cellValue] : EMPTY_CELL,
            }}
          />
        ))
      )}
    </div>
  );
};

type PlayersMoveSectionT = {
  availableColumns: Set<number>;
  onColumnHover: (index: number | null) => void;
  currentColumn: number | null;
  currentPlayer: Player;
  gameHasEnded: boolean;
  onPlayerMove: (columnIndex: number) => void;
};

const PlayerMoveSection = ({
  availableColumns,
  onColumnHover,
  currentColumn,
  currentPlayer,
  gameHasEnded,
  onPlayerMove,
}: PlayersMoveSectionT) => {
  return (
    <div
      className="player-move-section"
      onMouseLeave={() => onColumnHover(null)}
    >
      {Array.from({ length: COLS }, (_, i) => (
        <button
          disabled={!availableColumns.has(i) || gameHasEnded}
          key={i}
          aria-label={`Column ${i + 1}`}
          className="player-move-column"
          onMouseEnter={() => onColumnHover(i)}
          style={{
            backgroundColor:
              currentColumn === i && !gameHasEnded
                ? PLAYER_TOKENS[currentPlayer]
                : undefined,
          }}
          onClick={() => onPlayerMove(i)}
        />
      ))}
    </div>
  );
};

const WinnerSection = ({ winner }: { winner: Player }) => {
  return (
    <div
      className="winner-token"
      style={{ backgroundColor: PLAYER_TOKENS[winner] }}
    >
      WON
    </div>
  );
};

const Game = () => {
  // State to handle game grid state.
  const [grid, setGrid] = useState<GameGridType>(() => getInitialGrid());

  //   current player index
  const [currentPlayerIndex, setCurrentPlayerIndex] =
    useState<CurrentPlayerIndex>(1);

  const [winner, setWinner] = useState<Player | null>(null);

  const [currentColumn, setCurrentColumn] = useState<number | null>(null);

  const onPlayerMove = (column: number) => {
    let rowToPlace = ROWS - 1;

    const player = PLAYERS[currentPlayerIndex];

    const newGrid = grid.map((row) => [...row]);

    while (newGrid[rowToPlace][column] !== null) {
      rowToPlace--;
    }

    newGrid[rowToPlace][column] = player;

    const playerWon = checkIfPlayerWon(newGrid, rowToPlace, column, player);

    if (playerWon) {
      setWinner(player);
    }

    setCurrentPlayerIndex((prev) => {
      return (prev + 1) % PLAYERS.length;
    });

    setGrid(newGrid);
  };

  const movesSoFar = grid.reduce(
    (count, row) => count + row.filter(Boolean).length,
    0
  );

  const isDraw = ROWS * COLS === movesSoFar && winner !== null;

  const gameHasEnded = isDraw || winner !== null;

  // Checking first row should be sufficient here - If they are filled then
  const availableColumns = new Set(
    grid[0]
      .map((piece, index) => (piece === null ? index : -1))
      .filter((item) => item !== -1)
  );

  function onRestart() {
    setGrid(getInitialGrid());
    setCurrentColumn(null);
    setCurrentPlayerIndex(0);
    setWinner(null);
  }

  return (
    <div className="app">
      <PlayerMoveSection
        availableColumns={availableColumns}
        onColumnHover={setCurrentColumn}
        currentColumn={currentColumn}
        currentPlayer={PLAYERS[currentPlayerIndex]}
        gameHasEnded={gameHasEnded}
        onPlayerMove={onPlayerMove}
      />
      <GameGrid grid={grid} />
      <button onClick={onRestart} className="reset-button">
        Reset
      </button>
      {isDraw && <h2>DRAW</h2>}
      {winner != null && <WinnerSection winner={winner} />}
    </div>
  );
};

export default Game;

const checkIfPlayerWon = (
  grid: GameGridType,
  row: number,
  col: number,
  player: Player
): boolean => {
  const DIRECTION_DELTAS = [
    [0, 1], // row
    [1, 0], // col
    [1, 1], // left diagonal
    [1, -1], // right diagonal
  ];

  return DIRECTION_DELTAS.some(([deltaRow, deltaCol]) => {
    let consecutiveDiscs = 0;
    let maxConsecutiveDiscs = 0; // optional. If you don't want to use it, just break out of for-loop (I've commented out below)

    // Reason -COUNT_TO_WIN + 1 instead of 1-COUNT_TO_WIN is to show the fact that, we are doing 1 less than COUNT_TO_WIN
    // on both left and right sides OR top and botton sides. Same applies for i<=COUNT_TO_WIN - 1 instead of i<COUNT_TO_WIN
    for (let i = -COUNT_TO_WIN + 1; i <= COUNT_TO_WIN - 1; i++) {
      const currRow = row + i * deltaRow;
      const currCol = col + i * deltaCol;

      if (grid[currRow]?.[currCol] === player) {
        consecutiveDiscs += 1;
        maxConsecutiveDiscs = Math.max(consecutiveDiscs, maxConsecutiveDiscs);
        console.log({ maxConsecutiveDiscs });
        // if (consecutiveDiscs >= COUNT_TO_WIN) break;
      } else {
        consecutiveDiscs = 0;
      }
    }
    // return consecutiveDiscs >= COUNT_TO_WIN;
    return maxConsecutiveDiscs >= COUNT_TO_WIN;
  });
};
