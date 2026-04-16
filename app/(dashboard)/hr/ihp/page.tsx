"use client";

import { memo, useState } from "react";
import { Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IHPCatalogItem, type CatalogItem } from "@/components/ihp/IHPCatalogItem";
import { IHPRequestsTab } from "@/components/ihp/IHPRequestsTab";
import { IHPInventoryTab } from "@/components/ihp/IHPInventoryTab";
import { IHPAnalyticsTab } from "@/components/ihp/IHPAnalyticsTab";
import { IHPDialog } from "@/components/ihp/IHPDialog";

const catalog: CatalogItem[] = [
    {
        name: "Компьютер рабочий Dell OptiPlex",
        category: "Компьютеры",
        description: "Настольный компьютер для офисной работы",
        icon: "monitor",
        specs: "Intel Core i5, 8GB RAM, 256GB SSD",
        warranty: "3 года",
        supplier: 'ООО "ТехКомплект"',
        price: "2,500,000 сум",
        available: 15,
        reserved: 8,
    },
    {
        name: "Ноутбук Lenovo ThinkPad",
        category: "Компьютеры",
        description: "Портативный компьютер для мобильной работы",
        icon: "monitor",
        specs: 'Intel Core i7, 16GB RAM, 512GB SSD, 14"',
        warranty: "2 года",
        supplier: 'ООО "ТехСервис"',
        price: "3,200,000 сум",
        available: 8,
        reserved: 12,
    },
    {
        name: "Мышь компьютерная Logitech",
        category: "Периферия",
        description: "Оптическая мышь с USB подключением",
        icon: "mouse",
        specs: "Оптический сенсор, 1000 DPI, эргономичная",
        warranty: "1 год",
        supplier: 'ООО "ОфисТех"',
        price: "45,000 сум",
        available: 120,
        reserved: 25,
    },
    {
        name: "Клавиатура OKLICK",
        category: "Периферия",
        description: "Клавиатура с кириллической раскладкой",
        icon: "keyboard",
        specs: "Мембранная, USB, стандартная раскладка",
        warranty: "1 год",
        supplier: 'ООО "ОфисТех"',
        price: "65,000 сум",
        available: 85,
        reserved: 15,
    },
    {
        name: "Планшет Samsung Galaxy Tab",
        category: "Мобильные устройства",
        description: "Планшет для работы с документами и презентациями",
        icon: "tablet",
        specs: '10.1", Android, 64GB, Wi-Fi + LTE',
        warranty: "2 года",
        supplier: 'ООО "МобайлТех"',
        price: "1,800,000 сум",
        available: 12,
        reserved: 18,
    },
    {
        name: "Наушники с микрофоном",
        category: "Аудио",
        description: "Наушники для видеоконференций",
        icon: "headphones",
        specs: "Накладные, шумоподавление, USB/3.5mm",
        warranty: "1 год",
        supplier: 'ООО "АудиоТех"',
        price: "120,000 сум",
        available: 45,
        reserved: 8,
    },
    {
        name: "МФУ Canon i-SENSYS",
        category: "Печатная техника",
        description: "Многофункциональное устройство",
        icon: "printer",
        specs: "Печать, сканирование, копирование, A4",
        warranty: "1 год",
        supplier: 'ООО "ПринтСервис"',
        price: "850,000 сум",
        available: 6,
        reserved: 4,
    },
    {
        name: "Веб-камера Logitech C920",
        category: "Видео",
        description: "Веб-камера для видеосвязи",
        icon: "camera",
        specs: "Full HD 1080p, автофокус, микрофон",
        warranty: "2 года",
        supplier: 'ООО "ВидеоТех"',
        price: "180,000 сум",
        available: 25,
        reserved: 12,
    },
];

const IHPPage = () => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [defaultCategory, setDefaultCategory] = useState<string | undefined>();
    const [defaultItem, setDefaultItem] = useState<string | undefined>();

    const openDialog = (category?: string, item?: string) => {
        setDefaultCategory(category);
        setDefaultItem(item);
        setDialogOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Индивидуальные хозяйственные принадлежности (ИХП)</h2>
                    <p className="text-muted-foreground">Заказ и учет компьютерной техники и оборудования</p>
                </div>
                <button
                    onClick={() => openDialog()}
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium h-9 px-4 rounded-md transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    Создать заявку
                </button>
            </div>

            <Tabs defaultValue="catalog" className="flex flex-col gap-2">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="catalog">Каталог</TabsTrigger>
                    <TabsTrigger value="my-requests">Мои заявки</TabsTrigger>
                    <TabsTrigger value="inventory">Мое имущество</TabsTrigger>
                    <TabsTrigger value="analytics">Аналитика</TabsTrigger>
                </TabsList>

                <TabsContent value="catalog" className="space-y-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {catalog.map(item => (
                            <IHPCatalogItem
                                key={item.name}
                                item={item}
                                onOrder={() => openDialog(item.category, item.name)}
                            />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="my-requests">
                    <IHPRequestsTab />
                </TabsContent>

                <TabsContent value="inventory">
                    <IHPInventoryTab />
                </TabsContent>

                <TabsContent value="analytics">
                    <IHPAnalyticsTab />
                </TabsContent>
            </Tabs>

            <IHPDialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
                defaultCategory={defaultCategory}
                defaultItem={defaultItem}
            />
        </div>
    );
};

export default memo(IHPPage);
