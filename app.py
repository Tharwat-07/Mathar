import eel
from create import make
import time
import os 

eel.init('web')

@eel.expose
def hi(*args):

    x,y,*_ = args
    data = list(zip(x, map(str,y.values())))

    m = make(data)
    print(m)
    return m

eel.start('index.html',port=86)


