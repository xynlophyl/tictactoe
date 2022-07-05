/*
 GAME STATE FUNCTIONS
*/
function rowCheck(cell, grid, player){
  const curr = ['O','X'][player]
  if (cell%3==0 && curr == grid[cell+1] && curr == grid[cell+2]) {
    return [cell,cell+1,cell+2]
  } else if (cell%3==1 && curr == grid[cell+1] && curr == grid[cell-1]) {
    return [cell-1,cell,cell+1]
  } else if (cell%3==2 && curr == grid[cell-1] && curr == grid[cell-2]) {
    return [cell-2,cell-1,cell]
  } else { return }
}
  
function columnCheck(cell, grid, player){
  const curr = ['O','X'][player]
  if (cell/3 < 1 && curr == grid[cell+3] && curr == grid[cell+6]) {
    return [cell, cell+3, cell+6]
  } else if (cell/3 < 2 && curr == grid[cell+3] && curr == grid[cell-3]) {
    return [cell-3, cell, cell+3]
  } else if (curr == grid[cell-3] && curr == grid[cell-6]) {
    return [cell-6, cell-3, cell]
  } else { return }
}
  
function diagCheck(cell, grid, player) {
  const curr = ['O','X'][player]
  if (cell == 4) {
    if (grid[0] == curr && grid[8] == curr) {
      return [3, [0, 4, 8]]
    } else if(grid[2] == curr && grid[6] == curr) {
      return [4, [2,4,6]]
    } else { return [-1, []] }
  } else {
    if (!grid[4] || grid[4] != curr) { return [-1, []]}
    else if ((cell == 0 && grid[8] == curr) || (cell == 8 && grid[0] == curr)) {
      return [3, [0, 4, 8]]
    } else if ((cell == 2 && grid[6] == curr) || (cell == 6 && grid[2] == curr)) {
      return [4, [2, 4, 6]]
    } else { return [-1, []]}
  }
}
  
function winCheck(cell, grid, player) {
  const winningRow = rowCheck(cell,grid,player)
  if (winningRow)  {
    return [1, winningRow]
  } else {
    const winningCol = columnCheck(cell,grid,player)
    if (winningCol) {
      return [2, winningCol]
    } else {
      return diagCheck(cell, grid, player)
    }
  }
}
  
function endCheck(cellsLeft) {
  if (cellsLeft == 1) {
    return true
  } else {
    return false
  }
}

module.exports = { winCheck, endCheck}

