import os
import redis
from urllib.parse import urlparse
from operator import itemgetter

url = urlparse(os.environ.get("REDIS_URL"))
r = redis.Redis(
    host=url.hostname,
    port=url.port,
    username=url.username,
    password=url.password,
    ssl=True,
    ssl_cert_reqs=None,
)


def increment_score(data: dict):
    deviceID, team, clicks = itemgetter("deviceID", "team", "clicks")(data)
    # Only run these if clicks are divisible by 2 to not stress out redis
    if clicks % 2 == 0:
        # First increment the team, then add individual scores
        r.zincrby("teams", clicks, team)
        r.zadd("individual", {deviceID: clicks})
