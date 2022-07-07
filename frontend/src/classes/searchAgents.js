import React from "react";
import Grid from './GridState.js'

class AI {
  constructor(difficulty) {
    // this.difficulty = difficulty;
    this.difficulty = 4
    this.agents = [new RandomAgent(), new BlockAgent(), new NextMoveAgent(), new MiniMaxAgent(), new ExpectiMaxAgent()];
    this.initialVals = [3,2,3,2,4,2,3,2,3]
  }

  updateDifficulty() {
    this.difficulty = (this.difficulty+1)%(this.agents.length);
  };

  getAction(grid) {
    // return this.agents[this.difficulty].getAction(grid);
    let action = this.agents[this.difficulty].getAction(grid)
    return action;
  }

  getFirstMove() {
    // get first move for search agents using eval function, since otherwise it will always start in the center
    // uses weighted average of the actual evaluations for each cell to get a random first move

    let returnProb = Math.random()*24

    let prefixSum = 0
    for (let i = 0; i < this.initialVals.length; i++){
      prefixSum += this.initialVals[i]
      if (prefixSum > returnProb) {
        return i;
      };
    };
  };
}

class searchAgent {

  evalFunction(gridVals) {
    let score = 0
    for (let cell = 0; cell < gridVals.length; cell++) {
      let player = 1
      if (!gridVals[cell]) {continue;}
      else if (gridVals[cell] == "O") {
        player = 0
      }

      if (cell%3 === 0) {
        score += this.evalLine(gridVals, [cell,cell+1,cell+2], player);
      } else if (cell%3 === 1) {
        score += this.evalLine(gridVals, [cell-1, cell+1, cell+2], player);
      } else {
        score += this.evalLine(gridVals, [cell-2, cell-1, cell], player);
      };

      if (cell/3 < 1) {
        score += this.evalLine(gridVals, [cell, cell+3, cell+6], player);
      } else if (cell/3 < 2) {
        score += this.evalLine(gridVals, [cell-3, cell, cell+3], player);
      } else if (cell/3 < 3){
        score += this.evalLine(gridVals, [cell-6, cell-3, cell+6], player);
      };

      score += this.evalLine(gridVals, [0,4,8], player)
      score += this.evalLine(gridVals, [2,4,6], player)
    }
    return score
  }

  evalLine(gridVals, [x,y,z], player) {
    if (gridVals[x] === gridVals[y] && gridVals[x] === gridVals[z]) {
      return 100 * (-1)**(player+1)
    } else if (gridVals[x] === gridVals[y] || gridVals[x] === gridVals[z] || gridVals[y] === gridVals[z]) {
      return 10 * (-1)**(player+1)
    } else { return (-1)**(player+1)}
  }
}

class RandomAgent {
  // Easy Level: moves randomly
  
  getAction(grid) {
    let actions = grid.getLegalActions(grid.gridVals);
    return actions[Math.floor(Math.random()*actions.length)];
  }
}

class BlockAgent {
  // Medium Level: blocks any cell that allows player to win, else moves randomly

  getAction(grid) {
    let actions = grid.getLegalActions(grid.gridVals);
    for (let cell of actions) {
      if (grid.winCheck(grid.gridVals,cell, 0)[0]> 0) {
        return cell;
    }};
    return actions[Math.floor(Math.random()*actions.length)];
  }
}

class NextMoveAgent {
  // moves to win on current move, or blocks any winning move for player, else moves randomly

  getAction(grid){
    let actions = grid.getLegalActions(grid.gridVals);
    for (let cell of actions) {
      if (grid.winCheck(grid.gridVals, cell, 1)[0] > 0) {
        return cell;
    }};

    for (let cell of actions) {
      if (grid.winCheck(grid.gridVals, cell, 0)[0] > 0) {
        return cell;
    }};
    return actions[Math.floor(Math.random()*actions.length)]; 
  }
}


class MiniMaxAgent extends searchAgent{
  // calculates the best action using the minimax algorithm
  
  getAction(grid) {
    var best_eval = Number.NEGATIVE_INFINITY;
    var best_action = -1;

    for (let cell of grid.getLegalActions(grid.gridVals)) {
      let val = -1;
      let state = grid.winCheck(grid.gridVals, cell, 1);
      if (state[0] > 0) {
        val = this.evalFunction(grid.gridVals);
      } else if (state.gameState === 0) {
        val = this.evalFunction(grid.gridVals);
      } else {
        let nextGrid = new Grid();
        nextGrid.gridVals = grid.getNextGridVals(cell, 1);
        nextGrid.cellsLeft = grid.cellsLeft - 1;
        val = this.miniMax(nextGrid, 1);
      }

      console.log(cell, val)

      if (val > best_eval) {
        best_eval = val;
        best_action = cell; 
      };
    };

    return best_action;
  }

