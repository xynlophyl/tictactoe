import Grid from './GridState.js'

class AI {
  constructor(difficulty) {
    this.difficulty = difficulty;
    this.agents = [new RandomAgent(), new BlockAgent(), new NextMoveAgent(), new MiniMaxAgent(), new ExpectiMaxAgent()];
    this.initialVals = [3,2,3,2,4,2,3,2,3]
    this.grid = new Grid()
  }

  updateDifficulty() {
    this.difficulty = (this.difficulty+1)%(this.agents.length);
    console.log(['easy: random', 'med: block','hard: next','minimax','expecti'][this.difficulty])
  };

  getAction(grid) {
    // return this.agents[this.difficulty].getAction(grid);
    let action = this.agents[this.difficulty].getAction(grid)
    return action;
  }

  getFirstMove() {
    // get first move for search agents using eval function, since otherwise it will always start in the center
    // uses weighted average of the actual evaluations for each cell to get a random first move

    let returnProb = Math.random()*24;

    let prefixSum = 0
    for (let i = 0; i < this.initialVals.length; i++){
      prefixSum += this.initialVals[i];
      if (prefixSum > returnProb) {
        return i;
      };
    };
  };
}

class searchAgent {

  eval(gridVals) {
    let score = 0
    for (let row = 0; row < 3; row ++) { // evaluates row
      let cell = row*3;
      score += this.evalLine(gridVals, [cell, cell+1, cell+2]);
    }

    for (let cell = 0; cell < 3; cell ++) {
      score += this.evalLine(gridVals, [cell, cell+3, cell+6]);
    }

    score += this.evalLine(gridVals, [0,4,8])
    score += this.evalLine(gridVals, [2,4,6])
    return score;
  }

  evalLine(gridVals, cells) {
    let counts = [0,0]

    for (let cell of cells) {
      if (gridVals[cell] === "X") {
        counts[0] += 1
      } else if (gridVals[cell] === "O") {
        counts[1] += 1
      }
    }

    if (counts[0] === 3) {
      return 100
    } else if (counts[1] === 3) {
      return -100
    } else if (counts[0] === 2) {
      return 10 - counts[1]
    } else if(counts[1] === 2) {
      return -10 + counts[0]
    } else {
      return counts[0] - counts[1]
    }
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
      let nextGrid = grid.getNextGridVals(cell, 0)
      if (grid.winCheck(nextGrid)[0]> 0) {
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
      // makes any self winning move
      let nextGrid = grid.getNextGridVals(cell, 1)
      if (grid.winCheck(nextGrid)[0] > 0) {
        return cell;
    }};

    for (let cell of actions) {
      // blocks any winning player move
      let nextGrid = grid.getNextGridVals(cell, 0)
      if (grid.winCheck(nextGrid)[0] > 0) {
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
      let nextGridVals = grid.getNextGridVals(cell, 1)
      let [state, winningTriplet] = grid.endCheck(nextGridVals);

      if (state >= 0) {
        val = this.eval(nextGridVals);
      } else {
        let nextGrid = new Grid(1);
        nextGrid.gridVals = nextGridVals;
        val = this.miniMax(nextGrid, 1);
      }

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

    for (let cell of grid.getLegalActions(grid.gridVals)) {
      let nextGridVals = grid.getNextGridVals(cell, player)
      const [state, winningTriplet] = grid.endCheck(nextGridVals)

      if (state >= 0) {
        evals.push(this.eval(nextGridVals));
      } else {
        // append the eval of all ending grid states
        let nextGrid = new Grid(player);
        // console.log(nextGrid.currPlayer)
        nextGrid.gridVals = nextGridVals;
        evals.push(this.miniMax(nextGrid, depth+1));
    }};
    if (player === 1) {
      // return computer best move
      return Math.max(...evals)
    } else {
      // return players best move
      return Math.min(...evals)
    }
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
      let nextGridVals = grid.getNextGridVals(cell, 1)
      let [state, winningTriplet] = grid.endCheck(nextGridVals);

      if (state >= 0) {
        val = this.eval(nextGridVals);
      } else {
        let nextGrid = new Grid(1);
        nextGrid.gridVals = nextGridVals;
        val = this.expectiMax(nextGrid, 1);
      }

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

    for (let cell of grid.getLegalActions(grid.gridVals)) {
      let nextGridVals = grid.getNextGridVals(cell, player)
      const [state, winningTriplet] = grid.endCheck(nextGridVals)

      if (state >= 0) {
        // console.log(nextGridVals, this.eval(nextGridVals))
        evals.push(this.eval(nextGridVals));
      } else {
        // append the eval of all ending grid states
        let nextGrid = new Grid(player);
        // console.log(nextGrid.currPlayer)
        nextGrid.gridVals = nextGridVals;
        evals.push(this.expectiMax(nextGrid, depth+1));
    }};
    if (player === 1) {
      // return computer best move
      return Math.max(...evals);
    }
    // return players best move
    return evals.reduce((currSum, curr) => currSum + curr, 0)/evals.length;
  };
};

export default AI;
