class Grid {
  constructor() {
      this.gridVals = ["","","","","","","","",""];
      this.playerMode = 0;
      this.currPlayer = Math.floor(Math.random()*100)%2;
      // this.currPlayer = 1
      this.cellsLeft =  9;
      this.gameState = -1;
      this.winningTriplet = [];
  }
  /* GET STATE FUNCTIONS */

  getLegalActions(gridVals) {
    let actions = []
    for (let cell = 0; cell < gridVals.length; cell++) {
      if (!gridVals[cell]){
        actions.push(cell)
    }};
    return actions;
  }

  getNextGridVals(cell, player) {
    const curr = ['O','X'][player];
    let gridVals = [...this.gridVals];
    gridVals[cell] = curr;
    return gridVals;
  }

  /* STATE UPDATE FUNCTIONS */
  updateMove(cell) {
    if (this.gameState > -1 || this.gridVals[cell]) {
      // game is over or cell is already filled, do nothing
      return;
    };
    
    this.gridVals = this.getNextGridVals(cell, this.currPlayer)
    this.cellsLeft -= 1;
    this.updateGameState(cell);
    this.incrementTurn();
  };

  incrementTurn() {
    this.currPlayer = (this.currPlayer+1)%(2);
  }

  updateGameState(cell) { 
    const [currState, triplet] = this.winCheck(this.gridVals, cell, this.currPlayer)
    if (currState > -1) {
      this.gameState = currState;
      this.winningTriplet = triplet;
    } else if (this.cellsLeft === 0) {
      this.gameState = 0;
    }
  }

  updateMode() {
    this.playerMode = (this.playerMode+1)%2;
    this.resetGrid();
  }

  resetGrid() {
    this.gridVals = ["","","","","","","","",""];
    this.currPlayer = Math.floor(Math.random()*100)%2;
    // this.currPlayer = 1;
    this.cellsLeft = 9;
    this.gameState = -1;
  };

  /* END CHECK FUNCTIONS */
  rowCheck(grid, cell, player) {
    // check if the row of the latest move is a winning row
    const curr = ['O','X'][player];
    if (cell%3===0 && curr === grid[cell+1] && curr === grid[cell+2]) {
      return [cell,cell+1,cell+2];
    } else if (cell%3===1 && curr === grid[cell+1] && curr === grid[cell-1]) {
      return [cell-1,cell,cell+1];
    } else if (cell%3===2 && curr === grid[cell-1] && curr === grid[cell-2]) {
      return [cell-2,cell-1,cell];
    } else { return []};
  };

  columnCheck(grid, cell, player) {
    // check if the column of the latest move is winning
    const curr = ['O','X'][player];
    if (cell/3 < 1 && curr === grid[cell+3] && curr === grid[cell+6]) {
      return [cell, cell+3, cell+6]
    } else if (cell/3 < 2 && curr === grid[cell+3] && curr === grid[cell-3]) {
      return [cell-3, cell, cell+3];
    } else if (cell/3 < 9 && curr === grid[cell-3] && curr === grid[cell-6]) {
      return [cell-6, cell-3, cell];
    } else { return []};
  };

  diagCheck(grid, cell, player) {
    // check if diagonals are winning
    const curr = ['O','X'][player];
    if (cell === 4) {
      if (grid[0] === curr && grid[8] === curr) {
        return [3, [0, 4, 8]];
      } else if(grid[2] === curr && grid[6] === curr) {
        return [4, [2,4,6]];
      } else { return [-1, []] };
    } else {
      if (!grid[4] || grid[4] !== curr) { return [-1, []]}
      else if ((cell === 0 && grid[8] === curr) || (cell === 8 && grid[0] === curr)) {
        return [3, [0, 4, 8]];
      } else if ((cell === 2 && grid[6] === curr) || (cell === 6 && grid[2] === curr)) {
        return [4, [2, 4, 6]];
      } else { return [-1, []]};
    };
  };

  winCheck(grid, cell, player) {
    // checks for any possible win given the latest cell filled
    const winningRow = this.rowCheck(grid, cell, player)
    if (winningRow.length === 3)  {
      return [1, winningRow];
    } else {
      const winningCol = this.columnCheck(grid, cell, player)
      if (winningCol.length === 3) {
        return [2, winningCol];
      } else {
        return this.diagCheck(grid,cell, player);
      };
    };
  };
};

export default Grid;
