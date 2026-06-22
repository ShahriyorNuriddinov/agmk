from datetime import date, timedelta, datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.models.knowledge_check import KnowledgeCheck, CheckResult, CheckStatus
from app.models.worker import Worker
from app.models.user import User
from app.schemas.knowledge_check import (
    KnowledgeCheckCreate, KnowledgeCheckUpdate, KnowledgeCheckResponse, CheckConfirmRequest
)
from app.core.deps import get_current_user

router = APIRouter()

RECHECK_PERIOD_DAYS = 14  # 2 weeks for unsatisfactory result


def calculate_next_check_date(check_date: date, result: CheckResult, validity_days: int) -> date:
    if result == CheckResult.UNSATISFACTORY:
        return check_date + timedelta(days=RECHECK_PERIOD_DAYS)
    return check_date + timedelta(days=validity_days)


def determine_status(next_date: date) -> CheckStatus:
    today = date.today()
    if today > next_date:
        return CheckStatus.OVERDUE
    if (next_date - today).days <= 7:
        return CheckStatus.APPROACHING
    return CheckStatus.VALID


@router.get("/", response_model=list[KnowledgeCheckResponse])
async def list_knowledge_checks(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    worker_id: int = Query(None),
    status: CheckStatus = Query(None),
    result: CheckResult = Query(None),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    query = select(KnowledgeCheck)
    if worker_id:
        query = query.where(KnowledgeCheck.worker_id == worker_id)
    if status:
        query = query.where(KnowledgeCheck.status == status)
    if result:
        query = query.where(KnowledgeCheck.result == result)
    query = query.order_by(KnowledgeCheck.check_date.desc()).offset(skip).limit(limit)
    db_result = await db.execute(query)
    return db_result.scalars().all()


@router.post("/", response_model=KnowledgeCheckResponse)
async def create_knowledge_check(
    data: KnowledgeCheckCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    next_date = calculate_next_check_date(data.check_date, data.result, data.validity_period_days)
    status = determine_status(next_date)

    check = KnowledgeCheck(
        worker_id=data.worker_id,
        check_date=data.check_date,
        protocol_number=data.protocol_number,
        result=data.result,
        validity_period_days=data.validity_period_days,
        next_check_date=next_date,
        status=status,
        chairman_id=data.chairman_id,
    )
    db.add(check)
    await db.commit()
    await db.refresh(check)
    return check


@router.get("/{check_id}", response_model=KnowledgeCheckResponse)
async def get_knowledge_check(
    check_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(KnowledgeCheck).where(KnowledgeCheck.id == check_id))
    check = result.scalar_one_or_none()
    if not check:
        raise HTTPException(status_code=404, detail="Knowledge check not found")
    return check


@router.put("/{check_id}", response_model=KnowledgeCheckResponse)
async def update_knowledge_check(
    check_id: int,
    data: KnowledgeCheckUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(KnowledgeCheck).where(KnowledgeCheck.id == check_id))
    check = result.scalar_one_or_none()
    if not check:
        raise HTTPException(status_code=404, detail="Knowledge check not found")
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(check, field, value)
    check.next_check_date = calculate_next_check_date(check.check_date, check.result, check.validity_period_days)
    check.status = determine_status(check.next_check_date)
    await db.commit()
    await db.refresh(check)
    return check


@router.post("/{check_id}/confirm/worker", response_model=KnowledgeCheckResponse)
async def confirm_check_worker(
    check_id: int,
    data: CheckConfirmRequest,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(KnowledgeCheck).where(KnowledgeCheck.id == check_id))
    check = result.scalar_one_or_none()
    if not check:
        raise HTTPException(status_code=404, detail="Knowledge check not found")

    worker_result = await db.execute(select(Worker).where(Worker.id == check.worker_id))
    worker = worker_result.scalar_one_or_none()
    if not worker or worker.card_uid != data.card_uid:
        raise HTTPException(status_code=400, detail="Invalid worker card")

    check.worker_confirmed = True
    check.worker_confirmed_at = datetime.now(timezone.utc)
    await db.commit()
    await db.refresh(check)
    return check


@router.post("/{check_id}/confirm/chairman", response_model=KnowledgeCheckResponse)
async def confirm_check_chairman(
    check_id: int,
    data: CheckConfirmRequest,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(KnowledgeCheck).where(KnowledgeCheck.id == check_id))
    check = result.scalar_one_or_none()
    if not check:
        raise HTTPException(status_code=404, detail="Knowledge check not found")

    user_result = await db.execute(select(User).where(User.card_uid == data.card_uid))
    user = user_result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=400, detail="Invalid chairman card")

    check.chairman_confirmed = True
    check.chairman_confirmed_at = datetime.now(timezone.utc)
    check.chairman_id = user.id
    await db.commit()
    await db.refresh(check)
    return check
