import enum
from datetime import date, datetime, timezone

from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Date, Enum as SAEnum, Boolean
from sqlalchemy.orm import relationship

from app.db.session import Base


class CheckResult(str, enum.Enum):
    SATISFACTORY = "satisfactory"          # Удовлетворительно
    UNSATISFACTORY = "unsatisfactory"      # Неудовлетворительно


class CheckStatus(str, enum.Enum):
    VALID = "valid"              # Действующая
    APPROACHING = "approaching"  # Истекающая
    OVERDUE = "overdue"          # Просроченная


class KnowledgeCheck(Base):
    """Проверка знаний (Knowledge Check)"""
    __tablename__ = "knowledge_checks"

    id = Column(Integer, primary_key=True, index=True)
    worker_id = Column(Integer, ForeignKey("workers.id"), nullable=False)
    check_date = Column(Date, nullable=False)
    protocol_number = Column(String(100), nullable=False)
    result = Column(SAEnum(CheckResult), nullable=False)
    validity_period_days = Column(Integer, nullable=False, default=365)
    next_check_date = Column(Date, nullable=False)
    status = Column(SAEnum(CheckStatus), default=CheckStatus.VALID, nullable=False)

    # Confirmation
    worker_confirmed = Column(Boolean, default=False)
    worker_confirmed_at = Column(DateTime(timezone=True), nullable=True)
    chairman_confirmed = Column(Boolean, default=False)
    chairman_confirmed_at = Column(DateTime(timezone=True), nullable=True)
    chairman_id = Column(Integer, ForeignKey("users.id"), nullable=True)

    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    worker = relationship("Worker", back_populates="knowledge_checks")
