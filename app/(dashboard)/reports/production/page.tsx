"use client";

import { memo } from "react";
import { Building, CircleCheckBig, CircleAlert, Clock, Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ReportsDashboardTab } from "@/components/reports/ReportsDashboardTab";
import { ReportsCurrentTab } from "@/components/reports/ReportsCurrentTab";
import { ReportsAnalyticsTab } from "@/components/reports/ReportsAnalyticsTab";
import { ReportsHistoryTab } from "@/components/reports/ReportsHistoryTab";

const ReportsPage = () => (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
                <h2 className="text-2xl font-bold">Отчеты руководителей</h2>
                <p className="text-muted-foreground">Еженедельная отчетность структурных подразделений АГМК</p>
            </div>
            <div className="flex items-center space-x-2">
                <Select defaultValue="current-week">
                    <SelectTrigger className="w-48">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="current-week">Текущая неделя</SelectItem>
                        <SelectItem value="last-week">Прошлая неделя</SelectItem>
                        <SelectItem value="current-month">Текущий месяц</SelectItem>
                    </SelectContent>
                </Select>
                <Button>
                    <Download className="h-4 w-4 mr-2" aria-hidden />
                    Сводный отчет
                </Button>
            </div>
        </div>

        <Tabs defaultValue="dashboard" className="flex flex-col gap-2">
            <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="dashboard">Дашборд</TabsTrigger>
                <TabsTrigger value="current-reports">Текущие отчеты</TabsTrigger>
                <TabsTrigger value="analytics">Аналитика</TabsTrigger>
                <TabsTrigger value="history">История</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-6">
                <ReportsDashboardTab />
            </TabsContent>
            <TabsContent value="current-reports">
                <ReportsCurrentTab />
            </TabsContent>
            <TabsContent value="analytics">
                <ReportsAnalyticsTab />
            </TabsContent>
            <TabsContent value="history">
                <ReportsHistoryTab />
            </TabsContent>
        </Tabs>
    </div>
);

export default memo(ReportsPage);
