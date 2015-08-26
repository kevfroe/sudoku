// sudoku.js

Array.prototype.equals = function (arr) {
  var result = false;

  if (this.length != arr.length) {
    return false;
  }

  for (var i = 0; i < this.length; i++) {
    if (this[i] != arr[i]) {
      return false;
    }
  }

  return true;
}

function SudokuBoard () {
  //-----------------------------------------
  // Internal Classes
  //-----------------------------------------
  function Cell (row, col, box) {
    this.row = row;
    this.col = col;
    this.box = box;
    this.value = 0;
    this.possibilities = [1,2,3,4,5,6,7,8,9];
    
    this.remove_possibility = function (val, reason) {
      var updated = false;

      validateBoard();

      var index = this.possibilities.indexOf(val);
      if (index != -1) {
        //print_to_output ("Removing (" + this.row + ", " + this.col + ") value " + val + " - " + reason);
        //print_internal();
        if (this.possibilities.length == 1) {
          //print_to_output ("Removing index " + getIndex(this.row, this.col) + " row " + this.row + " col " + this.col);
          //print_internal ();
          //throw "Trying to return last possibility";
          updated = updated;
        }

        this.possibilities.splice(index, 1); // remove 1 value from the given index
        updated = true;
      }
      return updated;
    }

    this.remove_possibilities = function (val_array, reason) {
      for (var i = 0; i < val_array.length; i++) {
        this.remove_possibility (val_array[i], reason);
      }
    }

    this.keep_only_possibilities = function (only_possibilities, reason) {
      validateBoard();
      var poss = this.possibilities.slice();
      for (var i = 0; i < poss.length; i++) {
        if (only_possibilities.indexOf(poss[i]) == -1) {
          this.remove_possibility (poss[i], reason);
        }
      }
    }

    this.resolve = function (value) {
      validateBoard();
      //print_to_output ("Resolving (" + this.row + ", " + this.col + ") to " + value);
      //print_internal ();
      this.value = value;
      this.possibilities = [];

      for (var i = 0; i < _row_indices[this.row].length; i++) {
        _board[_row_indices[this.row][i]].remove_possibility(value);
        _board[_col_indices[this.col][i]].remove_possibility(value);
        _board[_box_indices[this.box][i]].remove_possibility(value);
      }
    }
  }
  
  //-----------------------------------------
  // Internal Data
  //-----------------------------------------
  var _row_indices = [
    [ 0, 1, 2, 3, 4, 5, 6, 7, 8],
    [ 9,10,11,12,13,14,15,16,17],
    [18,19,20,21,22,23,24,25,26],
    [27,28,29,30,31,32,33,34,35],
    [36,37,38,39,40,41,42,43,44],
    [45,46,47,48,49,50,51,52,53],
    [54,55,56,57,58,59,60,61,62],
    [63,64,65,66,67,68,69,70,71],
    [72,73,74,75,76,77,78,79,80],
  ];
  
  var _col_indices = [
    [ 0, 9,18,27,36,45,54,63,72],
    [ 1,10,19,28,37,46,55,64,73],
    [ 2,11,20,29,38,47,56,65,74],
    [ 3,12,21,30,39,48,57,66,75],
    [ 4,13,22,31,40,49,58,67,76],
    [ 5,14,23,32,41,50,59,68,77],
    [ 6,15,24,33,42,51,60,69,78],
    [ 7,16,25,34,43,52,61,70,79],
    [ 8,17,26,35,44,53,62,71,80],
  ];
  
  var _box_indices = [
    [ 0, 1, 2, 9,10,11,18,19,20],
    [ 3, 4, 5,12,13,14,21,22,23],
    [ 6, 7, 8,15,16,17,24,25,26],
    [27,28,29,36,37,38,45,46,47],
    [30,31,32,39,40,41,48,49,50],
    [33,34,35,42,43,44,51,52,53],
    [54,55,56,63,64,65,72,73,74],
    [57,58,59,66,67,68,75,76,77],
    [60,61,62,69,70,71,78,79,80],
  ];

  var _board = [
    new Cell(0,0,0), new Cell(0,1,0), new Cell(0,2,0), new Cell(0,3,1), new Cell(0,4,1), new Cell(0,5,1), new Cell(0,6,2), new Cell(0,7,2), new Cell(0,8,2),
    new Cell(1,0,0), new Cell(1,1,0), new Cell(1,2,0), new Cell(1,3,1), new Cell(1,4,1), new Cell(1,5,1), new Cell(1,6,2), new Cell(1,7,2), new Cell(1,8,2),
    new Cell(2,0,0), new Cell(2,1,0), new Cell(2,2,0), new Cell(2,3,1), new Cell(2,4,1), new Cell(2,5,1), new Cell(2,6,2), new Cell(2,7,2), new Cell(2,8,2),
    new Cell(3,0,3), new Cell(3,1,3), new Cell(3,2,3), new Cell(3,3,4), new Cell(3,4,4), new Cell(3,5,4), new Cell(3,6,5), new Cell(3,7,5), new Cell(3,8,5),
    new Cell(4,0,3), new Cell(4,1,3), new Cell(4,2,3), new Cell(4,3,4), new Cell(4,4,4), new Cell(4,5,4), new Cell(4,6,5), new Cell(4,7,5), new Cell(4,8,5),
    new Cell(5,0,3), new Cell(5,1,3), new Cell(5,2,3), new Cell(5,3,4), new Cell(5,4,4), new Cell(5,5,4), new Cell(5,6,5), new Cell(5,7,5), new Cell(5,8,5),
    new Cell(6,0,6), new Cell(6,1,6), new Cell(6,2,6), new Cell(6,3,7), new Cell(6,4,7), new Cell(6,5,7), new Cell(6,6,8), new Cell(6,7,8), new Cell(6,8,8),
    new Cell(7,0,6), new Cell(7,1,6), new Cell(7,2,6), new Cell(7,3,7), new Cell(7,4,7), new Cell(7,5,7), new Cell(7,6,8), new Cell(7,7,8), new Cell(7,8,8),
    new Cell(8,0,6), new Cell(8,1,6), new Cell(8,2,6), new Cell(8,3,7), new Cell(8,4,7), new Cell(8,5,7), new Cell(8,6,8), new Cell(8,7,8), new Cell(8,8,8),
  ];
  
  //-----------------------------------------
  // Internal Functions
  //-----------------------------------------

  function validateBoard() {
    return; 
    for (var i = 0; i < _row_indices.length; i++) {
      var solved = getSolved(_row_indices[i]);
      var possibilities = getPossibilities(_row_indices[i]);
      if (solved.length + possibilities.length < 9) {
        //print_internal();
        throw "Board is invalid - row[" + i + "] is missing something";
      }
    }
    for (var i = 0; i < _col_indices.length; i++) {
      var solved = getSolved(_col_indices[i]);
      var possibilities = getPossibilities(_col_indices[i]);
      if (solved.length + possibilities.length < 9) {
        //print_internal();
        throw "Board is invalid - col[" + i + "] is missing something";
      }
    }
    for (var i = 0; i < _box_indices.length; i++) {
      var solved = getSolved(_box_indices[i]);
      var possibilities = getPossibilities(_box_indices[i]);
      if (solved.length + possibilities.length < 9) {
        //print_internal();
        throw "Board is invalid - box[" + i + "] is missing something";
      }
    }
  }

  function getSolved(indices) {
    var solved = []
    for (var i = 0; i < indices.length; i++) {
      if (_board[indices[i]].value != 0) {
        solved.push(_board[indices[i]].value);
      }
    }
    return solved;
  }

  function getPossibilities(indices) {
    var possibilities = [];
    for (var i = 0; i < indices.length; i++) {
      if (_board[indices[i]].value == 0) {
        for (var j = 0; j < _board[indices[i]].possibilities.length; j++) {
          if (possibilities.indexOf(_board[indices[i]].possibilities[j]) == -1) {
            possibilities.push(_board[indices[i]].possibilities[j]);
          }
        }
      }
    }
    return possibilities;
  }

  function getIndex(row, col) { return (row * 9) + col; }
  function getRow  (index)    { return Math.floor(index/9); }
  function getCol  (index)    { return index % 9; }
  function getBox  (index)    {
    var row = getRow(index);
    var col = getCol(index);
    switch (row) {
      case 0: case 1: case 2:{
        if (col <= 2)     { return 0; }
        else if (col >=6) { return 2; }
        else              { return 1; }
      }
      break;
      case 3: case 4: case 5:{
        if (col <= 2)     { return 3; }
        else if (col >=6) { return 5; }
        else              { return 4; }
      }
      break;
      case 6: case 7: case 8:{
        if (col <= 2)     { return 6; }
        else if (col >=6) { return 8; }
        else              { return 7; }
      }
      break;
      default:
        throw "Unknown row in getBox";
    }
  }

  function set_internal (new_board) {
    for (var i = 0; i < new_board.length; i++) {
      _board[i] = new Cell(getRow(i), getCol(i), getBox(i));
      _board[i].value = new_board[i];
      if (new_board[i] != 0) {
        _board[i].possibilities = [];
      }
    }
  }
  
  //-----------------------------------------
  function get_internal () {
    var print_board = [];
    for (var i = 0; i < _board.length; i++) {
      //if (_board[i].value != 0) {
        print_board.push(_board[i].value);
      //}
      //else {
      //  //print_board.push(_board[i].possibilities);
      //}
    }
    return print_board;
  }
  
  //-----------------------------------------
  function solve_internal () {
    var updated = true;
    var retry_count = 5;

    for (var i = 0; i < _row_indices.length; i++) {
      update_subset(_row_indices[i]);
      update_subset(_col_indices[i]);
      update_subset(_box_indices[i]);
    }
    
    while (updated == true) {
      updated = false;

      validateBoard();
      
      // update possibilities based on rows
      for (var i = 0; i < _row_indices.length; i++) {
        var box_start = Math.floor(i/3) * 3; // Basically 0 for 0-2, 3 for 3-5, 6 for 6-9
        
        updated |= update_subset(_row_indices[i]);
        updated |= update_resolve_only_possible_subset(_row_indices[i]);
        updated |= update_resolve_complete_subsets(_row_indices[i]);

        validateBoard();
        
        for (var j = box_start; j < box_start + 3; j++) { // 3 boxes to check for each row
          update_resolve_box_line_subsets(_row_indices[i], _box_indices[j]);
        }

        validateBoard();
      }
      
      // update possibilities based on columns
      for (var i = 0; i < _col_indices.length; i++) {
        var box_start = Math.floor(i/3); // Basically 0 for 0-2, 1 for 3-5, 2 for 6-9
        
        updated |= update_subset(_col_indices[i]);
        updated |= update_resolve_only_possible_subset(_col_indices[i]);
        updated |= update_resolve_complete_subsets(_col_indices[i]);

        validateBoard();
        
        for (var j = box_start; j < box_start + 7; j+=3) { // 3 boxes to check for each column [036][147][258]
          update_resolve_box_line_subsets(_col_indices[i], _box_indices[j]);
        }

        validateBoard();
      }
      
      // update possibilities based on boxes
      for (var i = 0; i < _box_indices.length; i++) {
        updated |= update_subset(_box_indices[i]);
        updated |= update_resolve_only_possible_subset(_box_indices[i]);
        updated |= update_resolve_complete_subsets(_box_indices[i]);

        validateBoard();
      }
      
      updated |= update_resolve_cells();

      validateBoard();

      if ((updated == false) && (retry_count != 0)) {
        updated = true;
        retry_count--;
      }
    }

    return;
  }

  //-----------------------------------------
  function update_resolve_complete_subsets (indices) {
    var updated = false;
    var unsolved_numbers = [];

    for (var i = 0; i < indices.length; i++) {
      var cell = _board[indices[i]];
      for (var j = 0; j < cell.possibilities.length; j++) {
        if (unsolved_numbers.indexOf(cell.possibilities[j]) == -1) {
          unsolved_numbers.push(cell.possibilities[j]);
        }
      }
    }

    var unsolved_subsets = sets.getAllSubsets(unsolved_numbers.slice());

    for (var i = 0; i < unsolved_subsets.length; i++) {
      if ((unsolved_subsets[i].length < 2) ||
          (unsolved_subsets[i].length >= unsolved_numbers.length))
      {
        continue;
      }

      if (!subset_possibilities_existance_count_matches(indices, unsolved_subsets[i])) {
        continue;
      }
      
      var indices_containing_subset = [];
      for (var j = 0; j < indices.length; j++) {
        if (sets.containsSet(_board[indices[j]].possibilities, unsolved_subsets[i])) {
          indices_containing_subset.push(indices[j]);
        }
      }

      if (indices_containing_subset.length == 0) {
        continue;
      }

      if (indices_containing_subset.length == unsolved_subsets[i].length) {
        for (var j = 0; j < indices.length; j++) {
          if (indices_containing_subset.indexOf(indices[j]) == -1) {
            updated |= _board[indices[j]].remove_possibilities(unsolved_subsets[i], "complete subset remove");
          }
          else {
            updated |= _board[indices[j]].keep_only_possibilities(unsolved_subsets[i], "complete subset keep");
          }
        }
      }
    }

    return updated;
  }

  //-----------------------------------------
  function update_resolve_box_line_subsets (indices1, indices2) {
    var updated = false;

    var indices_intersection = indices1.filter(function (n) {
      return indices2.indexOf(n) != -1;
    });

    var indices1_difference = indices1.filter(function(n){
      return indices_intersection.indexOf(n) == -1;
    });
    var indices2_difference = indices2.filter(function(n){
      return indices_intersection.indexOf(n) == -1;
    });

    var intersect_possibilities = [];
    for (var i = 0; i < indices_intersection.length; i++) {
      for (var j = 0; j < _board[indices_intersection[i]].possibilities.length; j++) {
        var possibility = _board[indices_intersection[i]].possibilities[j];
        if (-1 == intersect_possibilities.indexOf(possibility)) {
          intersect_possibilities.push(possibility);
        }
      }
    }
    
    // check indices1_difference
    for (var i = 0; i < intersect_possibilities.length; i++) {
      var unique_to_intersection = true;
      for (var j = 0; j < indices1_difference.length; j++) {
        if (-1 != _board[indices1_difference[j]].possibilities.indexOf(intersect_possibilities[i])) {
          unique_to_intersection = false;
          break;
        }
      }
      
      if (unique_to_intersection) {
        for (var j = 0; j < indices2_difference.length; j++) {
          updated = _board[indices2_difference[j]].remove_possibility(intersect_possibilities[i], "unique to intersection");
        }
      }
    }
    
    // check indices2_difference
    for (var i = 0; i < intersect_possibilities.length; i++) {
      var unique_to_intersection = true;
      for (var j = 0; j < indices2_difference.length; j++) {
        if (-1 != _board[indices2_difference[j]].possibilities.indexOf(intersect_possibilities[i])) {
          unique_to_intersection = false;
          break;
        }
      }
      
      if (unique_to_intersection) {
        for (var j = 0; j < indices1_difference.length; j++) {
          updated = _board[indices1_difference[j]].remove_possibility(intersect_possibilities[i], "unique to intersection");
        }
      }
    }
    
    return updated;
  }
  
  //-----------------------------------------
  function update_resolve_only_possible_subset (indices) {
    var updated = false;
    var possible_cnts = [0,0,0,0,0,0,0,0,0]
    
    for (var i = 0; i < indices.length; i++) {
      for (var j = 0; j < _board[indices[i]].possibilities.length; j++) {
        var possible_val = _board[indices[i]].possibilities[j];
        possible_cnts[possible_val-1]++;
      }
    }
    
    for (var i = 0; i < possible_cnts.length; i++) {
      var value = i+1;
      if (possible_cnts[i] == 1) {
        for (var j = 0; j < indices.length; j++) {
          if (_board[indices[j]].possibilities.indexOf(value) != -1) {
            _board[indices[j]].resolve(value);
            break;
          }
        }
      }
    }
    
    return updated;
  }
  
  
  //-----------------------------------------
  function update_subset (indices) {
    var updated = false;
    
    var solved_list = []
    for (var i = 0; i < indices.length; i++) {
      if (_board[indices[i]].value != 0) {
        solved_list.push(_board[indices[i]].value);
      }
    }
    
    for (var i = 0; i < solved_list.length; i++) {
      // remove solved_list[i] from possibilities
      for (var j = 0; j < indices.length; j++) {
        var cell = _board[indices[j]];
        if (cell.value == 0) {
          updated = cell.remove_possibility(solved_list[i], "removing solved values")
        }
      }
    }
    
    return updated;
  }
  
  //-----------------------------------------
  function update_resolve_cells () {
    var updated = false;
    
    for (var i = 0; i < _board.length; i++) {
      if (_board[i].possibilities.length == 1) {
        _board[i].resolve (_board[i].possibilities[0]);
        updated = true;
      }
    }
    return updated;
  }

  //-----------------------------------------
  function subset_possibilities_existance_count_matches (indices, subset) {
    var length = 0;

    for (var i = 0; i < subset.length; i++) {
      if (i == 0) {
        length = get_indices_containing_possibility(indices, subset[i]).length;
      }
      else if (length != get_indices_containing_possibility(indices, subset[i]).length) {
        return false; // lengths do not match
      }
    }
    return true; // counts match 
  }

  //-----------------------------------------
  function get_indices_containing_possibility (indices, value) {
    var indices_with_possibility = [];
    for (var i = 0; i < indices.length; i++) {
      if (_board[indices[i]].possibilities.indexOf(value) != -1) {
        indices_with_possibility.push(indices[i]);
      }
    }
    return indices_with_possibility;
  }

  //-----------------------------------------
  function print_row (indices) {
    var line123 = "";
    var line456 = "";
    var line789 = "";

    // First 1, 2, and 3
    for (var i = 0; i < indices.length; i++) {
      if (_board[indices[i]].value != 0) {
        line123 += "       ";
        line456 += "   " + _board[indices[i]].value + "   ";
        line789 += "       ";
      }
      else {
        line123 += "  ";
        line123 += (_board[indices[i]].possibilities.indexOf(1) != -1) ? "1" : " ";
        line123 += (_board[indices[i]].possibilities.indexOf(2) != -1) ? "2" : " ";
        line123 += (_board[indices[i]].possibilities.indexOf(3) != -1) ? "3" : " ";
        line123 += "  ";

        line456 += "  ";
        line456 += (_board[indices[i]].possibilities.indexOf(4) != -1) ? "4" : " ";
        line456 += (_board[indices[i]].possibilities.indexOf(5) != -1) ? "5" : " ";
        line456 += (_board[indices[i]].possibilities.indexOf(6) != -1) ? "6" : " ";
        line456 += "  ";

        line789 += "  ";
        line789 += (_board[indices[i]].possibilities.indexOf(7) != -1) ? "7" : " ";
        line789 += (_board[indices[i]].possibilities.indexOf(8) != -1) ? "8" : " ";
        line789 += (_board[indices[i]].possibilities.indexOf(9) != -1) ? "9" : " ";
        line789 += "  ";
      }
      if ((i == 2) || (i == 5)) {
        line123 += "||";
        line456 += "||";
        line789 += "||";
      }
      else if (i != indices.length - 1) {
        line123 += "|";
        line456 += "|";
        line789 += "|";
      }
    }

    print_to_output (line123);
    print_to_output (line456);
    print_to_output (line789);
  }
  
  //-----------------------------------------
  function printable_index (index) {
    row = Math.floor(index / 9) + 1; // 1-based indexing
    col = (index % 9) + 1; // 1-based indexing
    return "[" + row + "][" + col + "] (" + index + ")";
  }
  
  //-----------------------------------------
  function print_to_output(text) {
    console.log(text);
    return;
  }

  //-----------------------------------------
  function print_internal () {
    var row_separator = "-------+-------+-------++-------+-------+-------++-------+-------+-------";
    print_to_output ("");
    print_to_output ("");
    print_to_output ("-------------------------------------------------------------------------");
    print_to_output ("-------------------------------------------------------------------------");
    print_to_output ("Printing board");
    print_to_output ("-------------------------------------------------------------------------");
    print_to_output ("-------------------------------------------------------------------------");

    for (var i = 0; i < _row_indices.length; i++) {
      print_row (_row_indices[i]);
      if (i != _row_indices.length - 1) {
        print_to_output (row_separator); // Print separator
      }
      if ((i == 2) || (i == 5)) {
        print_to_output (row_separator); // Print second separator
      }
    }
  }
  
  //-----------------------------------------
  // Public Functions
  //-----------------------------------------
  this.set = function () {
    if (arguments.length == 81) {
      return set_internal(arguments);
    }
    else if (arguments[0].length == 81) {
      return set_internal(arguments[0]);
    }
    else {
      throw "set_board called with unusable arguments";
    }
  }
  
  //-----------------------------------------
  this.get = function () {
    return get_internal();
  }
  
  //-----------------------------------------
  this.solve = function () {
    return solve_internal();
  }

  //-----------------------------------------
  this.print = function () {
    return print_internal();
  }
};

