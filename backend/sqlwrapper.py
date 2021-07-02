import sqlite3

def insertItem(eventTitle, eventDesc, itemType):
    db = sqlite3.connect('main.db')
    cur = db.cursor()

    if itemType == "announcements":
        cur.execute('''CREATE TABLE IF NOT EXISTS announcements(
            id integer PRIMARY KEY,
            eventTitle text NOT NULL,
            eventDesc text NOT NULL);
        ''')

        cur.execute('''
            INSERT INTO announcements(eventTitle, eventDesc) VALUES(?, ?);
            ''', (eventTitle, eventDesc))

    elif itemType == "events":
        cur.execute('''CREATE TABLE IF NOT EXISTS events(
            id integer PRIMARY KEY,
            eventTitle text NOT NULL,
            eventDesc text NOT NULL);
        ''')

        cur.execute('''
            INSERT INTO events(eventTitle, eventDesc) VALUES(?, ?);
            ''', (eventTitle, eventDesc))
    
    else:
        pass


    db.commit()
    db.close()

def listItems(itemType):
    db = sqlite3.connect('main.db')
    cur = db.cursor()

    if itemType == "announcements":
        cur.execute('''CREATE TABLE IF NOT EXISTS announcements(
            id integer PRIMARY KEY,
            eventTitle text NOT NULL,
            eventDesc text NOT NULL);
        ''')

        cur.execute("SELECT * FROM announcements")

    elif itemType == "events":
        cur.execute('''CREATE TABLE IF NOT EXISTS events(
            id integer PRIMARY KEY,
            eventTitle text NOT NULL,
            eventDesc text NOT NULL);
        ''')

        cur.execute("SELECT * FROM events")

    elif itemType == "scores":
        cur.execute('''CREATE TABLE IF NOT EXISTS scores(
            id integer PRIMARY KEY,
            red text NOT NULL,
            blue text NOT NULL,
            yellow text NOT NULL,
            green text NOT NULL);
        ''')

        cur.execute("SELECT * FROM scores")
    
    else:
        pass

    announcements = cur.fetchall()
    db.commit()
    db.close()
    return announcements

def insertScore(red, blue, yellow, green):
    db = sqlite3.connect('main.db')
    cur = db.cursor()
    cur.execute('''CREATE TABLE IF NOT EXISTS scores(
        id integer PRIMARY KEY,
        red text NOT NULL,
        blue text NOT NULL,
        yellow text NOT NULL,
        green text NOT NULL);
    ''')

    try:
        cur.execute("DELETE FROM scores WHERE id=1")
    except:
        pass

    cur.execute('''
        INSERT INTO scores(red, blue, yellow, green) VALUES(?, ?, ?, ?);
        ''', (red, blue, yellow, green))

    db.commit()
    db.close()

def deleteItem(index, itemType):
    db = sqlite3.connect('main.db')
    cur = db.cursor()

    if itemType == "announcements":
        cur.execute('''CREATE TABLE IF NOT EXISTS announcements(
            id integer PRIMARY KEY,
            eventTitle text NOT NULL,
            eventDesc text NOT NULL);
        ''')

        cur.execute("DELETE FROM announcements WHERE id=?", index)

    elif itemType == "events":
        cur.execute('''CREATE TABLE IF NOT EXISTS events(
            id integer PRIMARY KEY,
            eventTitle text NOT NULL,
            eventDesc text NOT NULL);
        ''')

        cur.execute("DELETE FROM events WHERE id=?", index)
    else:
        pass

    db.commit()
    db.close()