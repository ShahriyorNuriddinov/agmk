import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type KpiRow = {
    category: string;
    indicator: string;
    unit: string;
    plan: number;
    fact: number;
    pct: number;
    status: "good" | "warning" | "bad";
};

const kpiData: KpiRow[] = [
    { category: "Производство", indicator: "Объём производства", unit: "тыс. т", plan: 120, fact: 115.4, pct: 96.2, status: "warning" },
    { category: "Производство", indicator: "Коэффициент использования оборудования", unit: "%", plan: 92, fact: 94.1, pct: 102.3, status: "good" },
    { category: "Производство", indicator: "Простои оборудования", unit: "ч", plan: 48, fact: 62, pct: 77.4, status: "bad" },
    { category: "Качество", indicator: "Выход годной продукции", unit: "%", plan: 98.5, fact: 98.8, pct: 100.3, status: "good" },
    { category: "Качество", indicator: "Количество рекламаций", unit: "шт", plan: 2, fact: 3, pct: 66.7, status: "bad" },
    { category: "Финансы", indicator: "Выручка", unit: "млн сум", plan: 4500, fact: 4312, pct: 95.8, status: "warning" },
    { category: "Финансы", indicator: "Себестоимость", unit: "млн сум", plan: 3200, fact: 3180, pct: 99.4, status: "good" },
    { category: "Финансы", indicator: "EBITDA", unit: "млн сум", plan: 1300, fact: 1132, pct: 87.1, status: "bad" },
    { category: "Персонал", indicator: "Производительность труда", unit: "т/чел", plan: 18.5, fact: 17.9, pct: 96.8, status: "warning" },
    { category: "Персонал", indicator: "Текучесть кадров", unit: "%", plan: 3.0, fact: 2.4, pct: 120.0, status: "good" },
    { category: "Безопасность", indicator: "Несчастные случаи", unit: "шт", plan: 0, fact: 0, pct: 100, status: "good" },
    { category: "Безопасность", indicator: "Нарушения ОТ", unit: "шт", plan: 5, fact: 7, pct: 71.4, status: "bad" },
];

const statusConfig = {
    good: {
        badge: <Badge variant="outline" className="text-green-600 border-green-600 text-xs">Выполнено</Badge>,
        pctCls: "text-green-600",
        icon: <TrendingUp className="h-3 w-3 text-green-500" aria-hidden />,
    },
    warning: {
        badge: <Badge variant="outline" className="text-yellow-600 border-yellow-600 text-xs">Частично</Badge>,
        pctCls: "text-yellow-600",
        icon: <Minus className="h-3 w-3 text-yellow-500" aria-hidden />,
    },
    bad: {
        badge: <Badge variant="destructive" className="text-xs">Не выполнено</Badge>,
        pctCls: "text-red-600",
        icon: <TrendingDown className="h-3 w-3 text-red-500" aria-hidden />,
    },
};

const categories = [...new Set(kpiData.map((r) => r.category))];

export function PlanFactOverviewTab() {
    return (
        <div className="space-y-6">
            {categories.map((cat) => {
                const rows = kpiData.filter((r) => r.category === cat);
                return (
                    <div key={cat} className="bg-card text-card-foreground rounded-xl border">
                        <div className="px-6 pt-6 pb-4 border-b">
                            <h4 className="font-semibold text-base">{cat}</h4>
                        </div>
                        <div className="px-6 py-4 space-y-3">
                            {rows.map((row, i) => {
                                const cfg = statusConfig[row.status];
                                const deviation = row.fact - row.plan;
                                const deviationStr = deviation >= 0 ? `+${deviation.toFixed(1)}` : deviation.toFixed(1);
                                return (
                                    <div key={i} className="grid grid-cols-12 items-center gap-3 py-2 border-b last:border-0">
                                        <div className="col-span-4">
                                            <p className="text-sm font-medium">{row.indicator}</p>
                                            <p className="text-xs text-muted-foreground">{row.unit}</p>
                                        </div>
                                        <div className="col-span-2 text-right">
                                            <p className="text-xs text-muted-foreground">План</p>
                                            <p className="text-sm font-medium">{row.plan.toLocaleString()}</p>
                                        </div>
                                        <div className="col-span-2 text-right">
                                            <p className="text-xs text-muted-foreground">Факт</p>
                                            <p className="text-sm font-medium">{row.fact.toLocaleString()}</p>
                                        </div>
                                        <div className="col-span-2 text-right">
                                            <p className="text-xs text-muted-foreground">Откл.</p>
                                            <p className={`text-sm font-medium ${deviation >= 0 ? "text-green-600" : "text-red-600"}`}>
                                                {deviationStr}
                                            </p>
                                        </div>
                                        <div className="col-span-1 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                {cfg.icon}
                                                <span className={`text-sm font-bold ${cfg.pctCls}`}>{row.pct}%</span>
                                            </div>
                                        </div>
                                        <div className="col-span-1 flex justify-end">
                                            {cfg.badge}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
