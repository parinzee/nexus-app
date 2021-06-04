import uvicorn
from fastapi import FastAPI
from os import environ

app = FastAPI()
passkey = environ.get('PASSKEY')

@app.get("/")
def listItems():
    return "Hello World"


if __name__ == "__main__":
   uvicorn.run("main:app", host="0.0.0.0", port=5500, log_level="info", reload=True)
