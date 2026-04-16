"use client";

import { memo, useState } from "react";
import { Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KindergartenCard } from "@/components/hr/KindergartenCard";
import { MyApplicationsTab } from "@/components/hr/MyApplicationsTab";
import { QueueStatusTab } from "@/components/hr/QueueStatusTab";
import { ApplicationDialog } from "@/components/hr/ApplicationDialog";

const gardens = [
    {
        name: 'Детский сад "Солнышко"',
        address: "ул. Металлургов, 15",
        capacity: "142/150", capacityColor: "text-yellow-600",
        queue: "28 детей", hours: "07:00 - 19:00", director: "Каримова Н.А.",
        ageGroups: ["2-3 года", "3-4 года", "4-5 лет", "5-6 лет"],
        specializations: ["Музыкальное развитие", "Английский язык", "Плавание"],
    },
    {
        name: 'Детский сад "Радуга"',
        address: "ул. Шахтёрская, 8",
        capacity: "115/120", capacityColor: "text-red-600",
        queue: "35 детей", hours: "07:00 - 18:00", director: "Петрова Л.И.",
        ageGroups: ["1-2 года", "2-3 года", "3-4 года", "4-5 лет"],
        specializations: ["Логопед", "Психолог", "Хореография"],
    },
    {
        name: 'Детский сад "Ромашка"',
        address: "пр. Мустакиллик, 25",
        capacity: "175/180", capacityColor: "text-red-600",
        queue: "42 детей", hours: "07:00 - 19:00", director: "Иванова М.С.",
        ageGroups: ["2-3 года", "3-4 года", "4-5 лет", "5-6 лет", "6-7 лет"],
        specializations: ["Подготовка к школе", "ИЗО", "Компьютерная грамотность"],
    },
    {
        name: 'Детский сад "Сказка"',
        address: "ул. Горняков, 12",
        capacity: "88/90", capacityColor: "text-red-600",
        queue: "15 детей", hours: "07:30 - 18:30", director: "Сидорова А.В.",
        ageGroups: ["1-2 года", "2-3 года", "3-4 года"],
        specializations: ["Раннее развитие", "Массаж", "Логопед"],
    },
];

const KindergartensPage = () => {
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Детские сады АГМК</h2>
                    <p className="text-muted-foreground">Подача заявлений и управление очередью</p>
                </div>
                <button
                    onClick={() => setDialogOpen(true)}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium h-9 px-4 rounded-md transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    Подать заявление
                </button>
            </div>

            <Tabs defaultValue="available" className="flex flex-col gap-2">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="available">Доступные сады</TabsTrigger>
                    <TabsTrigger value="my-applications">Мои заявления</TabsTrigger>
                    <TabsTrigger value="queue-status">Состояние очередей</TabsTrigger>
                </TabsList>

                <TabsContent value="available" className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        {gardens.map((g) => (
                            <KindergartenCard key={g.name} g={g} />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="my-applications" className="space-y-6">
                    <MyApplicationsTab />
                </TabsContent>

                <TabsContent value="queue-status" className="space-y-6">
                    <QueueStatusTab />
                </TabsContent>
            </Tabs>

            <ApplicationDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
        </div>
    );
};

export default memo(KindergartensPage);
