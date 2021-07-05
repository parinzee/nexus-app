import os
import psycopg2

DATABASE_URL = os.environ['DATABASE_URL']

def insertItem(eventTitle, eventDesc, itemType):
    db = psycopg2.connect(DATABASE_URL, sslmode='require')
    cur = db.cursor()

    if itemType == "announcements":
        cur.execute('''CREATE TABLE IF NOT EXISTS announcements(
            id integer SERIAL PRIMARY KEY,
            eventTitle text NOT NULL,
            eventDesc text NOT NULL);
        ''')

        cur.execute('''
            INSERT INTO announcements(eventTitle, eventDesc) VALUES(%s, %s);
            ''', (eventTitle, eventDesc))

    elif itemType == "events":
        cur.execute('''CREATE TABLE IF NOT EXISTS events(
            id integer SERIAL PRIMARY KEY,
            eventTitle text NOT NULL,
            eventDesc text NOT NULL);
        ''')

        cur.execute('''
            INSERT INTO events(eventTitle, eventDesc) VALUES(%s, %s);
            ''', (eventTitle, eventDesc))
    
    else:
        pass


    db.commit()
    cur.close()
    db.close()

def listItems(itemType):
    db = psycopg2.connect(DATABASE_URL, sslmode='require')
    cur = db.cursor()

    if itemType == "announcements":
        cur.execute('''CREATE TABLE IF NOT EXISTS announcements(
            id integer SERIAL PRIMARY KEY,
            eventTitle text NOT NULL,
            eventDesc text NOT NULL);
        ''')

        cur.execute("SELECT * FROM announcements")

    elif itemType == "events":
        cur.execute('''CREATE TABLE IF NOT EXISTS events(
            id integer SERIAL PRIMARY KEY,
            eventTitle text NOT NULL,
            eventDesc text NOT NULL);
        ''')

        cur.execute("SELECT * FROM events")

    elif itemType == "scores":
        cur.execute('''CREATE TABLE IF NOT EXISTS scores(
            id integer SERIAL PRIMARY KEY,
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
    cur.close()
    db.close()
    return announcements

def insertScore(red, blue, yellow, green):
    db = psycopg2.connect(DATABASE_URL, sslmode='require')
    cur = db.cursor()
    cur.execute('''CREATE TABLE IF NOT EXISTS scores(
        id integer SERIAL PRIMARY KEY,
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
        INSERT INTO scores(red, blue, yellow, green) VALUES(%s, %s, %s, %s);
        ''', (red, blue, yellow, green))

    db.commit()
    cur.close()
    db.close()

def deleteItem(index, itemType):
    db = psycopg2.connect(DATABASE_URL, sslmode='require')
    cur = db.cursor()

    if itemType == "announcements":
        cur.execute('''CREATE TABLE IF NOT EXISTS announcements(
            id integer SERIAL PRIMARY KEY,
            eventTitle text NOT NULL,
            eventDesc text NOT NULL);
        ''')

        cur.execute("DELETE FROM announcements WHERE id=%s", [index])

    elif itemType == "events":
        cur.execute('''CREATE TABLE IF NOT EXISTS events(
            id integer SERIAL PRIMARY KEY,
            eventTitle text NOT NULL,
            eventDesc text NOT NULL);
        ''')

        cur.execute("DELETE FROM events WHERE id=%s", [index])
    else:
        pass

    db.commit()
    cur.close()
    db.close()