from pydantic import BaseModel


class EnterpriseDashboard(BaseModel):
    total_workers: int
    active_briefings: int
    overdue_briefings: int
    active_knowledge_checks: int
    overdue_knowledge_checks: int
    compliance_percentage: float


class DepartmentAnalytics(BaseModel):
    department_id: int
    department_name: str
    worker_count: int
    total_briefings: int
    overdue_briefings: int
    total_knowledge_checks: int
    overdue_knowledge_checks: int
    compliance_percentage: float


class SectionAnalytics(BaseModel):
    section_id: int
    section_name: str
    department_name: str
    briefing_status_valid: int
    briefing_status_approaching: int
    briefing_status_overdue: int
    check_status_valid: int
    check_status_approaching: int
    check_status_overdue: int
    overdue_workers: list[dict]
    compliance_percentage: float


class WorkerCard(BaseModel):
    worker_id: int
    personnel_number: str
    full_name: str
    department_name: str
    section_name: str | None
    profession_name: str
    briefing_history: list[dict]
    knowledge_check_history: list[dict]
    upcoming_briefings: list[dict]
    upcoming_checks: list[dict]
