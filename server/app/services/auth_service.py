from app.config import settings
from app.utils.token import create_access_token

def authenticate_user(username: str, password: str):
    if username == settings.dummy_username and password == settings.dummy_password:
        return True
    return False

def login(username: str, password: str):
    if authenticate_user(username, password):
        access_token = create_access_token(data={"username": username, "user_id": 1})
        return access_token
    return None
