from datetime import date, timedelta, datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.models.briefing import Briefing, BriefingType, BriefingStatus
from app.models.worker import Worker
from app.models.user import User
from app.schemas.briefing import BriefingCreate, BriefingUpdate, BriefingResponse, BriefingConfirmRequest
from app.core.deps import get_current_user

router = APIRouter()


def calculate_next_date(briefing_type: BriefingType, conducted_at: datetime, period_days: int | None) -> date | None:
    if briefing_type == BriefingType.REPEAT and period_days:
        return (conducted_at + timedelta(days=period_days)).date()
    return None


def determine_status(next_date: date | None) -> BriefingStatus:
    if next_date is None:
        return BriefingStatus.VALID
    today = date.today()
    if today > next_date:
        return BriefingStatus.OVERDUE
    if (next_date - today).days <= 7:
        return BriefingStatus.APPROACHING
    return BriefingStatus.VALID


@router.get("/", response_model=list[BriefingResponse])
async def list_briefings(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    worker_id: int = Query(None),
    briefing_type: BriefingType = Query(None),
    status: BriefingStatus = Query(None),
    department_id: int = Query(None),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    query = select(Briefing)
    if worker_id:
        query = query.where(Briefing.worker_id == worker_id)
    if briefing_type:
        query = query.where(Briefing.briefing_type == briefing_type)
    if status:
        query = query.where(Briefing.status == status)
    if department_id:
        query = query.where(Briefing.department_id == department_id)
    query = query.order_by(Briefing.conducted_at.desc()).offset(skip).limit(limit)
    result = await db.execute(query)
    return result.scalars().all()


@router.post("/", response_model=BriefingResponse)
async def create_briefing(
    data: BriefingCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # Validate reason for unplanned/targeted
    if data.briefing_type in (BriefingType.UNPLANNED, BriefingType.TARGETED) and not data.reason:
        raise HTTPException(400, "Reason required for unplanned/targeted briefings")

    next_date = calculate_next_date(data.briefing_type, data.conducted_at, data.repeat_period_days)
    status = determine_status(next_date)

    briefing = Briefing(
        **data.model_dump(),
        next_briefing_date=next_date,
        status=status,
    )
    db.add(briefing)
    await db.commit()
    await db.refresh(briefing)
    return briefing


@router.get("/{briefing_id}", response_model=BriefingResponse)
async def get_briefing(
    briefing_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Briefing).where(Briefing.id == briefing_id))
    briefing = result.scalar_one_or_none()
    if not briefing:
        raise HTTPException(status_code=404, detail="Briefing not found")
    return briefing


@router.put("/{briefing_id}", response_model=BriefingResponse)
async def update_briefing(
    briefing_id: int,
    data: BriefingUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Briefing).where(Briefing.id == briefing_id))
    briefing = result.scalar_one_or_none()
    if not briefing:
        raise HTTPException(status_code=404, detail="Briefing not found")
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(briefing, field, value)
    # Recalculate
    next_date = calculate_next_date(briefing.briefing_type, briefing.conducted_at, briefing.repeat_period_days)
    briefing.next_briefing_date = next_date
    briefing.status = determine_status(next_date)
    await db.commit()
    await db.refresh(briefing)
    return briefing


@router.post("/{briefing_id}/confirm/worker", response_model=BriefingResponse)
async def confirm_briefing_worker(
    briefing_id: int,
    data: BriefingConfirmRequest,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Briefing).where(Briefing.id == briefing_id))
    briefing = result.scalar_one_or_none()
    if not briefing:
        raise HTTPException(status_code=404, detail="Briefing not found")

    # Verify worker card
    worker_result = await db.execute(select(Worker).where(Worker.id == briefing.worker_id))
    worker = worker_result.scalar_one_or_none()
    if not worker or worker.card_uid != data.card_uid:
        raise HTTPException(status_code=400, detail="Invalid worker card")

    briefing.worker_confirmed = True
    briefing.worker_confirmed_at = datetime.now(timezone.utc)
    await db.commit()
    await db.refresh(briefing)
    return briefing


@router.post("/{briefing_id}/confirm/instructor", response_model=BriefingResponse)
async def confirm_briefing_instructor(
    briefing_id: int,
    data: BriefingConfirmRequest,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Briefing).where(Briefing.id == briefing_id))
    briefing = result.scalar_one_or_none()
    if not briefing:
        raise HTTPException(status_code=404, detail="Briefing not found")

    # Verify instructor card
    from app.models.user import User as UserModel
    user_result = await db.execute(select(UserModel).where(UserModel.card_uid == data.card_uid))
    user = user_result.scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=400, detail="Invalid instructor card")

    briefing.instructor_confirmed = True
    briefing.instructor_confirmed_at = datetime.now(timezone.utc)
    await db.commit()
    await db.refresh(briefing)
    return briefing
