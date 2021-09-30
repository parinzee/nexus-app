import os
import psycopg2

DATABASE_URL = os.environ["DATABASE_URL"]


def insertItem(eventTitle: str, eventDesc: str, itemType: str):
    db = psycopg2.connect(DATABASE_URL, sslmode="require")
    cur = db.cursor()

    if itemType == "announcements":
        cur.execute(
            """CREATE TABLE IF NOT EXISTS announcements(
            id SERIAL PRIMARY KEY,
            eventTitle text NOT NULL,
            eventDesc text NOT NULL);
        """
        )

        cur.execute(
            """
            INSERT INTO announcements(eventTitle, eventDesc) VALUES(%s, %s);
            """,
            (eventTitle, eventDesc),
        )

    elif itemType == "events":
        cur.execute(
            """CREATE TABLE IF NOT EXISTS events(
            id SERIAL PRIMARY KEY,
            eventTitle text NOT NULL,
            eventDesc text NOT NULL);
        """
        )

        cur.execute(
            """
            INSERT INTO events(eventTitle, eventDesc) VALUES(%s, %s);
            """,
            (eventTitle, eventDesc),
        )

    else:
        pass

    db.commit()
    cur.close()
    db.close()


def insertUser(deviceID: str, name: str, teamColor: str, pushToken: str, gpa: float):
    db = psycopg2.connect(DATABASE_URL, sslmode="require")
    cur = db.cursor()

    cur.execute(
        """CREATE TABLE IF NOT EXISTS users(
        deviceID text NOT NULL,
        name text NOT NULL,
        teamColor text NOT NULL,
        pushToken text,
        gpa float,
        UNIQUE(deviceID)
        );"""
    )

    if pushToken != None:
        cur.execute("DELETE from users WHERE pushToken=%s;", [pushToken])

    # Fix by creating device key
    cur.execute(
        """INSERT INTO users(deviceID, name, teamColor, pushToken, gpa) 
            VALUES(%s, %s, %s, %s, %s) ON CONFLICT (deviceID) DO UPDATE 
            SET name = EXCLUDED.name, 
            teamColor = EXCLUDED.teamcolor, 
            pushToken = EXCLUDED.pushToken, 
            gpa = EXCLUDED.gpa;""",
        (deviceID, name, teamColor, pushToken, gpa),
    )

    db.commit()
    cur.close()
    db.close()


def listUsers():
    db = psycopg2.connect(DATABASE_URL, sslmode="require")
    cur = db.cursor()

    cur.execute(
        """CREATE TABLE IF NOT EXISTS users(
        deviceID text NOT NULL,
        name text NOT NULL,
        teamColor text NOT NULL,
        pushToken text,
        gpa float,
        UNIQUE(deviceID)
        );"""
    )

    cur.execute("SELECT * FROM users")

    tokens = cur.fetchall()
    db.commit()
    cur.close()
    db.close()
    return tokens


def listPushTokens():
    db = psycopg2.connect(DATABASE_URL, sslmode="require")
    cur = db.cursor()

    cur.execute(
        """CREATE TABLE IF NOT EXISTS users(
        deviceID text NOT NULL,
        name text NOT NULL,
        teamColor text NOT NULL,
        pushToken text,
        gpa float,
        UNIQUE(deviceID)
        );"""
    )

    cur.execute("SELECT pushToken FROM users")

    pushTokens = list(filter(None, list(map(lambda x: x[0], cur.fetchall()))))
    db.commit()
    cur.close()
    db.close()
    return pushTokens


