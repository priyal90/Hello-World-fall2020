import turtle
import colorsys


t = turtle.Turtle()
t.speed(0)
t.screen.screensize(600,600)
t.screen.setworldcoordinates(600, -550,0,0)

x = 0
y = 0

t.hideturtle()

def box():
    for i in range(4):
         t.forward(50)
         t.right(90)

c = -7


while True:
    t.goto(x,y)
    t.pendown()
    x += 50
    t.begin_fill()
    c += 7
    color = colorsys.hsv_to_rgb(c/1000, 1.0, 1.0)
    t.color(color)
    t.fillcolor(color)
    box()
    t.end_fill()
    
    if x >= 50*12:
        x = 0 
        y += -50
        t.penup()

    if y == -50*11:
        break





turtle.done()


