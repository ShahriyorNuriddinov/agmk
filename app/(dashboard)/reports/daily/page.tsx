import { memo } from "react";
import { StatsRow } from "@/components/dashboard/StatsRow";
import { AnnouncementsCard } from "@/components/dashboard/AnnouncementsCard";
import { TasksCard } from "@/components/dashboard/TasksCard";
import { TeamActivityCard } from "@/components/dashboard/TeamActivityCard";

const DailyPage = () => (
    <div className="space-y-6">
        <div>
            <h2 className="text-2xl font-bold">Суточная сводка</h2>
            <p className="text-muted-foreground">Ежедневные производственные показатели</p>
        </div>
        <StatsRow />
        <div className="grid lg:grid-cols-3 gap-6">
            <AnnouncementsCard />
            <TasksCard />
            <TeamActivityCard />
        </div>
    </div>
);

export default memo(DailyPage);
