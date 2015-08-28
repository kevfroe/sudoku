// krowe

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById("btnSolve").addEventListener('click', function () {
    getInputSolve();
  });
  //getInputSolve();
});


function getInputSolve () {
  var input = [];

  for (var row = 0; row < 9; row++) {
    for (var col = 0; col < 9; col++) {
      input.push(parseInt(document.getElementById(getId(row,col)).value));
    }
  }

  var sudokuBoard = new SudokuBoard();
  sudokuBoard.set(input);
  sudokuBoard.solve();
  var output = sudokuBoard.get();

  for (var row = 0; row < 9; row++) {
    for (var col = 0; col < 9; col++) {
      document.getElementById(getId(row,col)).value = output[getIndex(row,col)];
    }
  }
  sudokuBoard.print();
  alert(output);
};

function getId(row, col) {
  return "" + row + col;
}

function getIndex(row, col) {
  return (row * 9) + col; 
}
