from tkinter import *
from tkinter import messagebox
class Grid(object):
    def __init__(self,a1 = "1",a2="2",a3="3",b1="4",b2="5",b3="6",c1="7",c2="8",c3="9"):
        self.dict = {1:a1,2:a2,3:a3,4:b1,5:b2,6:b3,7:c1,8:c2,9:c3}
        self.makeSpaces()
    def makeSpaces(self): #probably not the best way to form this, can work on this in the end

        '''
        instantiating vars to represent fillable spaces on grid
        '''
        self.a1 = self.dict[1]
        self.a2 = self.dict[2]
        self.a3 = self.dict[3]
        self.b1 = self.dict[4]
        self.b2 = self.dict[5]
        self.b3 = self.dict[6]
        self.c1 = self.dict[7]
        self.c2 = self.dict[8]
        self.c3 = self.dict[9]

    def __str__(self):
        '''
        creating a string representation of grid (for visualization)
        [replace with pygame or turtle]
        '''
        One = "    {}    |   {}    |   {}    ".format(self.a1,self.a2,self.a3)
        Two = "    {}    |   {}    |   {}    ".format(self.b1,self.b2,self.b3)
        Three = "    {}    |   {}    |   {}    ".format(self.c1,self.c2,self.c3)
        sep = "  -----------------------"
        return "{}\n{} \n{}\n{}\n{}".format(One,sep,Two,sep,Three)
    def fillIn(self,space,idx):
        '''
        fills in space on grid with X or O, depending on which players' turn
        space: space to fill in, idx: who fills it in
        '''
        assert idx == 1 or idx == 0
        if idx ==1:
            self.dict[int(space)] = "#"
        else: #idx=0
            self.dict[int(space)] = "X"
        self.makeSpaces()
    def fillInCheck(self,x):
        '''
        check for if space is filled in, returns error if already filled, runs self.fillIn otherwise
        x: user input of grid/space number (1-9)
        '''
        try:
            x = int(x)
        except ValueError: #input value not an integer
            return True, 3
        if x >9 or x < 1: #error 2: x outside of range
            return True, 2
        if self.dict[x] == "X" or self.dict[x] == "#": #error 1: space x already filled
            return True, 1
        return False, 0 #no error
    def remove(self,x):
        '''
        for AI: removes a filled in space
        x: grid number
        '''
        self.dict[x] = str(x)
    def endCheck(self,pIdx):
        '''
        checks for an endgame, returns a value representing the outcome (p1 win : 0, p2/computer win: 1, draw: 2)
        pIdx: player index
        '''
        assert pIdx == 0 or pIdx == 1
        if pIdx == 0:
            sym = "X"
        else:
            sym = "#"
        if self.b2 == sym:
            if (self.a1 == sym and self.c3 == sym) or (self.c1 == sym and self.a3 == sym) or (self.a2 == sym and self.c2 == sym) or (self.b1 == sym and self.b3 == sym):
                return False, pIdx
        if self.a1 == sym:
            if (self.b1 == sym and self.c1 == sym) or (self.a2 == sym and self.a3 == sym):
                return False, pIdx
        if self.c3 == sym:
            if (self.c2 == sym and self.c1 == sym) or (self.a3 == sym and self.b3 == sym):
                return False, pIdx
        for i in self.dict: #check to see if all spaces are filled
            if self.dict[i] !=  "X" and self.dict[i] != "#":
                return True, 3 #not all spaces filled
        return False, 2 #Draw





