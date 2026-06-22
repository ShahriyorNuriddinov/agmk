import enum
from datetime import date, datetime, timezone

from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Date, Enum as SAEnum
from sqlalchemy.orm import relationship

from app.db.session import Base


class WorkerStatus(str, enum.Enum):
    ACTIVE = "active"
    ON_LEAVE = "on_leave"
    DISMISSED = "dismissed"


class Worker(Base):
    """Работник (Worker)"""
    __tablename__ = "workers"

    id = Column(Integer, primary_key=True, index=True)
    personnel_number = Column(String(50), unique=True, nullable=False, index=True)
    last_name = Column(String(100), nullable=False)
    first_name = Column(String(100), nullable=False)
    middle_name = Column(String(100), nullable=True)
    department_id = Column(Integer, ForeignKey("departments.id"), nullable=False)
    section_id = Column(Integer, ForeignKey("sections.id"), nullable=True)
    profession_id = Column(Integer, ForeignKey("professions.id"), nullable=False)
    hire_date = Column(Date, nullable=False)
    total_experience_years = Column(Integer, default=0)
    profession_experience_years = Column(Integer, default=0)
    status = Column(SAEnum(WorkerStatus), default=WorkerStatus.ACTIVE, nullable=False)
    card_uid = Column(String(100), unique=True, nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    department = relationship("Department", back_populates="workers")
    section = relationship("Section", back_populates="workers")
    profession = relationship("Profession", back_populates="workers")
    briefings = relationship("Briefing", back_populates="worker", cascade="all, delete-orphan")
    knowledge_checks = relationship("KnowledgeCheck", back_populates="worker", cascade="all, delete-orphan")

    @property
    def full_name(self) -> str:
        parts = [self.last_name, self.first_name]
        if self.middle_name:
            parts.append(self.middle_name)
        return " ".join(parts)
