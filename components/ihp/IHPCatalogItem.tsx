import { Monitor, Mouse, Keyboard, Tablet, Headphones, Printer, Camera, Eye } from "lucide-react";

const icons: Record<string, React.ReactNode> = {
    monitor: <Monitor className="h-8 w-8" />,
    mouse: <Mouse className="h-8 w-8" />,
    keyboard: <Keyboard className="h-8 w-8" />,
    tablet: <Tablet className="h-8 w-8" />,
    headphones: <Headphones className="h-8 w-8" />,
    printer: <Printer className="h-8 w-8" />,
    camera: <Camera className="h-8 w-8" />,
};

export type CatalogItem = {
    name: string;
    category: string;
    description: string;
    icon: string;
    specs: string;
    warranty: string;
    supplier: string;
    price: string;
    available: number;
    reserved: number;
};

export function IHPCatalogItem({ item, onOrder }: { item: CatalogItem; onOrder?: () => void }) {
    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
            <div className="px-6 pt-6">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <h4 className="text-lg font-semibold">{item.name}</h4>
                        <p className="text-muted-foreground text-sm">{item.category}</p>
                    </div>
                    <div className="text-primary">{icons[item.icon] ?? <Monitor className="h-8 w-8" />}</div>
                </div>
            </div>
            <div className="px-6 pb-6 -mt-2 space-y-4">
                <p className="text-sm">{item.description}</p>
                <div className="space-y-2 text-sm">
                    <div>
                        <span className="font-medium">Характеристики:</span>
                        <p className="text-muted-foreground">{item.specs}</p>
                    </div>
                    <div>
                        <span className="font-medium">Гарантия:</span>
                        <span className="ml-2">{item.warranty}</span>
                    </div>
                    <div>
                        <span className="font-medium">Поставщик:</span>
                        <span className="ml-2">{item.supplier}</span>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <div>
                        <div className="font-bold text-lg">{item.price}</div>
                        <div className="text-sm text-muted-foreground">
                            Доступно: {item.available} | Зарезервировано: {item.reserved}
                        </div>
                    </div>
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={onOrder}
                        className="inline-flex items-center justify-center text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white h-8 rounded-md px-3 transition-colors flex-1"
                    >
                        Заказать
                    </button>
                    <button className="inline-flex items-center justify-center h-8 w-8 rounded-md border bg-background hover:bg-accent transition-colors shrink-0">
                        <Eye className="h-4 w-4" aria-hidden />
                    </button>
                </div>
            </div>
        </div>
    );
}
