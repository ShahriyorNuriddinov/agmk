from datetime import date, datetime
from pydantic import BaseModel

from app.models.knowledge_check import CheckResult, CheckStatus


class KnowledgeCheckBase(BaseModel):
    worker_id: int
    check_date: date
    protocol_number: str
    result: CheckResult
    validity_period_days: int = 365


class KnowledgeCheckCreate(KnowledgeCheckBase):
    chairman_id: int | None = None


class KnowledgeCheckUpdate(BaseModel):
    check_date: date | None = None
    protocol_number: str | None = None
    result: CheckResult | None = None
    validity_period_days: int | None = None


class KnowledgeCheckResponse(KnowledgeCheckBase):
    id: int
    next_check_date: date
    status: CheckStatus
    worker_confirmed: bool
    worker_confirmed_at: datetime | None = None
    chairman_confirmed: bool
    chairman_confirmed_at: datetime | None = None
    chairman_id: int | None = None
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class CheckConfirmRequest(BaseModel):
    card_uid: str
