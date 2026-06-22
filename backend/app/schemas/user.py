from datetime import datetime
from pydantic import BaseModel

from app.models.user import UserRole


class UserBase(BaseModel):
    username: str
    email: str | None = None
    full_name: str
    role: UserRole = UserRole.VIEWER
    department_id: int | None = None
    section_id: int | None = None
    card_uid: str | None = None


class UserCreate(UserBase):
    password: str


class UserUpdate(BaseModel):
    email: str | None = None
    full_name: str | None = None
    role: UserRole | None = None
    department_id: int | None = None
    section_id: int | None = None
    is_active: bool | None = None
    card_uid: str | None = None
    password: str | None = None


class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None


class LoginRequest(BaseModel):
    username: str
    password: str
