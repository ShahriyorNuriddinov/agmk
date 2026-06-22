from datetime import datetime
from pydantic import BaseModel


class DepartmentBase(BaseModel):
    code: str
    name: str
    head_name: str | None = None
    personnel_count: int = 0


class DepartmentCreate(DepartmentBase):
    pass


class DepartmentUpdate(BaseModel):
    code: str | None = None
    name: str | None = None
    head_name: str | None = None
    personnel_count: int | None = None


class DepartmentResponse(DepartmentBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class SectionBase(BaseModel):
    code: str
    name: str
    department_id: int
    head_name: str | None = None
    personnel_count: int = 0


class SectionCreate(SectionBase):
    pass


class SectionUpdate(BaseModel):
    code: str | None = None
    name: str | None = None
    department_id: int | None = None
    head_name: str | None = None
    personnel_count: int | None = None


class SectionResponse(SectionBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ProfessionBase(BaseModel):
    code: str
    name: str


class ProfessionCreate(ProfessionBase):
    pass


class ProfessionUpdate(BaseModel):
    code: str | None = None
    name: str | None = None


class ProfessionResponse(ProfessionBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True
