## Tic Tac Toe winner logic

`Approx time - 30m`

There are a few ways to write the winner-check logic depending on how you design the board.

- For 3X3 board, a linear array can be used. For that, we can hardcode the array that needs to be checked as shown in [15th question](https://github.com/sandeep194920/CodingPractice/tree/main/15-%5Bui%5D-tic-tac-toe-react-docs) and [34th question](https://github.com/sandeep194920/CodingPractice/tree/main/34-%5Bui%5D-tic-tac-toe-I)

- For MXM board, a 2D array (matrix) can be used to find the winner.

- Also, for MXM board, the linear array can also be used as shown in [Tic-Tac-Toe II GFE official solution](https://www.greatfrontend.com/questions/user-interface/tic-tac-toe-ii). **_The official solution for this is little clunky and we have improvised that in `35-tic-tac-toe-winner-logic/src/2D-array-for-nxm-board.ts`_**

**We will see all 3 ways in this question.**

NOTE: This question will only have different ways to check winner in a tic-tac-toe board and no react components.

**Solve this first and then solve Tic-Tac-Toe II (Question 36)**
