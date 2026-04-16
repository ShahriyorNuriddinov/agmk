import { TrendingUp } from "lucide-react";

const kpiItems = [
    { label: "Производство", value: "98.8%", pct: 98.8, color: "bg-blue-600" },
    { label: "Качество", value: "98.5%", pct: 98.5, color: "bg-green-600" },
    { label: "Безопасность", value: "100%", pct: 100, color: "bg-green-600" },
    { label: "Эффективность", value: "98.1%", pct: 98.1, color: "bg-yellow-600" },
];

export function ReportsAnalyticsTab() {
    return (
        <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
                <div className="px-6 pt-6">
                    <h4 className="leading-none font-semibold text-base">Динамика сдачи отчетов</h4>
                </div>
                <div className="px-6 pb-6 -mt-2">
                    <div className="h-64 flex items-center justify-center text-muted-foreground">
                        <TrendingUp className="h-16 w-16" aria-hidden />
                        <span className="ml-4">График динамики по неделям</span>
                    </div>
                </div>
            </div>

            <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
                <div className="px-6 pt-6">
                    <h4 className="leading-none font-semibold text-base">Средние показатели KPI</h4>
                </div>
                <div className="px-6 pb-6 -mt-2 space-y-4">
                    {kpiItems.map((item, i) => (
                        <div key={i}>
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium">{item.label}</span>
                                <span className="text-sm font-bold">{item.value}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                    className={`${item.color} h-2 rounded-full`}
                                    style={{ width: `${item.pct}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
