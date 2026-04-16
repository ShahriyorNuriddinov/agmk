"use client";

import { memo } from "react";
import { Download } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CurrentPositionTab } from "@/components/work/tabs/CurrentPositionTab";
import { WorkHistoryTab } from "@/components/work/tabs/WorkHistoryTab";
import { TransfersTab } from "@/components/work/tabs/TransfersTab";
import { PromotionsTab } from "@/components/work/tabs/PromotionsTab";

const WorkPage = () => (
    <div className="space-y-6">
        <div className="flex justify-between items-center">
            <div>
                <h2 className="text-2xl font-bold">Трудовая деятельность</h2>
                <p className="text-muted-foreground">История работы и карьерного роста в АГМК</p>
            </div>
            <button className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white h-9 px-4 py-2 transition-colors">
                <Download className="h-4 w-4 mr-2" />
                Трудовая книжка
            </button>
        </div>

        <Tabs defaultValue="current" className="flex flex-col gap-2">
            <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="current">Текущая должность</TabsTrigger>
                <TabsTrigger value="history">История работы</TabsTrigger>
                <TabsTrigger value="transfers">Переводы</TabsTrigger>
                <TabsTrigger value="promotions">Повышения</TabsTrigger>
            </TabsList>
            <TabsContent value="current" className="space-y-6"><CurrentPositionTab /></TabsContent>
            <TabsContent value="history" className="space-y-6"><WorkHistoryTab /></TabsContent>
            <TabsContent value="transfers" className="space-y-6"><TransfersTab /></TabsContent>
            <TabsContent value="promotions" className="space-y-6"><PromotionsTab /></TabsContent>
        </Tabs>
    </div>
);

export default memo(WorkPage);
