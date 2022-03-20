from enum import Enum
from typing import List

import uvicorn
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from pydantic import BaseModel

from notificationSender import send_message
from rediswrapper import get_leaderboard, increment_score
from sqlwrapper import (
    deleteItem,
    deleteUser,
    insertBibleVerse,
    insertItem,
    insertScore,
    insertUser,
    listItems,
    listPushTokens,
    listUsers,
)

from markdown import markdown
from bs4 import BeautifulSoup

app = FastAPI()


class itemTypes(Enum):
    ANNOUNCEMENTS = "announcements"
    EVENTS = "events"


class teamColors(Enum):
    RED = "red"
    GREEN = "green"
    BLUE = "blue"
    YELLOW = "yellow"
    NONE = "none"


class user(BaseModel):
    deviceID: str
    name: str
    teamColor: teamColors
    pushToken: str = None
    gpa: float = None


class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except:
                continue

    async def broadcast_leaderboard(self):
        await self.broadcast(await get_leaderboard())


ConnMan = ConnectionManager()


def stripMarkdown(text: str) -> str:

    # md -> html -> text since BeautifulSoup can extract text cleanly
    html = markdown(text)

    # extract text
    soup = BeautifulSoup(html, "html.parser")
    text = "".join(soup.findAll(text=True))

    return text


def splitArr(arr: list, numToSplit: int):
    masterList = []
    tempList = []
    for i in range(len(arr)):
        tempList.append(arr[i])
        if (i + 1) % numToSplit == 0:
            masterList.append(tempList)
            tempList = []
    masterList.append(tempList)
    return masterList


@app.get("/")
def get():
    return {"Status": True, "Version": "1.3.6", "sportsday": True}


@app.post("/pushNotification/")
async def push(token: str, title: str, message: str, itemType: itemTypes):
    if itemType == itemTypes.ANNOUNCEMENTS:
        page = {"Link": "MainTab/News"}
    elif itemType == itemTypes.EVENTS:
        page = {"Link": "MainTab/Team Color"}
    else:
        page = None
    send_message(token, title, message, data=page)
    return "Success"


@app.post("/pushNotificationAll/")
async def pushall(title: str, message: str, itemType: itemTypes):
    if itemType == itemTypes.ANNOUNCEMENTS:
        page = {"Link": "MainTab/News"}
    elif itemType == itemTypes.EVENTS:
        page = {"Link": "MainTab/Team Color"}
    else:
        page = None
    for pushTokens in splitArr(listPushTokens(), 10):
        send_message(pushTokens, title, message, data=page)
    return "Success"


@app.post("/insertItem/")
def insert(eventName: str, eventDesc: str, itemType: itemTypes, notify: bool):
    insertItem(eventName, eventDesc, itemType.value)
    strippedEventDesc = stripMarkdown(eventDesc)
    if notify:
        if itemType == itemTypes.ANNOUNCEMENTS:
            page = {"Link": "MainTab/News"}
        else:
            page = {"Link": "MainTab/Team Color"}
        for pushTokens in splitArr(listPushTokens(), 10):
            send_message(
                pushTokens, eventName, strippedEventDesc.split("--")[0], data=page
            )
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
async def insertuser(User: user):
    User_dict = User.dict()
    insertUser(
        User_dict["deviceID"],
        User_dict["name"],
        User_dict["teamColor"].value,
        User_dict["pushToken"],
        User_dict["gpa"],
    )
    return User


@app.post("/deleteUser/")
async def deleteuser(deviceID: str):
    deleteUser(deviceID)
    return "Success"


@app.get("/users/")
async def listusers():
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


@app.get("/popcat/leaderboard/")
async def get_popcat_leaderboard():
    return await get_leaderboard()


@app.websocket("/popcat/")
async def popcat_ws(websocket: WebSocket):
    await ConnMan.connect(websocket)
    try:
        await websocket.send_json(await get_leaderboard())
        while True:
            data = await websocket.receive_json()
            await increment_score(data)
            await ConnMan.broadcast_leaderboard()
    except WebSocketDisconnect:
        ConnMan.disconnect(websocket)


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=5500, log_level="info", reload=True)
