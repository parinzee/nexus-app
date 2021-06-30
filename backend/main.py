import uvicorn
from fastapi import FastAPI
from sqlwrapper import insertItem, listItems, deleteItem
from filewrapper import read, write
from datetime import datetime

app = FastAPI()

@app.get("/lastEdited")
async def getTime():
    return read()

@app.get("/")
async def listItem():
    items = dict()
    for i in ["activities", "competitions", "events"]:
        items[i] = listItems(i)
    
    return items

@app.post("/insertItem/")
async def insert(eventName: str, eventDesc: str, itemType:str):
    now = datetime.now()
    dateTime = now.strftime("%d/%m/%Y %H:%M:%S")
    insertItem(eventName, eventDesc, itemType)
    write(dateTime)
    return "Success"


@app.post("/deleteItem/")
async def delete(id: int, itemType: str):
    now = datetime.now()
    dateTime = now.strftime("%d/%m/%Y %H:%M:%S")
    deleteItem(str(id), itemType)
    write(dateTime)
    return "Success"

if __name__ == "__main__":
   uvicorn.run("main:app", host="0.0.0.0", port=5500, log_level="info", reload=True)
