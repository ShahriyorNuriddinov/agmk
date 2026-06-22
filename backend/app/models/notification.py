import enum
from datetime import datetime, timezone

from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Enum as SAEnum, Text, Boolean
from sqlalchemy.orm import relationship

from app.db.session import Base


class NotificationType(str, enum.Enum):
    BRIEFING_APPROACHING = "briefing_approaching"
    BRIEFING_OVERDUE = "briefing_overdue"
    CHECK_APPROACHING = "check_approaching"
    CHECK_OVERDUE = "check_overdue"


class Notification(Base):
    """Уведомление (Notification)"""
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    notification_type = Column(SAEnum(NotificationType), nullable=False)
    title = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    related_worker_id = Column(Integer, ForeignKey("workers.id"), nullable=True)
    related_briefing_id = Column(Integer, nullable=True)
    related_check_id = Column(Integer, nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    user = relationship("User")
    worker = relationship("Worker")
