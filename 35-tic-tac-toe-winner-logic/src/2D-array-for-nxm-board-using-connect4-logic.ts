/* 
This is done by connect-four method. First refer to https://github.com/sandeep194920/CodingPractice/tree/main/37-%5Bui%5D-connect-four

*/

const BOARD_SIZE = 3;

/* Board will be represented in 2D array 

[[0, 1, 2],
 [3, 4, 5],
 [6, 7, 8]], 
 
 so it will be [[0, 1, 2], [3, 4, 5], [6, 7, 8]]

*/
let boardVerticalWinner = [
  ["X", null, null],
  ["X", null, null],
  ["X", null, null],
];

let boardHorizontalWinner = [
  ["X", "X", "X"],
  [null, null, null],
  [null, null, null],
];

let boardNoWinner = Array.from({ length: BOARD_SIZE }, () =>
  Array.from({ length: BOARD_SIZE }, () => null)
);

let boardLeftDiagonalWinner = [
  ["X", null, null],
  [null, "X", null],
  [null, null, "X"],
];

let boardRightDiagonalWinner = [
  [null, null, "X"],
  [null, "X", null],
  ["X", null, null],
];

// xPos and yPos gives us latest inserted positions. We also need who inserted, whether X or Y, so we have turn
export const determineWinner = (
  board: (string | null)[][],
  row: number,
  col: number,
  turn: string
) => {
  // Winner is determined by checking vertical, horizontal, leftDiagonal, rightDiagonal

  const DIRECTION_DELTS = [
    [1, 0], // vertical check -> same row, different col
    [0, 1], // horizontal check ->  different row, same col
    [1, 1], // left diagonal check -> different row, different col (both increasing so left top to right bottom)
    [1, -1], // right diagonal check -> different row, different col (row increasing col decreasing, so top right to bottom left)
  ];

  return DIRECTION_DELTS.some(([deltaRow, deltaCol]) => {
    /* 
        [
  ["X", null, null],
  ["X", null, null],
  ["X", null, null],
]
     
        */

    let consecutiveSquares = 0;

    // If Board size is 3, I need to check starting from previous 2 (left or top side) and next 2 (right or bottom side) from the point I marked
    for (let i = -BOARD_SIZE + 1; i <= BOARD_SIZE - 1; i++) {
      // in this case we check
      // [-2, -1, 0, 1, 2] -> But the board size is just 3, so it covers all checks left and right side (also top bottom side)
      const curRow = row + i * deltaRow;
      const curCol = col + i * deltaCol;

      if (board[curRow]?.[curCol] === turn) {
        consecutiveSquares++;
        if (consecutiveSquares === BOARD_SIZE) break;
      } else {
        consecutiveSquares = 0;
      }
    }

    return consecutiveSquares >= BOARD_SIZE;
  });

  //   const horizontalCheck = board[row].every((sq) => sq === turn);

  //   const verticalCheck = board.every((r) => r[col] === turn);
  //   const leftDiagonalCheck =
  //     row === col && board.every((r, index) => r[index] === turn);
  //   const rightDiagonalCheck =
  //     row + col === board.length - 1 &&
  //     board.every((row, index) => row[col - index] === turn);

  //   return (
  //     horizontalCheck ||
  //     verticalCheck ||
  //     leftDiagonalCheck ||
  //     rightDiagonalCheck ||
  //     null
  //   );
};

console.log(
  "boardVerticalWinner",
  determineWinner(boardVerticalWinner, 0, 0, "X")
); // 'X' inserted in 0,0 position (1st row 1st col)
console.log(
  "boardHorizontalWinner",
  determineWinner(boardHorizontalWinner, 0, 2, "X")
); // 'O' inserted in 2,0 position (2nd row 1st col)
console.log("boardNoWinner", determineWinner(boardNoWinner, 2, 2, "X")); // 'X' inserted in last cell
console.log(
  "boardLeftDiagonalWinner",
  determineWinner(boardLeftDiagonalWinner, 1, 1, "X") // 'X' was inserted in the center
);
console.log(
  "boardRightDiagonalWinner",
  determineWinner(boardRightDiagonalWinner, 0, 2, "X") // 'X' was inserted in first row last col
);
