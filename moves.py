class Moves():
    def __init__(self, lst,pIdx):
        self.count = 1
        self.pIdx = pIdx
        self.mLst = lst
        self.root = None
        self.sub1 = None
        self.sub2 = None
        self.sub3 = None
        self.sub4 = None
        self.sub5 = None
        self.sub6 = None
        self.sub7 = None
        self.sub8 = None
        self.sub9 = None
        self.formLeaves()

    def formLeaves(self):
        for i in self.mlst:
            if type(i) == int:
                self.root = i
                self.count -= 1
            else:
                if self.count == 1:
                    self.sub1 = Moves(i)
                if self.count == 2:
                    self.sub2 = Moves(i)
                if self.count == 3:
                    self.sub3 = Moves(i)
                if self.count == 4:
                    self.sub4 = Moves(i)
                if self.count == 5:
                    self.sub5 = Moves(i)
                if self.count == 6:
                    self.sub6 = Moves(i)
                if self.count == 7:
                    self.sub7 = Moves(i)
                if self.count == 8:
                    self.sub8 = Moves(i)
                if self.count == 9:
                    self.sub9 = Moves(i)
            self.count += 1
    def __str__(self):
        return str_aux(self)
    def str_aux(self):
        lst = []


