from pydantic import Field
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    dummy_username: str = Field(..., alias='DUMMY_USERNAME')
    dummy_password: str = Field(..., alias='DUMMY_PASSWORD')
    secret_key: str = Field(..., alias='SECRET_KEY')
    algorithm: str = Field(..., alias='ALGORITHM')
    access_token_expire_minutes: int = Field(..., alias='ACCESS_TOKEN_EXPIRE_MINUTES')
    rapidapi_key: str = Field(..., alias='X_RAPID_API_KEY')
    rapidapi_host: str = Field(..., alias='X_RAPID_API_HOST')
    fund_api_url: str = Field(..., alias='FUND_API_URL')
    database_url: str = Field(..., alias='DATABASE_URL')
    db_name: str = Field(..., alias='DB_NAME')
    db_host: str = Field(..., alias='DB_HOST')
    db_port: str = Field(..., alias='DB_PORT')
    db_user: str = Field(..., alias='DB_USER')
    db_password: str = Field(..., alias='DB_PASSWORD')

    class Config:
        env_file = ".env"

settings = Settings()
