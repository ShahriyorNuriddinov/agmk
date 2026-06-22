from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.router import api_router
from app.db.session import engine, Base


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Create tables on startup
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    # Seed admin user
    from app.db.session import async_session
    from app.models.user import User, UserRole
    from app.core.security import get_password_hash
    from sqlalchemy import select
    async with async_session() as session:
        result = await session.execute(select(User).where(User.username == "admin"))
        if not result.scalar_one_or_none():
            admin = User(
                username="admin",
                email="admin@agmk.uz",
                hashed_password=get_password_hash("admin123"),
                full_name="Администратор системы",
                role=UserRole.ADMIN,
                is_active=True,
            )
            session.add(admin)
            await session.commit()
    yield


app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_STR)


@app.get("/")
async def root():
    return {"message": "OT Safety System API", "version": "1.0.0"}
