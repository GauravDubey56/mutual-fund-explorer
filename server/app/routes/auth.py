from fastapi import APIRouter, HTTPException, status

from pydantic import BaseModel
from app.services.auth_service import login

router = APIRouter()


class LoginData(BaseModel):
    username: str
    password: str


@router.post("/login")
async def login_for_access_token(form_data: LoginData):
    access_token = login(form_data.username, form_data.password)
    if not access_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return {"access_token": access_token, "token_type": "bearer"}
