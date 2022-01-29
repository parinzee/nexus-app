![ShieldsBadge](https://img.shields.io/badge/Version-1.3.6-brightgreen?style=for-the-badge)
![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green?style=for-the-badge)

# What is this?
This is a *complete full stack **react native - python fastapi** application*

# Techstack
- Frontend:
  - **React Native** (Expo)
  - **Zustand**: State management
  - **Sentry**: Error Reporting
  - **Styled-components**: CSS-in-JS completely custom components built from the ground up.
  - **React Navigation v5**: Navigation and deep linking


- Backend:
  - **Fastapi** (Python)
  - **Postgres SQL**: Storing list of users
  - **Redis**: Storing clicks for real time leaderboard for the [Popcat](https://github.com/Parinz/nexus-app#popcat-event)
  - **Websockets**: Real-time communication with frontend to send leaderboard and recieve clicks. ***This was made specifically for the Popcat Event***

# Architecture/Organization
Code is split into two parts, the *backend* and the *frontend*.

## Backend
- **sqlwrapper.py**: Wrapper that exposes python function to get data from _Postgres Database_
- **rediswrapper.py**: Same as above, except for redis.
- **exponent_server_sdk.py**: Taken from the exponent sdk package. Not pip installed because some changes had to be made in order to support my use case.
- **notificationSender.py**: Wraps around the server sdk above to send **push notifications** to users.
- **main.py**: Main fastapi endpoint which uses all of the functions above. _Websocket handling is also right here._

## Frontend
File structure same as any expo/react native and most names are self-explanatory, so I'll only be going into the _components_ folder.
- **store.js**: Zustand context manager.
- **FirstTime**: Listed accordingly, they are the first pages that the users are presented to in order to sign up.
- **Main**: These are the screens/components that related to the main screen, this is the screen that the users to presented to on every entry into the app.
- **Pages**: Other screens that the users can navigate to. The names in here are self-explanatory.

# Popcat Event
## What is it
Was an event that involved playing a clicker type of game, person/team with highest clicks win.

## Architecture
- Stores leaderboard using a ```redis zset```.
- Clicks and leaderboards are updated ***in real-time*** utilizing **websockets**.

See ```frontend/components/Pages/Tools/Popcat.js``` for further details.
