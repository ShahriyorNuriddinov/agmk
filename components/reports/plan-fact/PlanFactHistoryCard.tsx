import { History, TrendingUp, Minus } from "lucide-react";

const items = [
    { Icon: Minus, ic: "text-yellow-500", title: "Сентябрь 2025", body: "Производство: 96.2% — Финансы: 95.8%", author: "Итого", date: "94.2%" },
    { Icon: TrendingUp, ic: "text-green-500", title: "Август 2025", body: "Производство: 97.1% — Финансы: 97.4%", author: "Итого", date: "96.8%" },
    { Icon: TrendingUp, ic: "text-green-500", title: "Июнь 2025", body: "Производство: 98.5% — Финансы: 98.8%", author: "Итого", date: "98.1%" },
];

export function PlanFactHistoryCard() {
    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border lg:col-span-1">
            <div className="px-6 pt-6">
                <h4 className="leading-none flex items-center space-x-2 font-semibold">
                    <History className="h-5 w-5" />
                    <span>История выполнения</span>
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
                    Полная история
                </button>
            </div>
        </div>
    );
}
