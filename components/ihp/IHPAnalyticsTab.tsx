import { Package, CircleCheckBig, Clock, AlertCircle } from "lucide-react";

const stats = [
    { label: "Всего заявок", value: "15", sub: "За этот год", icon: Package, iconCls: "text-muted-foreground" },
    { label: "Одобренных", value: "12", sub: "80% от общего", icon: CircleCheckBig, iconCls: "text-green-600", valueCls: "text-green-600" },
    { label: "На рассмотрении", value: "2", sub: "Ожидают решения", icon: Clock, iconCls: "text-yellow-600", valueCls: "text-yellow-600" },
    { label: "Общая стоимость", value: "8.5М", sub: "сум за год", icon: AlertCircle, iconCls: "text-muted-foreground" },
];

const categories = [
    { name: "Компьютеры", count: 45, pct: 35 },
    { name: "Периферия", count: 38, pct: 30 },
    { name: "Мобильные устройства", count: 25, pct: 20 },
    { name: "Печатная техника", count: 19, pct: 15 },
];

export function IHPAnalyticsTab() {
    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s, i) => (
                    <div key={i} className="bg-card text-card-foreground rounded-xl border">
                        <div className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">{s.label}</p>
                                <p className={`text-2xl font-bold ${s.valueCls ?? ""}`}>{s.value}</p>
                                <p className="text-xs text-muted-foreground">{s.sub}</p>
                            </div>
                            <s.icon className={`h-8 w-8 ${s.iconCls}`} aria-hidden />
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
                <div className="px-6 pt-6">
                    <h4 className="leading-none font-semibold text-base">Популярные категории</h4>
                </div>
                <div className="px-6 pb-6 -mt-2 space-y-4">
                    {categories.map((c, i) => (
                        <div key={i} className="flex-1">
                            <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium">{c.name}</span>
                                <span>{c.count} заявок</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${c.pct}%` }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
