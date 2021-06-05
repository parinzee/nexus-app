import sqlite3

def insertItem(eventTitle, eventDesc, itemType):
    db = sqlite3.connect('main.db')
    cur = db.cursor()

    if itemType == "events":
        cur.execute('''CREATE TABLE IF NOT EXISTS events(
            id integer PRIMARY KEY,
            eventTitle text NOT NULL,
            eventDesc text NOT NULL);
        ''')

        cur.execute('''
            INSERT INTO events(eventTitle, eventDesc) VALUES(?, ?);
            ''', (eventTitle, eventDesc))

    elif itemType == "activities":
        cur.execute('''CREATE TABLE IF NOT EXISTS activities(
            id integer PRIMARY KEY,
            eventTitle text NOT NULL,
            eventDesc text NOT NULL);
        ''')

        cur.execute('''
            INSERT INTO activities(eventTitle, eventDesc) VALUES(?, ?);
            ''', (eventTitle, eventDesc))
    
    elif itemType == "competitions":
        cur.execute('''CREATE TABLE IF NOT EXISTS competitions(
            id integer PRIMARY KEY,
            eventTitle text NOT NULL,
            eventDesc text NOT NULL);
        ''')

        cur.execute('''
            INSERT INTO competitions(eventTitle, eventDesc) VALUES(?, ?);
            ''', (eventTitle, eventDesc))
    else:
        pass


    db.commit()
    db.close()

def listItems(itemType):
    db = sqlite3.connect('main.db')
    cur = db.cursor()

    if itemType == "events":
        cur.execute('''CREATE TABLE IF NOT EXISTS events(
            id integer PRIMARY KEY,
            eventTitle text NOT NULL,
            eventDesc text NOT NULL);
        ''')

        cur.execute("SELECT * FROM events")

    elif itemType == "activities":
        cur.execute('''CREATE TABLE IF NOT EXISTS activities(
            id integer PRIMARY KEY,
            eventTitle text NOT NULL,
            eventDesc text NOT NULL);
        ''')

        cur.execute("SELECT * FROM activities")

    elif itemType == "competitions":
        cur.execute('''CREATE TABLE IF NOT EXISTS competitions(
            id integer PRIMARY KEY,
            eventTitle text NOT NULL,
            eventDesc text NOT NULL);
        ''')

        cur.execute("SELECT * FROM competitions")
    
    else:
        pass

    events = cur.fetchall()
    return events