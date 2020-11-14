import eel
from create import make
import time
import os 
import subprocess


#[init]
fileName = ''

eel.init('web')

@eel.expose
def getImages(*args):
    global fileName
    x,y,*_ = args
    data = list(zip(x, map(str,y.values())))
    imgName = make(data)
    fileName = imgName
    imgsPaths = [ './output/'+imgName+'.png',  './output/'+ imgName+' answer.png']
    return imgsPaths

@eel.expose
def openFileLoaction():
        curPath= os.path.join(os.getcwd(), 'web', 'output', fileName+'.png')
        subprocess.Popen(r'explorer /select,"'+curPath+'"')
        return True


eel.start('index.html',port=86)


