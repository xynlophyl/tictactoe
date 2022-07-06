import React, { Component } from "react";
const game = require('./GameLogic')


class AI {
  constructor(grid) {
    this.grid = grid;
  }

  updateGameState(cell, player) {
    const sym = ['O','X'][player]; // determines the symbol to use given which player's turn to move
    let gridVals = [...this.state.gridVals];
    gridVals[cell] = playerSymbol;
    this.setState({gridVals});
  }

}

export default AI;