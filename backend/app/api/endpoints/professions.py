from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.models.organization import Profession
from app.models.user import User
from app.schemas.organization import ProfessionCreate, ProfessionUpdate, ProfessionResponse
from app.core.deps import get_current_user

router = APIRouter()


@router.get("/", response_model=list[ProfessionResponse])
async def list_professions(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Profession).offset(skip).limit(limit))
    return result.scalars().all()


@router.post("/", response_model=ProfessionResponse)
async def create_profession(
    data: ProfessionCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    prof = Profession(**data.model_dump())
    db.add(prof)
    await db.commit()
    await db.refresh(prof)
    return prof


@router.put("/{profession_id}", response_model=ProfessionResponse)
async def update_profession(
    profession_id: int,
    data: ProfessionUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Profession).where(Profession.id == profession_id))
    prof = result.scalar_one_or_none()
    if not prof:
        raise HTTPException(status_code=404, detail="Profession not found")
    for field, value in data.model_dump(exclude_unset=True).items():
        setattr(prof, field, value)
    await db.commit()
    await db.refresh(prof)
    return prof


@router.delete("/{profession_id}")
async def delete_profession(
    profession_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(select(Profession).where(Profession.id == profession_id))
    prof = result.scalar_one_or_none()
    if not prof:
        raise HTTPException(status_code=404, detail="Profession not found")
    await db.delete(prof)
    await db.commit()
    return {"detail": "Deleted"}
