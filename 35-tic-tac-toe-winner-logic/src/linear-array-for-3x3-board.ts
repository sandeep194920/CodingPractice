/* Board will be represented in linear array 


[0, 1, 2,
 3, 4, 5,
 6, 7, 8]

, so it will be [0, 1, 2, 3, 4, 5, 6, 7, 8]
*/

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
  null,
  "X",
  null,
  null,
  "X",
];

export const determineWinner = (board: (string | null)[]) => {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  // Time comp O(N^2). For 3X3 it is 9. For 4X4 it is 16 and so on, so not very efficient
  // forEach is not suitable because return statement just continues to next element. so we cant really return. So let's use for-of loop

  for (const combo of winningCombinations) {
    const [a, b, c] = combo;

    if (board[a] !== null && board[a] === board[b] && board[b] === board[c]) {
      console.log("combo is", [a, b, c]);
      return board[a];
    }
  }

  return null; // no winner
};

console.log("boardVerticalWinner", determineWinner(boardVerticalWinner));
console.log("boardHorizontalWinner", determineWinner(boardHorizontalWinner));
console.log("boardNoWinner", determineWinner(boardNoWinner));
console.log(
  "boardLeftDiagonalWinner",
  determineWinner(boardLeftDiagonalWinner)
);
console.log(
  "boardRightDiagonalWinner",
  determineWinner(boardRightDiagonalWinner)
);
