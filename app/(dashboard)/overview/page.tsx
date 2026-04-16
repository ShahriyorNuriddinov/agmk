import { memo } from "react";
import { BasicInfoCard } from "@/components/overview/BasicInfoCard";
import { ContactCard } from "@/components/overview/ContactCard";
import { KpiCard } from "@/components/overview/KpiCard";
import { TeamCard } from "@/components/overview/TeamCard";
import { RecentActivityCard } from "@/components/overview/RecentActivityCard";
import { UpcomingEventsCard } from "@/components/overview/UpcomingEventsCard";
import { AchievementsCard } from "@/components/overview/AchievementsCard";

const OverviewPage = () => (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
                <h2 className="text-2xl font-bold">Обзор профиля</h2>
                <p className="text-muted-foreground">Основные сведения о месте работы и текущей деятельности</p>
            </div>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <BasicInfoCard />
                <ContactCard />
                <KpiCard />
            </div>
            <div className="space-y-6">
                <TeamCard />
                <RecentActivityCard />
                <UpcomingEventsCard />
                <AchievementsCard />
            </div>
        </div>
    </div>
);

export default memo(OverviewPage);
