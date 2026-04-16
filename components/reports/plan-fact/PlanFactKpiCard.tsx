import { BarChart3, TrendingDown, TrendingUp, Minus } from "lucide-react";

const items = [
    { Icon: TrendingDown, ic: "text-red-500", title: "Объём производства", body: "План: 120 тыс. т — Факт: 115.4 тыс. т", author: "Производство", date: "96.2%" },
    { Icon: TrendingUp, ic: "text-green-500", title: "Выход годной продукции", body: "План: 98.5% — Факт: 98.8%", author: "Качество", date: "100.3%" },
    { Icon: Minus, ic: "text-yellow-500", title: "Выручка", body: "План: 4 500 млн сум — Факт: 4 312 млн сум", author: "Финансы", date: "95.8%" },
];

export function PlanFactKpiCard() {
    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border lg:col-span-1">
            <div className="px-6 pt-6">
                <h4 className="leading-none flex items-center space-x-2 font-semibold">
                    <BarChart3 className="h-5 w-5" />
                    <span>Ключевые показатели</span>
                </h4>
            </div>
            <div className="px-6 pb-6 space-y-4 -mt-2">
                {items.map((a, i) => (
                    <div key={i} className="border rounded-lg p-3 space-y-2">
                        <div className="flex items-start space-x-2">
                            <a.Icon className={`h-4 w-4 ${a.ic} shrink-0 mt-0.5`} />
                            <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm leading-tight">{a.title}</h4>
                                <p className="text-xs text-muted-foreground line-clamp-2">{a.body}</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                            <span>{a.author}</span>
                            <span>{a.date}</span>
                        </div>
                    </div>
                ))}
                <button className="inline-flex items-center justify-center w-full h-8 rounded-md border bg-background text-foreground hover:bg-accent text-sm font-medium transition-colors">
                    Все показатели
                </button>
            </div>
        </div>
    );
}
