"use client";

import { memo } from "react";
import { UserPlus, Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { EmployeesListTab } from "@/components/employees/EmployeesListTab";
import { EmployeesDepartmentsTab } from "@/components/employees/EmployeesDepartmentsTab";
import { EmployeesAnalyticsTab } from "@/components/employees/EmployeesAnalyticsTab";
import { EmployeesNewHiresTab } from "@/components/employees/EmployeesNewHiresTab";

const HRPage = () => (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
                <h2 className="text-2xl font-bold">Сотрудники предприятия</h2>
                <p className="text-muted-foreground">Управление персоналом и кадровая аналитика</p>
            </div>
            <div className="flex items-center space-x-2">
                <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" aria-hidden />
                    Экспорт
                </Button>
                <Button>
                    <UserPlus className="h-4 w-4 mr-2" aria-hidden />
                    Добавить сотрудника
                </Button>
            </div>
        </div>

        <Tabs defaultValue="list" className="flex flex-col gap-2">
            <TabsList className="w-fit">
                <TabsTrigger value="list">Список сотрудников</TabsTrigger>
                <TabsTrigger value="departments">По отделам</TabsTrigger>
                <TabsTrigger value="analytics">Аналитика</TabsTrigger>
                <TabsTrigger value="new-hires">Новые сотрудники</TabsTrigger>
            </TabsList>

            <TabsContent value="list">
                <EmployeesListTab />
            </TabsContent>
            <TabsContent value="departments">
                <EmployeesDepartmentsTab />
            </TabsContent>
            <TabsContent value="analytics">
                <EmployeesAnalyticsTab />
            </TabsContent>
            <TabsContent value="new-hires">
                <EmployeesNewHiresTab />
            </TabsContent>
        </Tabs>
    </div>
);

export default memo(HRPage);
