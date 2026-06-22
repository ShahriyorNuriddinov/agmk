import enum
from datetime import datetime, timezone

from sqlalchemy import Column, Integer, String, DateTime, Enum as SAEnum, Boolean
from sqlalchemy.orm import relationship

from app.db.session import Base


class UserRole(str, enum.Enum):
    ADMIN = "admin"
    MANAGER = "manager"          # Руководитель предприятия
    DEPARTMENT_HEAD = "department_head"  # Начальник цеха
    SECTION_HEAD = "section_head"       # Начальник участка
    INSTRUCTOR = "instructor"           # Инструктирующее лицо
    SAFETY_ENGINEER = "safety_engineer"  # Инженер по ОТ
    VIEWER = "viewer"


class User(Base):
    """Пользователь системы (System User)"""
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(100), unique=True, nullable=False, index=True)
    email = Column(String(255), unique=True, nullable=True)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255), nullable=False)
    role = Column(SAEnum(UserRole), default=UserRole.VIEWER, nullable=False)
    department_id = Column(Integer, nullable=True)
    section_id = Column(Integer, nullable=True)
    is_active = Column(Boolean, default=True)
    card_uid = Column(String(100), unique=True, nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
