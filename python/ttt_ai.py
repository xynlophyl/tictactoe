import random
from grid import *

class move_predict():
    '''
    game move tree for ai to map out every possible outcome and predict the best move
    '''
    def __init__(self, grid,player_idx = 0,space_idx = None):
        '''
        :param grid: grid object
        :param space_idx: space to be filled
        :param player_idx: which player's move
        '''

        self.count = player_idx % 2 #indicates whose move it is, 0 for self, 1 for opponent
        self.idx = space_idx #which space is currently being checked

        ### while prediction is being made, new grids need to be made for computer to use and run hyptotheical scenarios ###
        self.grid = Grid() #grid for predictions
        self.grid.dict = dict(grid.dict) #using directory from previous recursion/original grid
        self.grid.makeSpaces() #fills the spaces in current grid

        self.eval = 0 #evaluation rating of current move (>0 is better for self)
        self.move_lst = [None, None, None, None, None, None, None, None, None] #forms a list that have representative indexes for each space in the grid

        ### evaluation (through recursion) of each move
        if self.idx is not None: #exception: if computer has first move
            self.grid.fillIn(self.idx, self.count)
        if self.grid.endCheck(self.count)[0]: #game has not reached an endgame, so recursion step continues
            self.fill_space()
        else: #game has reached endgame, so evaluation can be formed
            if self.grid.endCheck(self.count)[1] == 1:
                self.eval += 1
            elif self.grid.endCheck(self.count)[1] == 0:
                self.eval -= 1
            else:
                self.eval += 0
    def fill_space(self): #recursion function: fills empty spaces on grid with another move_predict class
        self.move_eval = [] #list to store evalulation ratings for each of the possible next moves
        for i in self.grid.dict:
            if not self.grid.fillInCheck(i)[0]: #space is not filled in yet
                self.move_lst[i-1] = move_predict(self.grid,self.count+1,i)
        for j in self.move_lst:
            if j is None:
                self.move_eval.append(None)
            else:
                self.move_eval.append(j.return_eval())
        self.eval= self.eval_ref_f()
        for k,l in enumerate(self.move_eval):
            if self.eval != l:
                self.move_lst[k] = None
    def eval_ref_f(self):
        lst = []
        for i in self.move_eval:
            if i is not None:
                lst.append(i)
        if self.count == 0:
            eval_ref = max(lst)
        else:
            eval_ref = min(lst)
        return eval_ref
    def return_eval(self): #returns the evaluation of a certain move
        return self.eval

# grid = Grid(a1 = "X",a2 = "#",a3 = "X",b1="#",b2='#',b3='X',c1='X')
# print(grid)
# a = move_predict(grid)
# print(a.move_eval)
# print(a.eval)

class ttt_AI():
    '''
    computer ai system for single player tic tac toe, with a 1-5 difficulty range
    '''
    def __init__(self,difficulty):
        '''
        assigns difficulty of bot
        :param difficulty: (easy) 1-5 (hard)
        '''
        self.difficulty = difficulty
    def winCheck(self,grid,x,pIdx):
        fillCheck, i = grid.fillInCheck(x)
        if not fillCheck:
            grid.fillIn(x,pIdx)
            check,idx = grid.endCheck(pIdx)
            grid.remove(x)
            if not check and idx == pIdx: #someone wins
                return True, grid
        return False, grid
    def compWin(self,grid):
        for i in range(1, 10):
            check, grid = self.winCheck(grid, i,1)
            if check:
                return True, i
        return False, 0
    def playerWin(self,grid):
        for i in range(1, 10):
            check, grid = self.winCheck(grid, i, 0)
            if check:
                return True, i
        return False, 0
    def computerPredict(self,grid):
        x = move_predict(grid)
        self.eval_dict = dict()
        self.eval_lst = list()
        for i,j in enumerate(x.move_lst):
            if j is not None:
                self.eval_lst.append(j.eval)
                if j.eval not in self.eval_dict:
                    self.eval_dict[j.eval] = [i+1]
                else:
                    self.eval_dict[j.eval].append(i+1)
        return self.eval_lst, self.eval_dict

    def computerMove(self,grid): #should always be idx = 1
        if self.difficulty == 1: #computer randomly fills open spaces till game ends
            i = random.randint(1,9)
            flag, idx = grid.fillInCheck(i)
            while flag:
                i = random.randint(1,9)
                flag, idx = grid.fillInCheck(i)
            grid.fillIn(i,1)
        elif self.difficulty == 2: #new function: if there is a chance for the computer to win, it will fill that space
            compCheck, idx = self.compWin(grid) #checks if the computer can win on this turn
            if compCheck:
                grid.fillIn(idx,1)
            else:
                j = random.randint(1,9)
                flag, idx = grid.fillInCheck(j)
                while flag:
                    j = random.randint(1, 9)
                    flag, idx = grid.fillInCheck(j)
                grid.fillIn(j, 1)
        elif self.difficulty == 3: #new function: computer recognizes when player is about to win and blocks it (therefore it can think one move ahead)
            compCheck, idx = self.compWin(grid) #work on this by using winCheck function  (adding a player move consideration)
            if compCheck:
                grid.fillIn(idx, 1)
            else:
                playerCheck, idx = self.playerWin(grid) #checks if the player can win on next turn
                if playerCheck:
                    grid.fillIn(idx, 1)
                else:
                    i = random.randint(1,10)
                    flag, idx = grid.fillInCheck(i)
                    while flag:
                        i = random.randint(1,10)
                        flag, idx = grid.fillInCheck(i)
                    grid.fillIn(i,1)
        elif self.difficulty == 4: #new function: think of a way to make it harder (maybe having it play specifically where it can only win or draw)
            if grid.dict != {1:'1',2:'2',3:'3',4:'4',5:'5',6:'6',7:'7',8:'8',9:'9'}:
                eval_lst, eval_dict = self.computerPredict(grid)
                best_move = max(eval_lst)
                print(eval_dict)
                grid.fillIn(random.choice(eval_dict[best_move]),1)
            else:
                grid.fillIn(random.randint(1,9),1)

        return grid
