import enum
from datetime import date, datetime, timezone

from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Date, Enum as SAEnum, Text, Boolean
from sqlalchemy.orm import relationship

from app.db.session import Base


class BriefingType(str, enum.Enum):
    PRIMARY = "primary"          # Первичный на рабочем месте
    REPEAT = "repeat"            # Повторный
    UNPLANNED = "unplanned"      # Внеплановый
    TARGETED = "targeted"        # Целевой


class BriefingStatus(str, enum.Enum):
    VALID = "valid"              # Действителен
    APPROACHING = "approaching"  # Приближается срок
    OVERDUE = "overdue"          # Просрочен


class Briefing(Base):
    """Инструктаж (Briefing)"""
    __tablename__ = "briefings"

    id = Column(Integer, primary_key=True, index=True)
    worker_id = Column(Integer, ForeignKey("workers.id"), nullable=False)
    briefing_type = Column(SAEnum(BriefingType), nullable=False)
    conducted_at = Column(DateTime(timezone=True), nullable=False)
    department_id = Column(Integer, ForeignKey("departments.id"), nullable=False)
    section_id = Column(Integer, ForeignKey("sections.id"), nullable=True)
    reason = Column(Text, nullable=True)  # Основание (для внепланового/целевого)
    instructor_name = Column(String(255), nullable=False)
    instructor_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    next_briefing_date = Column(Date, nullable=True)
    status = Column(SAEnum(BriefingStatus), default=BriefingStatus.VALID, nullable=False)
    repeat_period_days = Column(Integer, nullable=True)  # Периодичность (только для повторного)

    # Confirmation
    worker_confirmed = Column(Boolean, default=False)
    worker_confirmed_at = Column(DateTime(timezone=True), nullable=True)
    instructor_confirmed = Column(Boolean, default=False)
    instructor_confirmed_at = Column(DateTime(timezone=True), nullable=True)

    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    worker = relationship("Worker", back_populates="briefings")
    department = relationship("Department")
    section = relationship("Section")
