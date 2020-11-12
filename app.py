import eel



eel.init('web')

@eel.expose
def hi(*args):
    print('js:',args)

    x,y,*_ = args
    data = list(zip(x,y.values()))
    a = open("hei.txt", 'w')
    a.write(str(data))
    a.close()

    return 99

eel.start('index.html',port=86)