   miniMax(grid, depth) {
    // calculating the best moves for each player
    // max evaluation for its own move, and the min for the player
    let player = (depth-1)%2;
    if (depth > 9) {
      throw Error('Game Error: Depth Exceeded Limit')
    }

    let evals = []
    if (grid.cellsLeft === 0) {
      evals = [this.evalFunction(grid.gridVals)];
    } 
    for (let cell of grid.getLegalActions(grid.gridVals)) {
      let val = -1
      let state = grid.winCheck(grid.gridVals, cell, player)
      let nextGridVals = grid.getNextGridVals(cell, player)

      if (state[0] > 0) {
        val = this.evalFunction(nextGridVals);

      } else {
        // append the eval of all ending grid states
        let nextGrid = new Grid();
        nextGrid.gridVals = nextGridVals;
        nextGrid.cellsLeft = grid.cellsLeft-1;
        val =  this.miniMax(nextGrid, depth+1);
      };

      evals.push(val);
    };
    if (player === 1) {
      // return computer best move
      return Math.max(...evals);
    }
    // return players best move
    return Math.min(...evals);
  };
};

class ExpectiMaxAgent extends searchAgent {
  // returns best moves for each player
  // max evaluation for its own move, expected evaluation for the player

  getAction(grid) {
    var best_eval = Number.NEGATIVE_INFINITY;
    var best_action = -1;

    for (let cell of grid.getLegalActions(grid.gridVals)) {
      let val = -1;
      let state = grid.winCheck(grid.gridVals, cell, 1);
      if (state[0] > 0) {
        val = this.evalFunction(grid.gridVals);
      } else if (state.gameState === 0) {
        val = this.evalFunction(grid.gridVals);
      } else {
        let nextGrid = new Grid();
        nextGrid.gridVals = grid.getNextGridVals(cell, 1);
        nextGrid.cellsLeft = grid.cellsLeft - 1;
        val = this.expectiMax(nextGrid, 1);
      }

      console.log(cell, val)

      if (val > best_eval) {
        best_eval = val;
        best_action = cell; 
      };
    };

    return best_action;
  }

   expectiMax(grid, depth) {
    // calculating the best moves for each player
    // max evaluation for its own move, and the min for the player
    let player = (depth-1)%2;
    if (depth > 9) {
      throw Error('Game Error: Depth Exceeded Limit')
    }

    let evals = []
    if (grid.cellsLeft === 0) {
      evals = [this.evalFunction(grid.gridVals)];
    } 
    for (let cell of grid.getLegalActions(grid.gridVals)) {
      let val = -1
      let state = grid.winCheck(grid.gridVals, cell, player)
      let nextGridVals = grid.getNextGridVals(cell, player)

      if (state[0] > 0) {
        val = this.evalFunction(nextGridVals);
      } else {
        // append the eval of all ending grid states
        let nextGrid = new Grid();
        nextGrid.gridVals = nextGridVals;
        nextGrid.cellsLeft = grid.cellsLeft-1;
        val = this.expectiMax(nextGrid, depth+1);
      };
      evals.push(val);
    };
    if (player === 1) {
      // return computer best move
      return Math.max(...evals);
    }
    // return players best move
    return evals.reduce((currSum, curr) => currSum + curr, 0)/evals.length;
  };
};


//   getAction(grid) {
//     var best_eval = Number.NEGATIVE_INFINITY;
//     var best_action = -1;

//     grid.getLegalActions().forEach((action) => {
//       let val = -1;
//       let nextGridVals = grid.getnextGridVals(action, 1);
//       if (nextGridVals.gameState > 0) {
//         val = 1;
//       } else if (nextGridVals.gameState === 0) {
//         val = 0;
//       } else {
//         val = this.expectiMax(grid, 1);
//       }
//       if (val > best_eval) {
//         best_eval = val;
//         best_action = action; 
//       };
//     });
//     return best_action;
//   }

//   expectiMax(grid, depth) {
//     let evals = [];
//     let player = (depth-1)%2;
//     let legalActions = grid.getLegalActions();

//     if (depth >= this.depth*2) {
//       return this.evalFunction(grid);
//     };

//     legalActions.forEach((action) => {
//       let nextGridVals = grid.getnextGridVals(action, player)
//       if (nextGridVals.gameState > 0) {
//         evals.push(1);
//       } else if (nextGridVals.gameState === 0) {
//         evals.push(0);
//       } else {
//         // append the eval of all ending grid states, prioritizing faster winning endings
//         evals.append((0.1**depth)*this.expectiMax(nextGridVals,depth+1));
//       }
//     if (player) {
//       // return computer best move
//       return Math.max(evals);
//     } else {
//       // return player best move
//       return evals.reduce((currSum, curr) => currSum + curr, 0);
//     }});
//   };
// };

export default AI;
