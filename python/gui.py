from tkinter import *
from tkinter import messagebox
from grid import *
from ttt_ai import *

class gui():
    def __init__(self,gm = 2, d = 1):
        # root
        self.root = root
        self.name = "ttt"
        self.root.title(self.name)
        self.gm = gm
        self.difficulty = d

        m = Menu(self.root)
        self.root.config(menu=m)

        options_m = Menu(m,tearoff=False)
        m.add_cascade(label="Options",menu=options_m)
        options_m.add_command(label="New Game", command=self.reset)

        gamemode_m = Menu(m,tearoff=False)
        options_m.add_cascade(label="Game Mode", menu = gamemode_m)
        gamemode_m.add_command(label="Single Player", command=self.set_sp)
        gamemode_m.add_command(label="2 Player", command=self.set_mp)


        difficulty_m = Menu(m,tearoff=False)
        options_m.add_cascade(label="Difficulty", menu = difficulty_m)
        difficulty_m.add_command(label="1",command= self.set_d1)
        difficulty_m.add_command(label="2",command= self.set_d2)
        difficulty_m.add_command(label="3",command= self.set_d3)
        difficulty_m.add_command(label="4",command= self.set_d4)

        self.reset()
        print(self.difficulty)
        self.root.mainloop()
    def reset(self):
        self.root.geometry("235x250+100+100")
        self.a1 = Button(self.root, text="1", height=5, width=10, activeforeground="SystemButtonFace", fg="SystemButtonFace",
                    bg="SystemButtonFace", command=lambda: self.b_click(self.a1),)
        self.a2 = Button(self.root, text="2", height=5, width=10, activeforeground="SystemButtonFace", fg="SystemButtonFace",
                    bg="SystemButtonFace", command=lambda: self.b_click(self.a2))
        self.a3 = Button(self.root, text="3", height=5, width=10, activeforeground="SystemButtonFace", fg="SystemButtonFace",
                    bg="SystemButtonFace", command=lambda: self.b_click(self.a3))
        self.b1 = Button(self.root, text="4", height=5, width=10, activeforeground="SystemButtonFace", fg="SystemButtonFace",
                    bg="SystemButtonFace", command=lambda: self.b_click(self.b1))
        self.b2 = Button(self.root, text="5", height=5, width=10, activeforeground="SystemButtonFace", fg="SystemButtonFace",
                    bg="SystemButtonFace", command=lambda: self.b_click(self.b2))
        self.b3 = Button(self.root, text="6", height=5, width=10, activeforeground="SystemButtonFace", fg="SystemButtonFace",
                    bg="SystemButtonFace", command=lambda: self.b_click(self.b3))
        self.c1 = Button(self.root, text="7", height=5, width=10, activeforeground="SystemButtonFace", fg="SystemButtonFace",
                    bg="SystemButtonFace", command=lambda: self.b_click(self.c1))
        self.c2 = Button(self.root, text="8", height=5, width=10, activeforeground="SystemButtonFace", fg="SystemButtonFace",
                    bg="SystemButtonFace", command=lambda: self.b_click(self.c2))
        self.c3 = Button(self.root, text="9", height=5, width=10, activeforeground="SystemButtonFace", fg="SystemButtonFace",
                    bg="SystemButtonFace", command=lambda: self.b_click(self.c3))

        self.grid = Grid()

        self.a1.grid(row=0, column=0)
        self.a2.grid(row=0, column=1)
        self.a3.grid(row=0, column=2)
        self.b1.grid(row=1, column=0)
        self.b2.grid(row=1, column=1)
        self.b3.grid(row=1, column=2)
        self.c1.grid(row=2, column=0)
        self.c2.grid(row=2, column=1)
        self.c3.grid(row=2, column=2)

        self.spaces_dict = {self.a1:1,self.a2:2,self.a3:3,self.b1:4,self.b2:5,self.b3:6,self.c1:7,self.c2:8,self.c3:9}
        self.spaces_lst = [self.a1,self.a2,self.a3,self.b1,self.b2,self.b3,self.c1,self.c2,self.c3]
        self.count = 0

        self.ai = ttt_AI(self.difficulty)
    def set_sp(self):
        self.gm = 1
        print("changed game mode", self.gm)
        self.reset()
    def set_mp(self):
        print("changed game mode", self.gm)
        self.gm = 2
        self.reset()
    def set_d1(self):
        self.difficulty = 1
        self.ai = ttt_AI(self.difficulty)
        self.reset()
    def set_d2(self):
        self.difficulty = 2
        self.ai = ttt_AI(self.difficulty)
        self.reset()
    def set_d3(self):
        self.difficulty = 3
        self.ai = ttt_AI(self.difficulty)
        self.reset()
    def set_d4(self):
        self.difficulty = 4
        self.ai = ttt_AI(self.difficulty)
        self.reset()
    def disableb(self):
        for i in self.spaces_dict:
            i.config(state=DISABLED)
            if i["text"] in ["1","2","3","4","5","6","7","8","9"]:
                i["text"] = " "
    def update_grid(self):
        for i in self.grid.dict:
            if self.grid.dict[i] == "#":
                if self.count%2 == 0:
                    self.spaces_lst[i-1]["text"] = "O"
                    self.spaces_lst[i-1]["fg"] = "black"
                else:
                    self.spaces_lst[i-1]["text"] = "X"
                    self.spaces_lst[i-1]["fg"] = "black"

    def b_click(self,b):
        if b["text"] != "X" and b["text"] != "O":
            if self.gm == 1:
                b["fg"] = "black"
                b["text"] = "X"
            else:
                if self.count%2 == 0:
                    b["fg"] = "black"
                    b["text"] = "X"
                else:
                    b["fg"] = "black"
                    b["text"] = "O"
        else:
            messagebox.showerror(self.name,"space already chosen, please choose another one")
        space = self.spaces_dict[b]
        self.grid.fillIn(space,self.count%2)
        flag, idx = self.grid.endCheck(self.count%2)
        self.count += 1
        if flag:
            if self.gm == 1:
                self.count -= 1
                self.grid = self.ai.computerMove(self.grid)
                self.update_grid()
                self.root.update()
                comp_flag, idx = self.grid.endCheck(1)
                if not comp_flag:
                    self.game_end(idx)
                    self.disableb()
        else:
            self.game_end(idx)
            self.disableb()


    def game_end(self,idx):
        if self.gm == 1:
            if idx == 0:
                messagebox.showinfo(self.name,"you win! congrats!")
            elif idx == 1:
                messagebox.showinfo(self.name,"you lose. better luck next time!")
            else:
                messagebox.showinfo(self.name,"draw! nice try!")
        else:
            if idx == 2:
                messagebox.showinfo(self.name,"Draw!")
            else:
                messagebox.showinfo(self.name,"Player {} wins".format(idx+1))

