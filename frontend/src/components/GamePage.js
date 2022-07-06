


import React, { Component } from "react";
import Grid from '../classes/GridState.js'; 

class TicTacToe extends Component{
  constructor(props) {
    super(props);
    this.state = { 
      difficulties: ['Easy','Medium','Hard'],
      players: ['Computer','Two Player'],
      gameDifficulty: 0,
      grid: new Grid(),
    };
  };

  /* ON CLICK FUNCTIONS */

  cellOnClick = (cell) => {
    const grid = this.state.grid;
    if (grid.numPlayers === 1){
      grid.updateMove(cell);
      grid.incrementTurn();
    }
    else { // against computer
      grid.updateMove(cell)
    }
    this.setState({grid: grid});

  }

  modeOnClick = () => {
    const grid = this.state.grid
    grid.updateMode();
    grid.resetGrid();
    this.setState({grid: grid});
    return;
  };

  resetOnClick = () => {
    // function to reset the grid
    const grid = this.state.grid
    grid.resetGrid()
    this.setState({grid: grid})
    return;
  };

  /* RENDERING FUNCTIONS */

  renderGameMode = () => {
    // renders buttons for selecting number of players and difficulty, as well as option to reset board
    const grid = this.state.grid
    return (
      <div className="grid grid-cols-2 gap-2 w-1/4 text-center mt-2">
        <button className="gamemode-selector" onClick={() => this.modeOnClick()}> {this.state.players[grid.numPlayers]} </button>
        <button className="gamemode-selector" onClick={() => this.difficultyOnClick()}> {this.state.difficulties[this.state.gameDifficulty]} </button>
        <button className="gamemode-selector col-span-2 w-1/2 justify-self-center"onClick={() => this.resetOnClick()}> Reset</button>
      </div>
    );
  };

  renderCell = (n) => {
    const grid = this.state.grid
    // renders each individual cell depending on whether it contains a value
    if (grid.gameState > -1) {
      var className = '';
      if (grid.gameState === 0) {
        className = "cell-button bg-red-200";
      } else if (grid.winningTriplet.includes(n)){
        className = "cell-button bg-emerald-400";
      } else {
        className = "cell-button active:bg-red-500";
      };
    } else if (this.state.grid.gridVals[n]) {
      className = "cell-button active:bg-red-500";
    } else{
      className = "cell button hover:bg-emerald-200";
    };
    return (
      <button className={className} onClick={()=> this.cellOnClick(n)}>
        {grid.gridVals[n]}
      </button>
    );
  };

  renderGrid = () => {
    // renders the tic tac toe grid
    return (
      <div className="grid grid-cols-3 grid-row-3 w-3/12">
        <div className="cell border-r-2 border-b-2">
          {this.renderCell(0)}
        </div>
        <div className="cell border-b-2 border-r-2">
          {this.renderCell(1)}
        </div>
        <div className="cell border-b-2 ">
          {this.renderCell(2)}
        </div>
        <div className="cell border-b-2 border-r-2">
          {this.renderCell(3)}
        </div>
        <div className="cell border-b-2 border-r-2">
          {this.renderCell(4)}
        </div>
        <div className="cell border-b-2">
          {this.renderCell(5)}
        </div>
        <div className="cell border-r-2">
          {this.renderCell(6)}
        </div>
        <div className="cell border-r-2">
          {this.renderCell(7)}
        </div>
        <div className="cell">
          {this.renderCell(8)}
        </div>
      </div>
    );
  };

  render() {
    return (
      <main className="tictactoe min-h-screen">
        <div className="container space-y-4">
          <div className="text-center my-5">
            <h1 className="text-2xl"> TIC TAC TOE </h1>
          </div>
          <div className="flex justify-center">
            {this.renderGameMode()}
          </div>
          <div className="flex justify-center">
            {this.renderGrid()}
          </div>
          <div className="text-center m-7">
              How I Made This?
          </div>
        </div>
      </main>
    );
  };
};

export default TicTacToe;