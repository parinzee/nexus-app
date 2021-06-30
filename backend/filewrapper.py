def write(message):
    file = open("lastedited.txt", "w")
    file.write(message)
    file.close()

def read():
    file = open("lastedited.txt", "r")
    text = file.read()
    print(text)
    file.close()
    return text