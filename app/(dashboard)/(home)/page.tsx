"use client";
import { memo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { StatsRow } from "@/components/dashboard/StatsRow";
import { AnnouncementsCard } from "@/components/dashboard/AnnouncementsCard";
import { TasksCard } from "@/components/dashboard/TasksCard";
import { TeamActivityCard } from "@/components/dashboard/TeamActivityCard";
import { useAuth } from "@/hooks/useAuth";

const Page = () => {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.replace("/about");
    }
  }, [router]);

  const fullName = user?.employee
    ? `${user.employee.firstName} ${user.employee.middleName ?? ""}`
    : "—";

  const position = user?.employee?.position ?? "—";
  const department = user?.employee?.department ?? "—";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Добро пожаловать, {fullName}!</h1>
        <p className="text-muted-foreground">{position}, {department}</p>
      </div>
      <StatsRow />
      <div className="grid lg:grid-cols-3 gap-6">
        <AnnouncementsCard />
        <TasksCard />
        <TeamActivityCard />
      </div>
    </div>
  );
};

export default memo(Page);
