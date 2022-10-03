import React, { Component } from "react";
import Grid from '../classes/GridState.js'; 
import AI from '../classes/searchAgents.js';
import DescriptionModal from "./DescriptionModal.js";

class TicTacToe extends Component{
  constructor(props) {
    super(props);
    this.state = { 
      difficulties: ['Easy','Medium','Hard', "MiniMax", "ExpectiMax"],
      players: ['Computer','Two Player'],
      grid: new Grid(),
      agent: new AI(0),
      descriptionModal: false,
    };
  };

  componentDidMount = () => {
    if (this.state.grid.playerMode === 0 && this.state.grid.currPlayer === 1) {
      let grid = this.state.grid;
      let agentAction = this.state.agent.getFirstMove();
      grid.updateMove(agentAction);
      this.setState({grid: grid});
    };
  }

  /* ON CLICK FUNCTIONS */

  cellOnClick = (cell) => {
    if (this.state.grid.gridVals[cell]) {
      return;
    }

    const grid = this.state.grid;
    grid.updateMove(cell);
    if (grid.playerMode !== 1){
      // against computer
      let agentAction = this.state.agent.getAction(grid);
      grid.updateMove(agentAction);
    }
    this.setState({grid: grid});
  }

  modeOnClick = () => {
    const grid = this.state.grid
    grid.updateMode();
    this.resetOnClick();
    // grid.resetGrid();
    this.setState({grid: grid});
  };

  difficultyOnClick = () => {
    // const grid = this.state.grid;
    this.resetOnClick();
    const agent = this.state.agent;
    // grid.resetGrid();
    agent.updateDifficulty();
    this.setState({
      agent: agent, 
      // grid: grid
    });
  };

  resetOnClick = () => {
    // function to reset the grid
    const grid = this.state.grid;
    grid.resetGrid();

    if (grid.playerMode === 0 && grid.currPlayer === 1) {
      let agentAction = this.state.agent.getFirstMove();
      grid.updateMove(agentAction);
    };
    this.setState({grid: grid});
  };

  toggleDescription = () => {
    this.setState({descriptionModal: !this.state.descriptionModal})
    console.log(this.state.descriptionModal)
  }

  /* RENDERING FUNCTIONS */

  renderGameMode = () => {
    // renders buttons for selecting number of players and difficulty, as well as option to reset board
    const grid = this.state.grid
    return (
      <div className="grid grid-cols-2 gap-2 w-1/4 text-center mt-2">
        <button id="toggle-button" onClick={() => this.modeOnClick()}> {this.state.players[grid.playerMode]} </button>
        <button id="toggle-button" onClick={() => this.difficultyOnClick()}> {this.state.difficulties[this.state.agent.difficulty]} </button>
        <button id="toggle-button" className="col-span-2 w-1/2 justify-self-center" onClick={() => this.resetOnClick()}> Reset</button>
      </div>
    );
  };

  renderCell = (n) => {
    const grid = this.state.grid
    // renders each individual cell depending on whether it contains a value
    if (grid.gameState > -1) {
      var className = '';
      if (grid.gameState === 0) {
        className = "bg-red-200";
      } else if (grid.winningTriplet.includes(n)){
        className = "bg-emerald-400";
      } else {
        className = "active:bg-red-500";
      };
    } else if (this.state.grid.gridVals[n]) {
      className = "active:bg-red-500";
    } else{
      className = "hover:bg-emerald-200";
    };
    return (
      <button className={className} id="cell-button" onClick={()=> this.cellOnClick(n)}>
        {grid.gridVals[n]}
      </button>
    );
  };

  renderGrid = () => {
    // renders the tic tac toe grid
    return (
      <div className="grid grid-cols-3 grid-row-3 w-3/12">
        <div className="border-r-2 border-b-2" id="cell">
          {this.renderCell(0)}
        </div>
        <div className="border-b-2 border-r-2" id="cell">
          {this.renderCell(1)}
        </div>
        <div className="border-b-2 " id="cell">
          {this.renderCell(2)}
        </div>
        <div className="border-b-2 border-r-2" id="cell">
          {this.renderCell(3)}
        </div>
        <div className="border-b-2 border-r-2" id="cell">
          {this.renderCell(4)}
        </div>
        <div className="border-b-2" id="cell">
          {this.renderCell(5)}
        </div>
        <div className="border-r-2" id="cell">
          {this.renderCell(6)}
        </div>
        <div className="border-r-2" id="cell">
          {this.renderCell(7)}
        </div>
        <div className="" id="cell">
          {this.renderCell(8)}
        </div>
      </div>
    );
  };

  render() {
    return (
      <main className="min-h-screen" id="tictactoe">
        <div className="container space-y-4">
          <div className="">
            {this.state.descriptionModal ? (
              <DescriptionModal
                toggle= {this.toggleDescription}
              />
            ): null}
          </div>
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
            <button id="toggle-button" className="px-2" onClick={this.toggleDescription}>
              How To Play
            </button>
          </div>
        </div>
      </main>
    );
  };
};

export default TicTacToe;
