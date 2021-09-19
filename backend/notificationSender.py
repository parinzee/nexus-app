from exponent_server_sdk import PushClient, PushMessage
from typing import Union


def send_message(token: Union[list, str], title: str, message: str, data):
    PushClient().publish(
        PushMessage(
            token,
            data,
            title,
            message,
            "default",
            2,
            mutable_content=True,
            priority="high",
        )
    )
