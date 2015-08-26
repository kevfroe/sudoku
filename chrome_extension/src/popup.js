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

  //input = [7,0,2,0,0,1,4,0,0,
  //         0,0,8,0,0,6,0,3,0,
  //         0,1,0,0,0,0,0,0,9,
  //         0,0,0,0,1,2,0,5,0,
  //         0,2,0,0,0,0,0,7,0,
  //         0,4,0,5,7,0,0,0,0,
  //         3,0,0,0,0,0,0,2,0,
  //         0,7,0,6,0,0,5,0,0,
  //         0,0,5,3,0,0,6,0,8];

  input = [0,8,0,0,2,0,3,0,0,
           0,9,0,3,0,0,6,0,0,
           0,0,1,0,8,0,0,7,0,
           6,0,0,9,0,1,0,0,0,
           0,0,0,0,5,0,0,0,0,
           0,0,0,8,0,7,0,0,4,
           0,1,0,0,6,0,2,0,0,
           0,0,4,0,0,8,0,1,0,
           0,0,3,0,7,0,0,8,0];

  //console.log("TEST");
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
