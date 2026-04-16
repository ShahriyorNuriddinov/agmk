"use client";

import { memo, useState } from "react";
import { Download, Search, FileText, Calendar, TrendingUp, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SickLeaveTable } from "@/components/sick-leave/SickLeaveTable";
import { SickLeaveHistory } from "@/components/sick-leave/SickLeaveHistory";
import { SickLeaveAnalytics } from "@/components/sick-leave/SickLeaveAnalytics";
import { SickLeaveRecommendations } from "@/components/sick-leave/SickLeaveRecommendations";

const stats = [
    { label: "Больничных за год", value: "3", sub: "листов", icon: FileText, iconColor: "text-blue-500" },
    { label: "Дней нетрудоспособности", value: "21", sub: "календарных дней", icon: Calendar, iconColor: "text-green-500" },
    { label: "Выплачено пособий", value: "3.7M", sub: "сум", icon: TrendingUp, iconColor: "text-purple-500" },
    { label: "Средняя длительность", value: "7", sub: "дней", icon: Clock, iconColor: "text-orange-500" },
];

const SickLeavePage = () => {
    const [year, setYear] = useState("2025");

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">Больничные листы</h2>
                    <p className="text-muted-foreground">История временной нетрудоспособности</p>
                </div>
                <div className="flex items-center gap-3">
                    <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                        {["2025", "2024", "2023", "2022"].map((y) => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                    <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium h-9 px-4 rounded-md transition-colors">
                        <Download className="h-4 w-4" />
                        Справка
                    </button>
                </div>
            </div>
            <Tabs defaultValue="current" className="flex flex-col gap-4">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="current">Текущий год</TabsTrigger>
                    <TabsTrigger value="history">История</TabsTrigger>
                    <TabsTrigger value="analytics">Аналитика</TabsTrigger>
                    <TabsTrigger value="recommendations">Рекомендации</TabsTrigger>
                </TabsList>

                <TabsContent value="current" className="space-y-4">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {stats.map((s) => (
                            <div key={s.label} className="bg-card text-card-foreground rounded-xl border p-4">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <p className="text-sm text-muted-foreground">{s.label}</p>
                                        <p className="text-2xl font-bold mt-1">{s.value}</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">{s.sub}</p>
                                    </div>
                                    <s.icon className={`h-5 w-5 ${s.iconColor} mt-0.5`} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="bg-card text-card-foreground rounded-xl border px-4 py-3 flex items-center gap-2">
                        <Search className="h-4 w-4 text-muted-foreground shrink-0" />
                        <input
                            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                            placeholder="Поиск по диагнозу, врачу или медучреждению..."
                        />
                    </div>
                    <SickLeaveTable year={year} />
                </TabsContent>

                <TabsContent value="history" className="space-y-6">
                    <SickLeaveHistory />
                </TabsContent>

                <TabsContent value="analytics" className="space-y-6">
                    <SickLeaveAnalytics />
                </TabsContent>

                <TabsContent value="recommendations" className="space-y-6">
                    <SickLeaveRecommendations />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default memo(SickLeavePage);
