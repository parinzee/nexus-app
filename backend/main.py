import uvicorn
from fastapi import FastAPI
from sqlwrapper import insertItem, insertScore, insertBibleVerse, insertUser, listUsers, listItems, deleteItem
from enum import Enum

app = FastAPI()

class itemTypes(Enum):
    ANNOUNCEMENTS = "announcements"
    EVENTS = "events"

class teamColors(Enum):
    RED = "red"
    GREEN = "green"
    BLUE = "blue"
    YELLOW = "yellow"

@app.post("/insertItem/")
async def insert(eventName: str, eventDesc: str, itemType: itemTypes):
    insertItem(eventName, eventDesc, itemType.value)
    return "Success"

@app.post("/deleteItem/")
async def delete(id: int, itemType: itemTypes):
    deleteItem(str(id), itemType.value)
    return "Success"

@app.post("/insertScore/")
async def insertscore(red: int, blue: int, yellow: int, green: int):
    insertScore(str(red), str(blue), str(yellow), str(green))
    return "Success"

@app.post("/insertVerse/")
async def insertverse(verse: str):
    insertBibleVerse(verse)
    return "Success"

@app.post("/insertUser/")
async def insertUser(name: str, teamColor: teamColors, pushToken: str = None):
    insertUser(name, teamColor, pushToken)
    return "Success"

@app.post("/updatePushToken/")
async def updatePushToken(name: str, pushToken: str):
    raise NotImplementedError

@app.get("/users/")
async def listUsers():
    return listUsers()

@app.get("/announcements/")
async def listannouncements():
    return listItems("announcements")

@app.get("/events/")
async def listevents():
    return listItems("events")

@app.get("/scores/")
async def listscores():
    return listItems("scores")

@app.get("/verse/")
async def listverse():
    return listItems("verse")

@app.get("/")
async def listItem():
    return {"Clicker": False}

if __name__ == "__main__":
   uvicorn.run("main:app", host="0.0.0.0", port=5500, log_level="info", reload=True)
