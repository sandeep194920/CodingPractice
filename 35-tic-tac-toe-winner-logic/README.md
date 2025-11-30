## Tic Tac Toe winner logic

`Approx time - 30m`

There are a few ways to write the winner-check logic depending on how you design the board.

1. For 3X3 board, a linear array can be used. For that, we can hardcode the array that needs to be checked as shown in [15th question](https://github.com/sandeep194920/CodingPractice/tree/main/15-%5Bui%5D-tic-tac-toe-react-docs) and [34th question](https://github.com/sandeep194920/CodingPractice/tree/main/34-%5Bui%5D-tic-tac-toe-I)

2. For MXM board, a 2D array (matrix) can be used to find the winner.

3. Also, for MXM board, the linear array can also be used as shown in [Tic-Tac-Toe II GFE official solution](https://www.greatfrontend.com/questions/user-interface/tic-tac-toe-ii). **_The official solution for this is little clunky and we have improvised that in `35-tic-tac-toe-winner-logic/src/2D-array-for-nxm-board.ts`_**

4. I learnt this method after attempting [Connect 4 question](https://github.com/sandeep194920/CodingPractice/tree/main/37-%5Bui%5D-connect-four). Here, you can identify a pattern of deltas for row and col and use the fact that, from the user placement point, you need to check a few steps left, few steps right, few steps top and a few steps bottom to determine the winner. If you take a look at 4 directions, you notice same pattern gets repeated.
   It's like row stays same when col changes, and col stays same when row changes and so on. This took a little practice in connect-4 game, but definitely good practice and very useful pattern. Must know for bigger matrix questions.

**We will see all 3 ways in this question.**

NOTE: This question will only have different ways to check winner in a tic-tac-toe board and no react components.

**Solve this first and then solve Tic-Tac-Toe II (Question 36)**
