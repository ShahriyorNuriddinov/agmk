from fastapi import APIRouter

from app.api.endpoints import (
    auth, departments, workers, briefings,
    knowledge_checks, analytics, notifications,
    reports, audit, professions, users,
)

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["Authentication"])
api_router.include_router(users.router, prefix="/users", tags=["Users"])
api_router.include_router(departments.router, prefix="/departments", tags=["Departments"])
api_router.include_router(professions.router, prefix="/professions", tags=["Professions"])
api_router.include_router(workers.router, prefix="/workers", tags=["Workers"])
api_router.include_router(briefings.router, prefix="/briefings", tags=["Briefings"])
api_router.include_router(knowledge_checks.router, prefix="/knowledge-checks", tags=["Knowledge Checks"])
api_router.include_router(analytics.router, prefix="/analytics", tags=["Analytics"])
api_router.include_router(notifications.router, prefix="/notifications", tags=["Notifications"])
api_router.include_router(reports.router, prefix="/reports", tags=["Reports"])
api_router.include_router(audit.router, prefix="/audit", tags=["Audit Log"])
