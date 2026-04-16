import { Target, CheckCircle2, TrendingDown, AlertTriangle, TrendingUp } from "lucide-react";

const stats = [
    { label: "Выполнение плана", value: "94.2%", trend: "+2.1%", trendUp: true, icon: Target },
    { label: "Показателей выполнено", value: "47/52", trend: "+3", trendUp: true, icon: CheckCircle2 },
    { label: "Отклонение", value: "-5.8%", trend: "-1.2%", trendUp: false, icon: TrendingDown },
    { label: "Показателей под риском", value: "5", trend: "-2", trendUp: true, icon: AlertTriangle },
];

export function PlanFactStatsRow() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s) => (
                <div key={s.label} className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
                    <div className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">{s.label}</p>
                                <p className="text-2xl font-bold">{s.value}</p>
                                <div className="flex items-center space-x-1">
                                    {s.trendUp
                                        ? <TrendingUp className="h-3 w-3 text-green-500" aria-hidden />
                                        : <TrendingDown className="h-3 w-3 text-red-500" aria-hidden />
                                    }
                                    <span className={`text-xs ${s.trendUp ? "text-green-500" : "text-red-500"}`}>{s.trend}</span>
                                </div>
                            </div>
                            <div className="text-muted-foreground">
                                <s.icon className="h-8 w-8" aria-hidden />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
