

var sudoku = require("../chrome_extension/src/sudoku.js");
var board = new sudoku.SudokuBoard();

board.set(0,0,3,0,0,9,0,5,0,
          2,0,6,0,7,0,0,0,0,
          0,1,0,2,0,3,0,0,0,
          9,0,0,0,0,0,6,4,0,
          0,0,0,8,0,2,0,0,0,
          0,5,4,0,0,0,0,0,8,
          0,0,0,6,0,5,0,9,0,
          0,0,0,0,3,0,7,0,5,
          0,3,0,7,0,0,1,0,0);
board.solve();
board.print();
board.tryAgain();
board.print();

//board.set(0,0,0,0,0,0,0,0,0,
//          0,0,0,0,0,0,0,0,0,
//          0,0,0,0,0,0,0,0,0,
//          0,0,0,0,0,0,0,0,0,
//          0,0,0,0,0,0,0,0,0,
//          0,0,0,0,0,0,0,0,0,
//          0,0,0,0,0,0,0,0,0,
//          0,0,0,0,0,0,0,0,0,
//          0,0,0,0,0,0,0,0,0);
