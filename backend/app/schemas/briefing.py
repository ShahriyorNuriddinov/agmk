from datetime import date, datetime
from pydantic import BaseModel

from app.models.briefing import BriefingType, BriefingStatus


class BriefingBase(BaseModel):
    worker_id: int
    briefing_type: BriefingType
    conducted_at: datetime
    department_id: int
    section_id: int | None = None
    reason: str | None = None
    instructor_name: str
    instructor_id: int | None = None
    repeat_period_days: int | None = None


class BriefingCreate(BriefingBase):
    pass


class BriefingUpdate(BaseModel):
    briefing_type: BriefingType | None = None
    conducted_at: datetime | None = None
    department_id: int | None = None
    section_id: int | None = None
    reason: str | None = None
    instructor_name: str | None = None
    instructor_id: int | None = None
    repeat_period_days: int | None = None


class BriefingResponse(BriefingBase):
    id: int
    next_briefing_date: date | None = None
    status: BriefingStatus
    worker_confirmed: bool
    worker_confirmed_at: datetime | None = None
    instructor_confirmed: bool
    instructor_confirmed_at: datetime | None = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class BriefingConfirmRequest(BaseModel):
    card_uid: str
