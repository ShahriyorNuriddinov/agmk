"use client";

import { memo } from "react";
import { BookOpen, Clock, Award, Star, GraduationCap, Target } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MyCoursesList } from "@/components/training/MyCoursesList";
import { AvailableCoursesTab } from "@/components/training/AvailableCoursesTab";
import { AchievementsTab } from "@/components/training/AchievementsTab";
import { StatisticsTab } from "@/components/training/StatisticsTab";
import { LeaderboardTab } from "@/components/training/LeaderboardTab";

const stats = [
    {
        label: "Завершено курсов", value: "8", icon: GraduationCap, iconCls: "text-green-600",
        sub: <span className="text-xs text-muted-foreground">из 15</span>
    },
    {
        label: "Часов обучения", value: "180", icon: Clock, iconCls: "text-blue-600",
        sub: <span className="text-xs text-muted-foreground">за весь период</span>
    },
    {
        label: "Сертификатов", value: "6", icon: Award, iconCls: "text-yellow-600",
        sub: <span className="text-xs text-muted-foreground">получено</span>
    },
    {
        label: "Средняя оценка", value: "4.7", icon: Target, iconCls: "text-purple-600",
        sub: (
            <div className="flex items-center">
                {[1, 2, 3, 4].map(i => <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" aria-hidden />)}
                <Star className="w-3 h-3 text-gray-300" aria-hidden />
            </div>
        )
    },
];

const TrainingPage = () => (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
                <h2 className="text-2xl font-bold">Учебный центр АГМК</h2>
                <p className="text-muted-foreground">Система обучения и развития персонала (LMS)</p>
            </div>
            <div className="flex items-center gap-3">
                <span className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium text-muted-foreground">
                    Рейтинг: #12
                </span>
                <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium h-9 px-4 rounded-md transition-colors">
                    <BookOpen className="h-4 w-4" />
                    Каталог курсов
                </button>
            </div>
        </div>

        <Tabs defaultValue="my-courses" className="flex flex-col gap-2">
            <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="my-courses">Мои курсы</TabsTrigger>
                <TabsTrigger value="available">Доступные курсы</TabsTrigger>
                <TabsTrigger value="achievements">Достижения</TabsTrigger>
                <TabsTrigger value="statistics">Статистика</TabsTrigger>
                <TabsTrigger value="leaderboard">Рейтинг</TabsTrigger>
            </TabsList>

            <TabsContent value="my-courses" className="space-y-6">
                <div className="grid md:grid-cols-4 gap-4">
                    {stats.map((s, i) => (
                        <div key={i} className="bg-card text-card-foreground rounded-xl border">
                            <div className="p-6 flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">{s.label}</p>
                                    <p className="text-2xl font-bold">{s.value}</p>
                                    <p className="text-xs text-muted-foreground">{s.sub}</p>
                                </div>
                                <s.icon className={`h-8 w-8 ${s.iconCls}`} aria-hidden />
                            </div>
                        </div>
                    ))}
                </div>
                <MyCoursesList />
            </TabsContent>
            <TabsContent value="available">
                <AvailableCoursesTab />
            </TabsContent>
            <TabsContent value="achievements">
                <AchievementsTab />
            </TabsContent>
            <TabsContent value="statistics">
                <StatisticsTab />
            </TabsContent>
            <TabsContent value="leaderboard">
                <LeaderboardTab />
            </TabsContent>
        </Tabs>
    </div>
);

export default memo(TrainingPage);
