from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select, or_
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.models.worker import Worker
from app.models.user import User
from app.schemas.worker import WorkerCreate, WorkerUpdate, WorkerResponse, WorkerListResponse
from app.core.deps import get_current_user

router = APIRouter()


@router.get("/", response_model=list[WorkerListResponse])
async def list_workers(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=200),
    search: str = Query(None),
    department_id: int = Query(None),
    section_id: int = Query(None),
    status: str = Query(None),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    query = select(Worker)
    if search:
        query = query.where(
            or_(
                Worker.last_name.ilike(f"%{search}%"),
                Worker.first_name.ilike(f"%{search}%"),
                Worker.personnel_number.ilike(f"%{search}%"),
            )
        )
    if department_id:
        query = query.where(Worker.department_id == department_id)
    if section_id:
        query = query.where(Worker.section_id == section_id)
    if status:
        query = query.where(Worker.status == status)
    query = query.offset(skip).limit(limit)
    result = await db.execute(query)
    return result.scalars().all()


@router.post("/", response_model=WorkerResponse)
async def create_worker(
    data: WorkerCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    worker = Worker(**data.model_dump())
    db.add(worker)
    await db.commit()
    await db.refresh(worker)
    return worker


@router.get("/{worker_id}", response_model=WorkerResponse)
async def get_worker(
    worker_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Worker).where(Worker.id == worker_id))
    worker = result.scalar_one_or_none()
    if not worker:
        raise HTTPException(status_code=404, detail="Worker not found")
    return worker


@router.put("/{worker_id}", response_model=WorkerResponse)
async def update_worker(
    worker_id: int,
    data: WorkerUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Worker).where(Worker.id == worker_id))
    worker = result.scalar_one_or_none()
    if not worker:
        raise HTTPException(status_code=404, detail="Worker not found")
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(worker, field, value)
    await db.commit()
    await db.refresh(worker)
    return worker


@router.delete("/{worker_id}")
async def delete_worker(
    worker_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Worker).where(Worker.id == worker_id))
    worker = result.scalar_one_or_none()
    if not worker:
        raise HTTPException(status_code=404, detail="Worker not found")
    await db.delete(worker)
    await db.commit()
    return {"detail": "Deleted"}
