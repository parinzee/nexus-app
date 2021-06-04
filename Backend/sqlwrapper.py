import sqlite3

def insertEvent(eventDate, eventDesc):
    db = sqlite3.connect('main.db')
    cur = db.cursor()

    cur.execute('''CREATE TABLE IF NOT EXISTS events(
        id integer PRIMARY KEY,
        eventDate text NOT NULL,
        eventDesc text NOT NULL);
    ''')

    cur.execute('''
        INSERT INTO events(eventDate, eventDesc) VALUES(?, ?);
        ''', (eventDate, eventDesc))

    db.commit()
    db.close()

def listItems():
    db = sqlite3.connect('main.db')
    cur = db.cursor()

    cur.execute('''CREATE TABLE IF NOT EXISTS events(
        id integer PRIMARY KEY,
        eventDate text NOT NULL,
        eventDesc text NOT NULL);
    ''')

    cur.execute("SELECT * FROM events")
    events = cur.fetchall()

    return events

insertEvent("28/56/2021", "A test event")
print(listItems())