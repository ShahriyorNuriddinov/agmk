"use client";

import { memo } from "react";
import { Download, DollarSign, BarChart3, PieChart, Calendar, TrendingUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SalaryCurrentMonth } from "@/components/salary/SalaryCurrentMonth";
import { SalaryHistory } from "@/components/salary/SalaryHistory";
import { SalaryBenefits } from "@/components/salary/SalaryBenefits";
import { SalaryAnalytics } from "@/components/salary/SalaryAnalytics";

const stats = [
    {
        label: "Оклад", value: "850,000 сум",
        icon: DollarSign, trend: null,
    },
    {
        label: "Премии", value: "120,000 сум",
        icon: BarChart3, trend: "+41% к прошлому месяцу",
    },
    {
        label: "Доплаты", value: "70,000 сум",
        icon: PieChart, trend: null,
    },
    {
        label: "К выплате", value: "975,000 сум",
        icon: Calendar, trend: null, valueColor: "text-green-600",
    },
];

const SalaryPage = () => (
    <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
            <div>
                <h2 className="text-2xl font-bold">Заработная плата</h2>
                <p className="text-muted-foreground">Управление доходами и льготами</p>
            </div>
            <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium h-9 px-4 rounded-md transition-colors">
                <Download className="h-4 w-4" />
                Скачать справку о доходах
            </button>
        </div>
        <Tabs defaultValue="current" className="flex flex-col gap-4">
            <TabsList className="w-fit">
                <TabsTrigger value="current">Текущий месяц</TabsTrigger>
                <TabsTrigger value="history">История</TabsTrigger>
                <TabsTrigger value="benefits">Льготы</TabsTrigger>
                <TabsTrigger value="analytics">Аналитика</TabsTrigger>
            </TabsList>

            <TabsContent value="current" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((s) => (
                        <div key={s.label} className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
                            <div className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">{s.label}</p>
                                        <p className={`text-2xl font-bold ${s.valueColor ?? ""}`}>{s.value}</p>
                                        {s.trend && (
                                            <div className="flex items-center space-x-1 mt-1">
                                                <TrendingUp className="h-3 w-3 text-green-500" />
                                                <span className="text-xs text-green-500">{s.trend}</span>
                                            </div>
                                        )}
                                    </div>
                                    <s.icon className="h-8 w-8 text-muted-foreground" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <SalaryCurrentMonth />
            </TabsContent>

            <TabsContent value="history" className="space-y-6">
                <SalaryHistory />
            </TabsContent>

            <TabsContent value="benefits" className="space-y-6">
                <SalaryBenefits />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
                <SalaryAnalytics />
            </TabsContent>
        </Tabs>
    </div>
);

export default memo(SalaryPage);
