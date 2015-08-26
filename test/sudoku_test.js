

var sudoku = require("../chrome_extension/src/sudoku.js");

var board = new sudoku.SudokuBoard();

console.log("TEST1 start");
board.set(7,0,2,0,0,1,4,0,0,
          0,0,8,0,0,6,0,3,0,
          0,1,0,0,0,0,0,0,9,
          0,0,0,0,1,2,0,5,0,
          0,2,0,0,0,0,0,7,0,
          0,4,0,5,7,0,0,0,0,
          3,0,0,0,0,0,0,2,0,
          0,7,0,6,0,0,5,0,0,
          0,0,5,3,0,0,6,0,8);
board.solve();
console.log((board.isSolved()) ? "Passed" : "FAILED!!!");

console.log("TEST2 start");
board.set(0,0,0,0,0,1,0,2,0,
          0,0,8,7,0,3,5,0,0,
          9,0,3,0,0,2,0,0,0,
          2,0,5,0,0,0,0,0,6,
          0,0,0,0,7,0,0,0,0,
          6,0,0,0,0,0,8,0,1,
          0,0,0,3,0,0,4,0,9,
          0,0,2,9,0,8,7,0,0,
          0,4,0,1,0,0,0,0,0);
board.solve();
console.log((board.isSolved()) ? "Passed" : "FAILED!!!");

console.log("TEST3 start");
board.set(9,2,0,0,0,5,1,0,0,
          0,0,0,0,4,0,0,0,0,
          1,0,0,6,0,0,7,0,0,
          0,6,0,0,8,0,0,0,0,
          3,0,2,0,0,0,8,0,5,
          0,0,0,0,9,0,0,4,0,
          0,0,7,0,0,3,0,0,8,
          0,0,0,0,5,0,0,0,0,
          0,0,1,7,0,0,0,5,2);
board.solve();
console.log((board.isSolved()) ? "Passed" : "FAILED!!!");

console.log("TEST4 start");
board.set(0,0,0,0,0,3,2,0,0,
          0,0,5,0,0,0,0,0,8,
          4,0,0,7,9,0,3,6,0,
          0,0,0,5,0,0,0,0,2,
          5,0,0,8,0,4,0,0,7,
          3,0,0,0,0,1,0,0,0,
          0,8,7,0,1,5,0,0,3,
          9,0,0,0,0,0,1,0,0,
          0,0,4,3,0,0,0,0,0);
board.solve();
console.log((board.isSolved()) ? "Passed" : "FAILED!!!");

console.log("TEST5 start");
board.set(0,0,7,9,0,0,0,0,0,
          1,0,0,0,0,3,0,5,0,
          0,9,0,0,8,0,0,0,2,
          9,0,0,0,3,0,0,6,0,
          0,7,0,0,0,0,0,8,0,
          0,8,0,0,6,0,0,0,5,
          4,0,0,0,1,0,0,7,0,
          0,2,0,5,0,0,0,0,6,
          0,0,0,0,0,4,8,0,0);
board.solve();
board.print();
console.log((board.isSolved()) ? "Passed" : "FAILED!!!");



//board.set(0,0,0,0,0,0,0,0,0,
//          0,0,0,0,0,0,0,0,0,
//          0,0,0,0,0,0,0,0,0,
//          0,0,0,0,0,0,0,0,0,
//          0,0,0,0,0,0,0,0,0,
//          0,0,0,0,0,0,0,0,0,
//          0,0,0,0,0,0,0,0,0,
//          0,0,0,0,0,0,0,0,0,
//          0,0,0,0,0,0,0,0,0);