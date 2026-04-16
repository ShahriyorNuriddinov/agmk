"use client";

import { memo, useState } from "react";
import { Plus } from "lucide-react";
import { CalendarCard } from "@/components/calendar/CalendarCard";
import { TodayCard } from "@/components/calendar/TodayCard";
import { WorkScheduleCard } from "@/components/calendar/WorkScheduleCard";
import { DeadlinesCard } from "@/components/calendar/DeadlinesCard";
import { HolidaysCard } from "@/components/calendar/HolidaysCard";

const CalendarPage = () => {
    const [date, setDate] = useState<Date | undefined>(new Date());

    const todayLabel = new Date().toLocaleDateString("ru-RU", {
        weekday: "long", day: "numeric", month: "long", year: "numeric",
    });

    const selectedLabel = date
        ? date.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" })
        : "выбранную дату";

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">Календарь</h1>
                    <p className="text-muted-foreground text-sm mt-0.5">Сегодня: {todayLabel}</p>
                </div>
                <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                    <Plus className="h-4 w-4" />
                    Новое событие
                </button>
            </div>
            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <CalendarCard date={date} onSelect={setDate} selectedLabel={selectedLabel} />
                </div>
                <div className="space-y-6">
                    <TodayCard />
                    <WorkScheduleCard />
                    <DeadlinesCard />
                    <HolidaysCard />
                </div>
            </div>
        </div>
    );
};

export default memo(CalendarPage);
