import { TrendingUp } from "lucide-react";

const kpis = [
    { label: "Производительность", value: 94, pct: "text-blue-600" },
    { label: "Посещаемость", value: 98, pct: "text-green-600" },
    { label: "Безопасность труда", value: 100, pct: "text-green-600" },
    { label: "Обучение и развитие", value: 87, pct: "text-blue-600" },
    { label: "Лидерство команды", value: 92, pct: "text-blue-600" },
];

export function KpiCard() {
    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
            <div className="px-6 pt-6 pb-3">
                <h4 className="leading-none flex items-center space-x-2 text-base font-semibold">
                    <TrendingUp className="h-5 w-5 text-purple-600" />
                    <span>Ключевые показатели</span>
                </h4>
            </div>
            <div className="px-6 pb-6 pt-1">
                <div className="space-y-4">
                    {kpis.map((k) => (
                        <div key={k.label}>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium">{k.label}</span>
                                <span className={`text-sm font-bold ${k.pct}`}>{k.value}%</span>
                            </div>
                            <div className="bg-slate-200 relative w-full overflow-hidden rounded-full h-2">
                                <div className="bg-blue-700 h-full transition-all rounded-full" style={{ width: `${k.value}%` }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
