/* 
This is taken from Tic-Tac-Toe II official solution https://www.greatfrontend.com/questions/user-interface/tic-tac-toe-ii.

We are doing for NxM cross board where we have N rows N columns, but 
we win if we fill M number.

So the board is always a square (NXN), but we need to fill just M. M could be lessthan or equal to N.

We are taking 2D board.
*/

// Make the board of NXN first

const M = 3;
const N = 3;

let boardVerticalWinner = ["X", null, null, "X", null, null, "X", null, null];
let boardHorizontalWinner = ["X", "X", "X", null, null, null, null, null, null];
let boardNoWinner = Array(9).fill(null); // fills all 0-8 places with null
let boardLeftDiagonalWinner = [
  "X",
  null,
  null,
  null,
  "X",
  null,
  null,
  null,
  "X",
];
let boardRightDiagonalWinner = [
  null,
  null,
  "X",
  null,
  "X",
  null,
  "X",
  null,
  null,
];

export const determineWinner = (
  board: (string | null)[],
  n: number,
  m: number,
  filledIndex: number
) => {
  const mark = board[filledIndex];
  const row = Math.floor(filledIndex / n);
  const col = filledIndex % n;

  const rowLine = [];
  for (let i = 0; i < n; i++) {
    rowLine.push(row * n + i);
  }

  const colLine = [];
  for (let i = 0; i < n; i++) {
    colLine.push(i * n + col);
  }

  const leftDiagLine = [];
  if (row === col) {
    for (let i = 0; i < n; i++) {
      leftDiagLine.push(i * n + i);
    }
  }

  const rightDiagLine = [];
  if (row + col === n - 1) {
    for (let i = 0; i < n; i++) {
      rightDiagLine.push(i * n + (n - 1) - i);
    }
  }

  // traverse through each *line and see if we have a winner
  const lines = [rowLine, colLine, leftDiagLine, rightDiagLine];

  for (const line of lines) {
    let count = 0;
    for (let sq of line) {
      if (board[sq] === mark) {
        count++;
        if (count >= m) return mark;
      } else {
        count = 0;
      }
    }
  }

  return null;
};

console.log(
  "boardVerticalWinner",
  determineWinner(boardVerticalWinner, N, M, 0)
);
console.log(
  "boardHorizontalWinner",
  determineWinner(boardHorizontalWinner, N, M, 1)
);
console.log("boardNoWinner", determineWinner(boardNoWinner, N, M, 3));
console.log(
  "boardLeftDiagonalWinner",
  determineWinner(boardLeftDiagonalWinner, N, M, 0)
);
console.log(
  "boardRightDiagonalWinner",
  determineWinner(boardRightDiagonalWinner, N, M, 2)
);

/* 
 
["X", null, null, null,  3    3
"X", null, null, null    6    7 
"X", null, null-, null,  9    11
"X", null, null, null].  12   15
 
 
0,4,8,12

0+4 * 1 - 1, 1+3 * 2  , 2+3 * 3,   3+3 * 

0 * 4 + 3  - 0  , 
1 * 4 + 3  - 1, 
2 * 4 + 3 -  2 , 
3 * 4 + 3  - 3


(i * n) + (n - 1) - i,





(0 * 4 + 2), (1 * 4 + 2), (2 * 4 + 2), (3 * 4 + 2)

filled - 10
n - 4

row, col

rowcells, colcells

10/4 -> row num 2

start -> 2*4 = 8
end = start + 4 => 12 - 1 


consider m for horizontal check

rowCheck === colCheck -> for left diag
then, 0, 5, 10, 15


0*4+0
1*4+1
2*4+2
3*4+3



*/
