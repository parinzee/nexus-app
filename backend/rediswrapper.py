import os
import aioredis
from urllib.parse import urlparse
from operator import itemgetter


url = urlparse(os.environ.get("REDIS_URL"))
r = aioredis.Redis(
    host=url.hostname,
    port=url.port,
    username=url.username,
    password=url.password,
    ssl=False,
    ssl_cert_reqs=None,
    decode_responses=True,
)


async def increment_score(data: dict):
    deviceID, name, team, clicks = itemgetter("deviceID", "name", "team", "clicks")(
        data
    )
    if int(clicks) % 3 == 0:
        await r.zincrby("teams", 1, team)
        await r.zadd("individual", {f"{deviceID}:{name}": float(clicks)})


async def get_leaderboard():
    teamLeaderboard = await r.zrange("teams", 0, -1, True, True)
    individualLeaderboard = await r.zrange("individual", 0, -1, True, True)

    return {
        "i": list(map(lambda x: [x[0].split(":")[1], x[1]], individualLeaderboard)),
        "t": teamLeaderboard,
    }
