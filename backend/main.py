import uvicorn
from fastapi import FastAPI
from os import environ
from sqlwrapper import insertItem, listItems, deleteItem
from pydantic import ValidationError, validator, BaseModel

app = FastAPI()

class Item(BaseModel):
    eventTitle: str
    eventDesc: str
    itemType: str

    @validator("itemType")
    def validType(cls, v):
        if v != "activities" and v != "events" and v != "competitions":
            raise ValidationError("It must be activities, events, or competitions")
        return v

@app.get("/")
async def listItem():
    items = dict()
    for i in ["activities", "competitions", "events"]:
        items[i] = listItems(i)
    
    return items

@app.post("/insertItem/")
async def insert(item: Item):
    item = dict(item)
    eventName, eventDate, itemType = item.values()
    insertItem(eventName, eventDate, itemType)
    return "Success"


@app.post("/deleteItem/")
async def delete(id: int, itemType: str):
    deleteItem(str(id), itemType)
    return "Success"

if __name__ == "__main__":
   uvicorn.run("main:app", host="0.0.0.0", port=5500, log_level="info", reload=True)
