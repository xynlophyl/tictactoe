# Tic-Tac-Toe
A personal project to explore the use of AI and Game Theory in the simple game of Tic Tac Toe

# Installation

Clone this repository:
```
git clone https://github.com/xynlophyl/tictactoe.git
```

## Deployment

#### 1. Through web app: 

    You can access the web app deployment of the game through the link: xynlophyl.github.io/tictactoe/

#### 2. Through installation (react.js version): 

    cd within the frontend directory, and run the following command:
    ```
    npm start
    ```

#### 3. Through installation (python version):

    cd within the python directory, and run the following command:
    ```
    python main.py
    ```
    
    or

    ```
    python gui.py
    ```


## Development

#### Blueprint

    `frontend/`: My updated, and current primary iteration of Tic Tac Toe and its agents, using ReactJS. Using React 

    `python/`: My initial attempt of developing Tic Tac Toe and its computer AI agent using Python. This implemenation has two forms of board visualization, a command line interface and a simple gui developed using tkinter. The design for the AI agent was my makeshift implementation of Game Trees, inspired from Philip D. Straffin's *Game Theory and Strategy*.



#### Agent Difficulties

    Easy: Agent plays only random moves given the available spaces on the grid

    Medium: Agent plays random moves, but blocks spaces that would allow the player to win on the next turn

    Hard: Agent plays random moves, but can play moves that would allow itself to win in its current turn, or blocks a player's winning move on the next turn. 

    MinMax: Agent utilizes an evaluation function to analyze the current game state, as well as all the other possible states, given the current board. Then, the agent evaluates the best possible move at each turn, taking the maximum evaluation for its own turn and a minimum for its opponent, to determine what it's optimal current move should be.

    Expectimax: Similar to MinMax, but it takes an average evaluation score for each possible move in its opponent's turn, and takes the maximum evaluation for its own turn.


## Development Roadmap: Future Plans

As I continue my development career, and learn more about games and artificial intelligence, I will be looking to continue integrate relevant concepts that I find intriguing into this project.

In the future, I hope to be able to expand the scope of this project, incorporating more advanced concepts, such as alpha-beta pruning and adding depth-limited search, to more efficiently parse the game trees, without having to sacrifice accuracy. 

After that, my next goal is to extend the board from just the 3x3 grid used in Tic Tac Toe, to examine the scope of how well agents are able to analyze larger and more complex game states. To do so, I would need to update the grid components and agent classes to properly utilize m * n grids. Next, I would have to redefine my evaluation function to be able to provide accurate state values, regardless of grid size and structure.

Finally, I wish to research more about different search agents and algorithms, and implement them into my project. These agents could take up multiple forms, from different heuristics and evaluation functions to using different concepts of artificial intelligence, such as reinforcement self-learning agents. Doing so, I would be able to compare the analysis of different agents within the same state. On top of that, I would also be able to set up a environment where agents can compete with each other. This wouldn't be possible in Tic-Tac-Toe, as in a solved zero-sum game, the agents would continuously end in a drawn game state, so there would not be much to learn. But after expanding the grid, the game state would be more complex and would better expose each agent's strengths and weaknesses. 

