"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FoodOverviewTab } from "@/components/food-vouchers/FoodOverviewTab";
import { FoodTransactionsTab } from "@/components/food-vouchers/FoodTransactionsTab";
import { FoodPricesTab } from "@/components/food-vouchers/FoodPricesTab";
import { FoodLocationsTab } from "@/components/food-vouchers/FoodLocationsTab";
import { FoodAnalyticsTab } from "@/components/food-vouchers/FoodAnalyticsTab";
import { FoodReportModal } from "@/components/food-vouchers/FoodReportModal";

export default function FoodVouchersPage() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Талоны питания</h2>
                    <p className="text-muted-foreground">Лечебно-профилактическое и буфетное питание</p>
                </div>
                <button
                    onClick={() => setModalOpen(true)}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium h-9 px-4 rounded-md transition-colors"
                >
                    <Download className="h-4 w-4" />
                    Выгрузить отчет
                </button>
            </div>

            <Tabs defaultValue="overview" className="flex flex-col gap-2">
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="overview">Обзор</TabsTrigger>
                    <TabsTrigger value="transactions">Транзакции</TabsTrigger>
                    <TabsTrigger value="prices">Прайс-лист</TabsTrigger>
                    <TabsTrigger value="locations">Точки питания</TabsTrigger>
                    <TabsTrigger value="analytics">Аналитика</TabsTrigger>
                </TabsList>

                <TabsContent value="overview"><FoodOverviewTab /></TabsContent>
                <TabsContent value="transactions"><FoodTransactionsTab /></TabsContent>
                <TabsContent value="prices"><FoodPricesTab /></TabsContent>
                <TabsContent value="locations"><FoodLocationsTab /></TabsContent>
                <TabsContent value="analytics"><FoodAnalyticsTab /></TabsContent>
            </Tabs>

            {modalOpen && <FoodReportModal onClose={() => setModalOpen(false)} />}
        </div>
    );
}