def create_gui(gm, d):
    canvas.delete("all")
    x = gui(1,d)

def choose_gm():
    print("yes")
    canvas.delete("all")
    gm_l = Label(root,text = "Choose a game mode")
    gm_b1 = Button(root,text = "single player",command=choose_d)
    gm_b2 = Button(root, text="two players",command=lambda: create_gui(2))
    canvas.create_window(120, 125, window=gm_l)
    canvas.create_window(60, 175, window=gm_b1)
    canvas.create_window(180, 175, window=gm_b2)
    canvas.mainloop()
def choose_d():
    canvas.delete("all")
    d_l = Label(root,text="Choose a Difficulty")
    d_b1 = Button(root,text="Easy",command=lambda: create_gui(2,1))
    d_b2 = Button(root, text="Medium", command=lambda: create_gui(2, 2))
    d_b3 = Button(root, text="Hard", command=lambda: create_gui(2, 3))
    d_b4 = Button(root, text="Impossible", command=lambda: create_gui(2, 4))
    canvas.create_window(120, 125, window=d_l)
    canvas.create_window(60, 160, window=d_b1)
    canvas.create_window(180, 160, window=d_b2)
    canvas.create_window(60, 190, window=d_b3)
    canvas.create_window(180, 190, window=d_b4)


root = Tk()
root.title("ttt")
canvas = Canvas(root)
root.geometry("235x270+100+100")
gm = 2
d = 1
l1 = Label(root,text = "Welcome to Tic Tac Toe!")
l2 = Label(root,text = "by Nelson Lin")
b1 = Button(root,text = "Ready to start?",command=choose_gm)
canvas.create_window(117,100,window = l1)
canvas.create_window(117,125, window = l2)
canvas.create_window(117,175, window = b1)
canvas.grid(row = 4, column = 4)
canvas.mainloop()

