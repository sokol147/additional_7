module.exports = function solveSudoku(matrix) {
  function solve(matrix, row, col){
    let cell = findEmptyCell(matrix, row, col);
    row = cell[0];
    col = cell[1];

    if(row == -1) return true;

    for(let num = 1; num <= 9; num++){
      if(markSolved(matrix, row, col, num)){
        matrix[row][col] = num;

        if(solve(matrix, row, col)) return true;

        matrix[row][col] = 0;
      }
    }
    return false;
  }

  function findEmptyCell(matrix, row, col){
    for(; row < 9; col = 0, row++){
      for(; col < 9; col++){
        if(matrix[row][col] == 0) return [row, col];
      }
    }
    return [-1, -1];
  }

  function markSolved(matrix, row, col, num){
    return checkRow(matrix, row, num) &&
           checkCol(matrix, col, num) &&
           checkSqure(matrix, row, col, num);
  }

  function checkRow(matrix, row, num){
    for(let col = 0; col < 9; col++){
      if(matrix[row][col] == num) return false;
    }
    return true;
  }

  function checkCol(matrix, col, num){
    for(let row = 0; row < 9; row++){
      if(matrix[row][col] == num) return false;
    }
    return true;
  }

  function checkSqure(matrix, row, col, num){
    row = Math.floor(row / 3) * 3;
    col = Math.floor(col / 3) * 3;

    for(let i = 0; i < 3; i++){
      for(let j = 0; j < 3; j++){
        if(matrix[row + i][col + j] == num) return false;
      }
    }
    return true;
  }

  solve(matrix, 0, 0);
  return matrix;
}
