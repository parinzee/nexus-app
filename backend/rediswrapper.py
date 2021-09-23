import os
import aioredis
from operator import itemgetter

r = aioredis.from_url(os.environ.get("REDIS_URL"))


async def increment_score(data: dict):
    deviceID, name, team, clicks = itemgetter("deviceID", "name", "team", "clicks")(
        data
    )
    await r.zincrby("teams", 1, team)
    await r.zadd("individual", {f"{deviceID}:{name}": float(clicks)})
