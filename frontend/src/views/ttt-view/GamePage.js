import React, { Component, useEffect, useState } from "react";

class TicTacToe extends Component{
  constructor(props) {
    super(props);
    this.state = { 
      grid_vals: ["","","","","","","","",""],
      difficulties: ['Easy','Medium','Hard'],
      players: ['Computer','Two Player'],
      game_difficulty: 0,
      // game_difficulty: false,
      num_players: 1,
      curr_player: 0,
      game_over: false,
    }
  }
  
  /* ON CLICK FUNCTIONS */

  cellOnClick = (cell) => {
    // function that handles the cell onClick attribute i.e. when a player chooses to fill a cell in the grid 
    if (this.state.grid_vals[cell]) {return}

    const playerSymbol = ['O','X'][this.state.curr_player] // determines the symbol to use given which player's turn to move
    let grid_vals = [...this.state.grid_vals]
    grid_vals[cell] = playerSymbol
    this.setState({grid_vals})
    this.setState({curr_player: (this.state.curr_player+1)%(this.state.num_players+1)})
  }

  modeOnClick = () => {
    // function to handle changing between single and two player game modes
    this.resetOnClick()
    this.setState({num_players: (this.state.num_players+1)%2})
  }

  difficultyOnClick = () => {
    // function to handle changing game difficulty
    this.resetOnClick()
    this.setState({game_difficulty: (this.state.game_difficulty+1)%3})
  }

  resetOnClick = () => {
    // function to reset the grid
    this.setState({grid_vals: ["","","","","","","","",""]})
  }

  /* RENDERING FUNCTIONS */

  renderGameMode = () => {
    // renders buttons for selecting number of players and difficulty, as well as option to reset board
    return (
      <div className="grid grid-cols-2 gap-2 w-1/4 text-center mt-2">
        <button className="gamemode-selector" onClick={() => this.modeOnClick()}> {this.state.players[this.state.num_players]} </button>
        <button className="gamemode-selector" onClick={() => this.difficultyOnClick()}> {this.state.difficulties[this.state.game_difficulty]} </button>
        <button className="gamemode-selector col-span-2 w-1/2 justify-self-center"onClick={() => this.resetOnClick()}> Reset</button>
      </div>
    )
  }

  renderCell = (n) => {
    // renders each individual cell depending on whether it contains a value

    if (this.state.grid_vals[n]) {
      var className = "cell-button active:bg-red-500"
    } else{
      var className = "cell button hover:bg-emerald-200"
    }
    return (
      <button className={className} onClick={()=> this.cellOnClick(n)}>
        {this.state.grid_vals[n]}
      </button>
    )
  }

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
    )
  }

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
            <a className="" href="">
              How I Made This
            </a>
          </div>
        </div>
      </main>
    )

  }
}

export default TicTacToe;