export default class Grid {
  constructor() {
      this.gridVals = ["","","","","","","","",""];
      this.numPlayers= 1;
      this.currPlayer = 0;
      this.cellsLeft =  9;
      this.gameState = -1;
      this.winningTriplet = [];
  }
  /* STATE UPDATE FUNCTIONS */
  updateMove(cell) {
    if (this.gameState > -1 || this.gridVals[cell]) {
      return;
    };
    
    const curr = ['O','X'][this.currPlayer];
    this.gridVals[cell] = curr;
    this.cellsLeft -= 1;
    this.updateGameState(cell);
    return;
  };

  incrementTurn() {
    this.currPlayer = (this.currPlayer+1)%(2);
  }

  updateGameState(cell) { 
    const [currState, triplet] = this.winCheck(cell)
    if (currState > -1) {
      this.gameState = currState;
      this.winningTriplet = triplet;
    } else if (this.cellsLeft === 0) {
      this.gameState = 0;
    }
  }

  updateMode() {
    this.numPlayers = (this.numPlayers+1)%2;
    this.resetGrid();
  }

  resetGrid() {
    this.gridVals = ["","","","","","","","",""];
    this.currPlayer = 0;
    this.cellsLeft = 9;
    this.gameState = -1;
  }

  /* END CHECK FUNCTIONS */
  rowCheck(cell) {
    const curr = ['O','X'][this.currPlayer];
    if (cell%3===0 && curr === this.gridVals[cell+1] && curr === this.gridVals[cell+2]) {
      return [cell,cell+1,cell+2];
    } else if (cell%3===1 && curr === this.gridVals[cell+1] && curr === this.gridVals[cell-1]) {
      return [cell-1,cell,cell+1];
    } else if (cell%3===2 && curr === this.gridVals[cell-1] && curr === this.gridVals[cell-2]) {
      return [cell-2,cell-1,cell];
    } else { return };
  };

  columnCheck(cell) {
    const curr = ['O','X'][this.currPlayer];
    if (cell/3 < 1 && curr === this.gridVals[cell+3] && curr === this.gridVals[cell+6]) {
      return [cell, cell+3, cell+6]
    } else if (cell/3 < 2 && curr === this.gridVals[cell+3] && curr === this.gridVals[cell-3]) {
      return [cell-3, cell, cell+3];
    } else if (curr === this.gridVals[cell-3] && curr === this.gridVals[cell-6]) {
      return [cell-6, cell-3, cell];
    } else { return };
  };

  diagCheck(cell) {
    const curr = ['O','X'][this.currPlayer];
    if (cell === 4) {
      if (this.gridVals[0] === curr && this.gridVals[8] === curr) {
        return [3, [0, 4, 8]];
      } else if(this.gridVals[2] === curr && this.gridVals[6] === curr) {
        return [4, [2,4,6]];
      } else { return [-1, []] };
    } else {
      if (!this.gridVals[4] || this.gridVals[4] !== curr) { return [-1, []]}
      else if ((cell === 0 && this.gridVals[8] === curr) || (cell === 8 && this.gridVals[0] === curr)) {
        return [3, [0, 4, 8]];
      } else if ((cell === 2 && this.gridVals[6] === curr) || (cell === 6 && this.gridVals[2] === curr)) {
        return [4, [2, 4, 6]];
      } else { return [-1, []]};
    };
  };

  winCheck(cell) {
    const winningRow = this.rowCheck(cell)
    if (winningRow)  {
      return [1, winningRow];
    } else {
      const winningCol = this.columnCheck(cell)
      if (winningCol) {
        return [2, winningCol];
      } else {
        return this.diagCheck(cell, this.gridVals, this.currPlayer);
      };
    };
  };
    
}
