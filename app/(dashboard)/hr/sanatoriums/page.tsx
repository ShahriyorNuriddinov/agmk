"use client";

import { memo, useState } from "react";
import { Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SanatoriumCard, type Sanatorium } from "@/components/sanatorium/SanatoriumCard";
import { SanatoriumApplicationsTab } from "@/components/sanatorium/SanatoriumApplicationsTab";
import { SanatoriumCalendarTab } from "@/components/sanatorium/SanatoriumCalendarTab";
import { SanatoriumDialog } from "@/components/sanatorium/SanatoriumDialog";

const sanatoriums: Sanatorium[] = [
    {
        name: 'Санаторий "Чимган"',
        location: "Ташкентская область, Чимганские горы",
        description: "Горноклиматический курорт с лечебными процедурами",
        icon: "mountain",
        rating: 4.7,
        freeSlots: "18/120",
        season: "Декабрь-Март, Июнь-Сентябрь",
        specializations: ["Заболевания опорно-двигательного аппарата", "Неврология", "Кардиология"],
        amenities: ["Wi-Fi", "Парковка", "Ресторан", "Лыжная база", "Бассейн"],
        price: "580,000 сум/день",
        priceNote: "Ортопедия, Неврология",
    },
    {
        name: 'Санаторий "Ходжикент"',
        location: "Ташкентская область, Ходжикентские минеральные воды",
        description: "Бальнеологический курорт с минеральными водами",
        icon: "waves",
        rating: 4.4,
        freeSlots: "22/90",
        season: "Апрель-Октябрь",
        specializations: ["Заболевания ЖКТ", "Болезни печени", "Эндокринология"],
        amenities: ["Wi-Fi", "Парковка", "Ресторан", "Минеральные ванны", "Бассейн"],
        price: "380,000 сум/день",
        priceNote: "Гастроэнтерология, Эндокринология",
    },
    {
        name: 'Санаторий "Бельдерсай"',
        location: "Ташкентская область, Бостанлыкский район",
        description: "Горноклиматический курорт для активного отдыха",
        icon: "sun",
        rating: 4.3,
        freeSlots: "30/100",
        season: "Июнь-Сентябрь",
        specializations: ["Заболевания нервной системы", "Переутомление", "Реабилитация"],
        amenities: ["Wi-Fi", "Парковка", "Кафе", "Канатная дорога", "Бассейн"],
        price: "480,000 сум/день",
        priceNote: "Неврология, Психотерапия",
    },
    {
        name: 'Санаторий "Олтин Олма"',
        location: "Ташкентская область, Бостанлыкский район",
        description: "Горноклиматический курорт с лечебными программами",
        icon: "mountain",
        rating: 4.8,
        freeSlots: "25/150",
        season: "Круглогодично",
        specializations: ["Заболевания дыхательных путей", "Сердечно-сосудистые заболевания", "Кардиология"],
        amenities: ["Wi-Fi", "Парковка", "Ресторан", "Бассейн", "Спортзал"],
        price: "450,000 сум/день",
        priceNote: "Кардиология, Пульмонология, Неврология",
    },
    {
        name: "Профилакторий АГМК",
        location: "г. Алмалык, ул. Металлургов, 45",
        description: "Корпоративный профилакторий для сотрудников и их семей",
        icon: "building",
        rating: 4.5,
        freeSlots: "15/80",
        season: "Круглогодично",
        specializations: ["Профилактическое лечение", "Реабилитация", "Восстановление"],
        amenities: ["Wi-Fi", "Парковка", "Столовая", "Медкабинет", "Спортзал"],
        price: "Бесплатно",
        priceNote: "Профилактика, Реабилитация",
    },
    {
        name: 'Санаторий "Зарафшан"',
        location: "Самаркандская область, Зарафшанская долина",
        description: "Климатический курорт в живописной долине реки Зарафшан",
        icon: "waves",
        rating: 4.2,
        freeSlots: "12/60",
        season: "Май-Октябрь",
        specializations: ["Заболевания органов дыхания", "Аллергология", "Дерматология"],
        amenities: ["Wi-Fi", "Парковка", "Ресторан", "Бассейн", "Спортзал"],
        price: "320,000 сум/день",
        priceNote: "Пульмонология, Аллергология",
    },
];

const SanatoriumPage = () => {
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Санатории и пансионаты АГМК</h2>
                    <p className="text-muted-foreground">Оздоровление и отдых для сотрудников и их семей</p>
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
                    <TabsTrigger value="available">Доступные санатории</TabsTrigger>
                    <TabsTrigger value="my-applications">Мои заявления</TabsTrigger>
                    <TabsTrigger value="calendar">Календарь работы</TabsTrigger>
                </TabsList>

                <TabsContent value="available" className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        {sanatoriums.map(s => (
                            <SanatoriumCard key={s.name} s={s} onApply={() => setDialogOpen(true)} />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="my-applications" className="space-y-6">
                    <SanatoriumApplicationsTab />
                </TabsContent>

                <TabsContent value="calendar" className="space-y-6">
                    <SanatoriumCalendarTab />
                </TabsContent>
            </Tabs>

            <SanatoriumDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
        </div>
    );
};

export default memo(SanatoriumPage);
