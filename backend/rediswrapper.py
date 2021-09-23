import os
import aioredis
from operator import itemgetter

r = aioredis.from_url(os.environ.get("REDIS_URL"))


async def increment_score(data: dict):
    deviceID, name, team, clicks = itemgetter("deviceID", "name", "team", "clicks")(
        data
    )
    if int(clicks) % 3 == 0:
        await r.zincrby("teams", 3, team)
        await r.zadd("individual", {f"{deviceID}:{name}": float(clicks)})
