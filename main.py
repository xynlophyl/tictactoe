import random

from ttt_ai import *
from grid import *

def startup():
    flag = True
    numberInput = input("Single Player [1] or Multiplayer [2]? ")
    while flag:
        if numberInput in ["1","2"]:
            if numberInput == "1":
                return 1
            else:
                return 2
            flag = False
        else:
            numberInput = input("please input [1] or [2] to start the game ")

def playerMove(idx,grid): #indexes: player 1 == 0, player 2 == 1
    print("PLAYER ",idx+1,":")
    moveInput = input("enter where you would like to play ([1] to [9]) ")
    inputCheck, errorIdx = grid.fillInCheck(moveInput)
    while inputCheck:
        if errorIdx == 1:
            print("space", moveInput, "has already been filled")
            moveInput = input("please enter an open space ")
        elif errorIdx == 2:
            moveInput = input("please enter a value within the range [1] to [9]")
        elif errorIdx == 3:
            moveInput = input("please enter a integer value within the range [1] to [9]")
        else:
            print("unknown error")
        inputCheck,errorIdx = grid.fillInCheck(moveInput)
    grid.fillIn(moveInput,idx)
    return grid

def endingText(endIdx,i):
    if i == 1:
        if endIdx == 2:
            print("DRAW! GAME OVER!")
        elif endIdx == 0:
            print("You win! Good Job!")
        else:
            print("Computer Wins! Better Luck Next Time!")

        print("-----------------------------------------------\n")
    else:#2 players: i = 2
        if endIdx == 2:
            print("DRAW! GAME OVER!")
        else:
            print("Player", endIdx+1 ,"Wins! Good Job!")
        print("-----------------------------------------------\n")
def dCheck(i):
    try:
        i = int(i)
    except ValueError:
        return False, 1 #Error 1: returned something that is not an int
    if i >5 or i <1:
        return False, 2 #Error 2: returned a value that is not within range 1-5
    return True, 0 #No error

def singlePlayer():
    '''
    add a note that tells the player they are X and Computer is #
    '''
    grid = Grid()
    # difficulty = input("Computer Difficulty: [1,2,3,4,5] ") #Level 1: Easiest, 5: Hardest
    difficulty = 4
    '''
    add a bug catcher to prevent misuse of input
    '''
    dFlag, dIdx = dCheck(difficulty)
    while not dFlag:
        if dIdx == 1:
            difficulty = input("Please input a valid difficulty level [1-5] ")
        else:
            difficulty = input("Please input a value within the difficulty range [1-5] ")
    difficulty = int(difficulty)
    ai = ttt_AI(difficulty)
    endFlag = True
    count = random.randint(1,2)
    if count == 2:
        print(grid)
    while endFlag:
        if count%2 == 0:
            grid = playerMove(0,grid)
        else:
            grid = ai.computerMove(grid)
            print(grid)
        endFlag, endIdx = grid.endCheck(count%2)
        count += 1
    endingText(endIdx,1)

def twoPlayer():
    '''
    add a note that says player1 is X and player2 is #
    '''
    grid = Grid()
    print(grid)
    count = 0
    endFlag = True
    while endFlag:
        grid = playerMove(count%2,grid)
        endFlag, endIdx = grid.endCheck(count%2)
        count += 1
        print(grid)
    endingText(endIdx,2)

def main():
    print("Welcome to Tic-Tac-Toe!")
    flag = True
    while flag:
        playerMode = startup()
        if playerMode == 1:
            singlePlayer()
            '''
            Implement player-AI system
            '''
        elif playerMode == 2:
            '''
            Implement 2 player system
            '''
            twoPlayer()
        restartInput = input("play again? [y] or [n] ")
        if restartInput.lower() == "n":
            print("thanks for playing!")
            flag = False
        elif restartInput.lower() == "y":
            pass
        else:
             print("not sure what that means, please input [y] or [n]")


main()
