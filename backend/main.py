import uvicorn
from fastapi import FastAPI
from os import environ
from sqlwrapper import insertItem, listItems, deleteItem

app = FastAPI()

@app.get("/")
async def listItem():
    items = dict()
    for i in ["activities", "competitions", "events"]:
        items[i] = listItems(i)
    
    return items

@app.post("/insertItem/")
async def insert(eventName: str, eventDesc: str, itemType:str):
    insertItem(eventName, eventDesc, itemType)
    return "Success"


@app.post("/deleteItem/")
async def delete(id: int, itemType: str):
    deleteItem(str(id), itemType)
    return "Success"

if __name__ == "__main__":
   uvicorn.run("main:app", host="0.0.0.0", port=5500, log_level="info", reload=True)
