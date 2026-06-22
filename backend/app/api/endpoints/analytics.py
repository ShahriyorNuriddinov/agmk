from fastapi import APIRouter, Depends, Query
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.models.organization import Department, Section
from app.models.worker import Worker, WorkerStatus
from app.models.briefing import Briefing, BriefingStatus
from app.models.knowledge_check import KnowledgeCheck, CheckStatus
from app.models.user import User
from app.schemas.analytics import EnterpriseDashboard, DepartmentAnalytics, SectionAnalytics, WorkerCard
from app.core.deps import get_current_user

router = APIRouter()


@router.get("/dashboard", response_model=EnterpriseDashboard)
async def get_dashboard(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # Total active workers
    workers_result = await db.execute(
        select(func.count(Worker.id)).where(Worker.status == WorkerStatus.ACTIVE)
    )
    total_workers = workers_result.scalar() or 0

    # Briefing stats
    active_briefings_r = await db.execute(
        select(func.count(Briefing.id)).where(Briefing.status == BriefingStatus.VALID)
    )
    active_briefings = active_briefings_r.scalar() or 0

    overdue_briefings_r = await db.execute(
        select(func.count(Briefing.id)).where(Briefing.status == BriefingStatus.OVERDUE)
    )
    overdue_briefings = overdue_briefings_r.scalar() or 0

    # Knowledge check stats
    active_checks_r = await db.execute(
        select(func.count(KnowledgeCheck.id)).where(KnowledgeCheck.status == CheckStatus.VALID)
    )
    active_checks = active_checks_r.scalar() or 0

    overdue_checks_r = await db.execute(
        select(func.count(KnowledgeCheck.id)).where(KnowledgeCheck.status == CheckStatus.OVERDUE)
    )
    overdue_checks = overdue_checks_r.scalar() or 0

    total_records = active_briefings + overdue_briefings + active_checks + overdue_checks
    compliance = ((active_briefings + active_checks) / total_records * 100) if total_records > 0 else 100.0

    return EnterpriseDashboard(
        total_workers=total_workers,
        active_briefings=active_briefings,
        overdue_briefings=overdue_briefings,
        active_knowledge_checks=active_checks,
        overdue_knowledge_checks=overdue_checks,
        compliance_percentage=round(compliance, 1),
    )


@router.get("/departments", response_model=list[DepartmentAnalytics])
async def get_department_analytics(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    departments_result = await db.execute(select(Department))
    departments = departments_result.scalars().all()
    analytics = []

    for dept in departments:
        workers_r = await db.execute(
            select(func.count(Worker.id)).where(
                Worker.department_id == dept.id, Worker.status == WorkerStatus.ACTIVE
            )
        )
        worker_count = workers_r.scalar() or 0

        briefings_r = await db.execute(
            select(func.count(Briefing.id)).where(Briefing.department_id == dept.id)
        )
        total_briefings = briefings_r.scalar() or 0

        overdue_b_r = await db.execute(
            select(func.count(Briefing.id)).where(
                Briefing.department_id == dept.id, Briefing.status == BriefingStatus.OVERDUE
            )
        )
        overdue_briefings = overdue_b_r.scalar() or 0

        # Knowledge checks via workers in this department
        checks_r = await db.execute(
            select(func.count(KnowledgeCheck.id)).join(Worker).where(
                Worker.department_id == dept.id
            )
        )
        total_checks = checks_r.scalar() or 0

        overdue_c_r = await db.execute(
            select(func.count(KnowledgeCheck.id)).join(Worker).where(
                Worker.department_id == dept.id,
                KnowledgeCheck.status == CheckStatus.OVERDUE,
            )
        )
        overdue_checks = overdue_c_r.scalar() or 0

        total = total_briefings + total_checks
        valid = (total_briefings - overdue_briefings) + (total_checks - overdue_checks)
        compliance = (valid / total * 100) if total > 0 else 100.0

        analytics.append(DepartmentAnalytics(
            department_id=dept.id,
            department_name=dept.name,
            worker_count=worker_count,
            total_briefings=total_briefings,
            overdue_briefings=overdue_briefings,
            total_knowledge_checks=total_checks,
            overdue_knowledge_checks=overdue_checks,
            compliance_percentage=round(compliance, 1),
        ))

    return analytics


@router.get("/workers/{worker_id}/card", response_model=WorkerCard)
async def get_worker_card(
    worker_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    from app.models.organization import Profession

    worker_r = await db.execute(select(Worker).where(Worker.id == worker_id))
    worker = worker_r.scalar_one_or_none()
    if not worker:
        from fastapi import HTTPException
        raise HTTPException(404, "Worker not found")

    dept_r = await db.execute(select(Department).where(Department.id == worker.department_id))
    dept = dept_r.scalar_one_or_none()

    section_name = None
    if worker.section_id:
        sect_r = await db.execute(select(Section).where(Section.id == worker.section_id))
        sect = sect_r.scalar_one_or_none()
        section_name = sect.name if sect else None

    prof_r = await db.execute(select(Profession).where(Profession.id == worker.profession_id))
    prof = prof_r.scalar_one_or_none()

    # Briefing history
    briefings_r = await db.execute(
        select(Briefing).where(Briefing.worker_id == worker_id).order_by(Briefing.conducted_at.desc())
    )
    briefings = briefings_r.scalars().all()
    briefing_history = [
        {
            "id": b.id,
            "type": b.briefing_type.value,
            "date": b.conducted_at.isoformat(),
            "instructor": b.instructor_name,
            "status": b.status.value,
            "confirmed": b.worker_confirmed and b.instructor_confirmed,
        }
        for b in briefings
    ]

    # Knowledge check history
    checks_r = await db.execute(
        select(KnowledgeCheck).where(KnowledgeCheck.worker_id == worker_id).order_by(KnowledgeCheck.check_date.desc())
    )
    checks = checks_r.scalars().all()
    check_history = [
        {
            "id": c.id,
            "date": c.check_date.isoformat(),
            "protocol": c.protocol_number,
            "result": c.result.value,
            "status": c.status.value,
            "confirmed": c.worker_confirmed and c.chairman_confirmed,
        }
        for c in checks
    ]

    # Upcoming
    upcoming_briefings = [
        {"id": b.id, "type": b.briefing_type.value, "next_date": b.next_briefing_date.isoformat()}
        for b in briefings if b.next_briefing_date and b.status in (BriefingStatus.VALID, BriefingStatus.APPROACHING)
    ]
    upcoming_checks = [
        {"id": c.id, "next_date": c.next_check_date.isoformat()}
        for c in checks if c.status in (CheckStatus.VALID, CheckStatus.APPROACHING)
    ]

    return WorkerCard(
        worker_id=worker.id,
        personnel_number=worker.personnel_number,
        full_name=f"{worker.last_name} {worker.first_name} {worker.middle_name or ''}".strip(),
        department_name=dept.name if dept else "",
        section_name=section_name,
        profession_name=prof.name if prof else "",
        briefing_history=briefing_history,
        knowledge_check_history=check_history,
        upcoming_briefings=upcoming_briefings,
        upcoming_checks=upcoming_checks,
    )