def listItems(itemType: str):
    db = psycopg2.connect(DATABASE_URL, sslmode="require")
    cur = db.cursor()

    if itemType == "announcements":
        cur.execute(
            """CREATE TABLE IF NOT EXISTS announcements(
            id SERIAL PRIMARY KEY,
            eventTitle text NOT NULL,
            eventDesc text NOT NULL);
        """
        )

        cur.execute("SELECT * FROM announcements")

    elif itemType == "events":
        cur.execute(
            """CREATE TABLE IF NOT EXISTS events(
            id SERIAL PRIMARY KEY,
            eventTitle text NOT NULL,
            eventDesc text NOT NULL);
        """
        )

        cur.execute("SELECT * FROM events")

    elif itemType == "scores":
        cur.execute(
            """CREATE TABLE IF NOT EXISTS scores(
            id INTEGER PRIMARY KEY,
            red text NOT NULL,
            blue text NOT NULL,
            yellow text NOT NULL,
            green text NOT NULL);
        """
        )

        cur.execute("SELECT * FROM scores")
    elif itemType == "verse":
        cur.execute(
            """CREATE TABLE IF NOT EXISTS verses(
            id INTEGER PRIMARY KEY,
            verse text NOT NULL);
        """
        )
        cur.execute("SELECT * FROM verses")

    else:
        pass

    items = cur.fetchall()
    db.commit()
    cur.close()
    db.close()
    return items


def insertScore(red: str, blue: str, yellow: str, green: str):
    db = psycopg2.connect(DATABASE_URL, sslmode="require")
    cur = db.cursor()
    try:
        cur.execute("DROP TABLE scores;")
    except:
        pass
    cur.execute(
        """CREATE TABLE IF NOT EXISTS scores(
        id INTEGER PRIMARY KEY,
        red text NOT NULL,
        blue text NOT NULL,
        yellow text NOT NULL,
        green text NOT NULL);
    """
    )

    try:
        cur.execute("DELETE FROM scores WHERE id=1")
    except:
        pass

    cur.execute(
        """
        INSERT INTO scores(id, red, blue, yellow, green) VALUES(1, %s, %s, %s, %s);
        """,
        (red, blue, yellow, green),
    )

    db.commit()
    cur.close()
    db.close()


def insertBibleVerse(verse: str):
    db = psycopg2.connect(DATABASE_URL, sslmode="require")
    cur = db.cursor()
    try:
        cur.execute("DROP TABLE verses;")
    except:
        pass
    cur.execute(
        """CREATE TABLE IF NOT EXISTS verses(
        id INTEGER PRIMARY KEY,
        verse text NOT NULL);
    """
    )

    try:
        cur.execute("DELETE FROM verses WHERE id=1")
    except:
        pass

    cur.execute(
        """
        INSERT INTO verses(id, verse) VALUES(1, %s);
        """,
        [verse],
    )

    db.commit()
    cur.close()
    db.close()


def deleteItem(index: str, itemType: str):
    db = psycopg2.connect(DATABASE_URL, sslmode="require")
    cur = db.cursor()

    if itemType == "announcements":
        cur.execute(
            """CREATE TABLE IF NOT EXISTS announcements(
            id SERIAL PRIMARY KEY,
            eventTitle text NOT NULL,
            eventDesc text NOT NULL);
        """
        )

        cur.execute("DELETE FROM announcements WHERE id=%s", [index])

    elif itemType == "events":
        cur.execute(
            """CREATE TABLE IF NOT EXISTS events(
            id SERIAL PRIMARY KEY,
            eventTitle text NOT NULL,
            eventDesc text NOT NULL);
        """
        )

        cur.execute("DELETE FROM events WHERE id=%s", [index])
    else:
        pass

    db.commit()
    cur.close()
    db.close()


def deleteUser(deviceID: str):
    db = psycopg2.connect(DATABASE_URL, sslmode="require")
    cur = db.cursor()

    cur.execute(
        """CREATE TABLE IF NOT EXISTS users(
        deviceID text NOT NULL,
        name text NOT NULL,
        teamColor text NOT NULL,
        pushToken text,
        gpa float,
        UNIQUE(deviceID)
        );"""
    )

    # Fix by creating device key
    cur.execute("DELETE FROM users WHERE deviceID=%s", [deviceID])

    db.commit()
    cur.close()
    db.close()
