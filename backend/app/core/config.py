from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    PROJECT_NAME: str = "OT Safety System"
    API_V1_STR: str = "/api/v1"

    DATABASE_URL: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/ot_safety"
    DATABASE_URL_SYNC: str = "postgresql://postgres:postgres@localhost:5432/ot_safety"

    SECRET_KEY: str = "your-secret-key-change-in-production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 480

    SMTP_HOST: str = ""
    SMTP_PORT: int = 587
    SMTP_USER: str = ""
    SMTP_PASSWORD: str = ""
    EMAILS_FROM: str = "noreply@agmk.uz"

    NOTIFICATION_DAYS_BEFORE: int = 7

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
