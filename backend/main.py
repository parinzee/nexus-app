import uvicorn
from fastapi import FastAPI
from sqlwrapper import insertItem, insertScore, listItems, deleteItem

app = FastAPI()

@app.get("/")
async def listItem():
    items = dict()
    for i in ["events", "scores", "announcements"]:
        items[i] = listItems(i)
    
    return items

@app.get("/events/")
async def listevents():
    return listItems("events")

@app.get("/scores/")
async def listscores():
    return listItems("scores")

@app.get("/announcements/")
async def listannouncements():
    return listItems("announcements")

@app.post("/insertItem/")
async def insert(eventName: str, eventDesc: str, itemType:str):
    insertItem(eventName, eventDesc, itemType)
    return "Success"

@app.post("/insertScore/")
async def insertscore(red: str, blue: str, yellow:str, green:str):
    insertScore(red, blue, yellow, green)
    return "Success"


@app.post("/deleteItem/")
async def delete(id: int, itemType: str):
    deleteItem(str(id), itemType)
    return "Success"

if __name__ == "__main__":
   uvicorn.run("main:app", host="0.0.0.0", port=5500, log_level="info", reload=True)
