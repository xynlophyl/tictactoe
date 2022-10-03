import React, { Component } from "react";

class DescriptionModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: this.props.toggle,
    };
  }

  render() {
    return (
      <div className="z-50 fixed inset-0 bg-zinc-200 opacity-100">
        <div className="flex h-screen justify-center items-center">
          <div className="flex w-9/12">
            <div className="grid grid-cols-12 pb-4 space-y-4 ">
              <div id="modal-grid-heading">
                  How To Play
              </div>
              <div id="modal-grid-row-subhead"> Goal</div>
              <div className="col-span-9" id="modal-grid-row-desc">
                The goal of this game is to connect 3 in a row before your opponent can
              </div>
              <div id="modal-grid-row-subhead"> Change Mode </div>
              <div className="col-span-9" id="modal-grid-row-desc">
                toggle the left-side button at the top to choose between the different game modes: Two Player, Computer
              </div>
              <div id="modal-grid-row-subhead"> Change Difficulty </div>
              <div className="col-span-9" id="modal-grid-row-desc">
                toggle the right-side button at the top to choose between the different game modes: Easy, Medium, Hard, MinMax, ExpectiMax
              </div>
              <div id="modal-grid-heading">
                Agent Difficulties
              </div>
              <div id="modal-grid-row-subhead">Easy</div>
              <div className="col-span-9" id="modal-grid-row-desc">
                Agent plays only random moves given the available spaces on the grid             
              </div>
              <div id="modal-grid-row-subhead">Medium</div>
              <div className="col-span-9" id="modal-grid-row-desc">
              Agent plays random moves, but blocks spaces that would allow the player to win on the next turn.
              </div>
              <div id="modal-grid-row-subhead">Hard</div>
              <div className="col-span-9" id="modal-grid-row-desc">
              Agent plays random moves, but can play moves that would allow itself to win in its current turn, or blocks a player's winning move on the next turn.
              </div>
              <div id="modal-grid-row-subhead">MinMax/Expectimax</div>
              <div className="col-span-9" id="modal-grid-row-desc">
                Agent utilizes an evaluation function to analyze the current game state, 
                as well as all the other possible states, given the current board. 
                Then, the agent evaluates the best possible move at each turn using the current search algorithm 
                to determine what it's optimal current move should be.
              </div>
              <div className="col-span-full text-center">
                <button id="toggle-button" onClick={this.state.toggle}>
                  Close
                </button>
              </div>
            </div>
          </div>


        </div>
      </div>
    )

  }
}

export default DescriptionModal;


{/* <div className="relative flex flex-col px-4">
<div className="flex flex-col justify-between text-justify pb-10 border-2 border-green-300">
  <div className="pb-4 text-center border-2 border-red-300">
    <h1 className="text-xl font-bold"> Agent subhead Implementations </h1>
  </div>
  <div className="flex flex-col justify-between">
    <div className="flex flex-row justify-start">
      <p className="font-bold pr-10 ">Easy: </p>
      <p> Agent plays only random moves given the open spaces on the grid </p>
    </div>
    <div className="flex flex-row justify-start">
      <p className="font-bold pr-10"> Medium:  </p>
      <p> Agent plays random moves, but blocks spaces that would allow the player to win on the next turn </p>
    </div>
    <div className="">
      Hard: Agent plays random moves, but can play moves that would allow itself to win in the current turn, or blocks the player's winning move.
    </div>
    <div>
      MiniMax/Expectimax: Agent utilizes an evaluation function to analyze the current game state, as well as all the other possible states, given the current board. Then, the agent evaluates the best possible move at each turn using the current search algorithm to determine what it's optimal current move should be.  
    </div>
  </div>

</div>

<div className="flex flex-col justify-between border-2 border-green-300">
  <div className="pb-4 text-center border-2 border-red-300">
    <h1 className="text-xl font-bold"> Game Setup </h1>
  </div>
  <div className="">
    test
  </div>

</div>

<div className="absolute bottom-1 right-1/2 border-red-300 border-2">
  <button onClick={this.state.toggle}>
    Close
  </button>
</div>

</div> */}