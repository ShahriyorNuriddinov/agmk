from datetime import date, datetime
from pydantic import BaseModel

from app.models.worker import WorkerStatus


class WorkerBase(BaseModel):
    personnel_number: str
    last_name: str
    first_name: str
    middle_name: str | None = None
    department_id: int
    section_id: int | None = None
    profession_id: int
    hire_date: date
    total_experience_years: int = 0
    profession_experience_years: int = 0
    status: WorkerStatus = WorkerStatus.ACTIVE
    card_uid: str | None = None


class WorkerCreate(WorkerBase):
    pass


class WorkerUpdate(BaseModel):
    personnel_number: str | None = None
    last_name: str | None = None
    first_name: str | None = None
    middle_name: str | None = None
    department_id: int | None = None
    section_id: int | None = None
    profession_id: int | None = None
    hire_date: date | None = None
    total_experience_years: int | None = None
    profession_experience_years: int | None = None
    status: WorkerStatus | None = None
    card_uid: str | None = None


class WorkerResponse(WorkerBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class WorkerListResponse(BaseModel):
    id: int
    personnel_number: str
    last_name: str
    first_name: str
    middle_name: str | None = None
    department_id: int
    section_id: int | None = None
    profession_id: int
    status: WorkerStatus
    hire_date: date

    class Config:
        from_attributes = True
