class Grid {
  constructor(currPlayer = Math.floor(Math.random()*100%2)) {
      this.gridVals = ["","","","","","","","",""];
      this.playerMode = 1;
      this.currPlayer = currPlayer;
      this.gameState = -1;
      this.winningTriplet = [];
      this.winningPlayer = -1;
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

  getEmptyCells(vals) { 
    let emptyCells = []
    for (let cell = 0; cell < 9; cell++) {
      if (vals[cell] === "") {
        emptyCells.push(cell)
      }
    }
    return emptyCells;
  }

  /* STATE UPDATE FUNCTIONS */
  updateMove(cell) {
    if (this.gameState > -1 || this.gridVals[cell]) {
      // game is over or cell is already filled, do nothing
      return;
    };
    
    this.gridVals = this.getNextGridVals(cell, this.currPlayer)
    this.updateGameState();
    this.incrementTurn();
  };

  incrementTurn() {
    this.currPlayer = (this.currPlayer+1)%(2);
  }

  updateGameState() { 
    const [currState, triplet] = this.endCheck(this.gridVals)
    this.gameState = currState;
    this.winningTriplet = triplet;
  }

  updateMode() {
    this.playerMode = (this.playerMode+1)%2;
    this.resetGrid();
  }

  resetGrid() {
    this.gridVals = ["","","","","","","","",""];
    this.currPlayer = Math.floor(Math.random()*100)%2;
    // this.currPlayer = 1;
    this.gameState = -1;
  };

  /* END CHECK FUNCTIONS */
  rowCheck(vals) {
    for (let row = 0; row < 3; row++){
      let cell = row*3;
      if (vals[cell] && vals[cell] === vals[cell+1] && vals[cell] === vals[cell+2]) {
        return [cell, cell+1, cell+2]
      }
    }
    return []
  }

  colCheck(vals) {
    for (let cell = 0; cell < 3; cell ++) {
      if (vals[cell]  && vals[cell] === vals[cell+3] && vals[cell] === vals[cell+6]) {
        return [cell, cell+3, cell+6]
      }
    }
    return []
  }

  diagCheck(vals) {
    if (vals[4]) {
      if (vals[4] === vals[0] && vals[4] === vals[8]) {
        return [3, [0,4,8]]
      }
      else if (vals[4] === vals[2] && vals[4] === vals[6]) {
        return [4, [2,4,6]]
      }
    }
    return [-1, []]
  }

  winCheck(vals) {
    let row = this.rowCheck(vals)
    if (row.length === 3) {
      return [1, row];
    }
    
    let col = this.colCheck(vals)
    if (col.length === 3) {
      return [2, col];
    }

    return this.diagCheck(vals);
  }

  endCheck(vals) {
    const [currState, winningTriplet] = this.winCheck(vals)
    if (currState === -1 && this.getEmptyCells(vals).length === 0) {
      return [0, []]
    }
    return [currState, winningTriplet]
  }
};

export default Grid;
