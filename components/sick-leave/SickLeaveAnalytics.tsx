import { Thermometer, Activity, Stethoscope, Heart, TrendingUp, TrendingDown } from "lucide-react";

const categories = [
    { icon: Thermometer, iconColor: "text-blue-600", label: "Простудные заболевания", cases: 3, days: 22, pct: 45 },
    { icon: Activity, iconColor: "text-green-600", label: "Заболевания ЖКТ", cases: 2, days: 12, pct: 25 },
    { icon: Stethoscope, iconColor: "text-orange-600", label: "Заболевания опорно-двигательного аппарата", cases: 1, days: 6, pct: 15 },
    { icon: Heart, iconColor: "text-red-600", label: "Сердечно-сосудистые заболевания", cases: 1, days: 8, pct: 15 },
];

const years = [
    { year: "2025", trend: "up", trendColor: "text-red-600", sick: 3, days: 21, avg: "7 дн.", benefit: "3.7М сум" },
    { year: "2024", trend: "down", trendColor: "text-green-600", sick: 3, days: 20, avg: "6.7 дн.", benefit: "3.5М сум" },
    { year: "2023", trend: "down", trendColor: "text-green-600", sick: 2, days: 12, avg: "6 дн.", benefit: "2.1М сум" },
];

export function SickLeaveAnalytics() {
    return (
        <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
                <div className="px-6 pt-6">
                    <h4 className="leading-none font-semibold text-base">Категории заболеваний</h4>
                    <p className="text-sm text-muted-foreground mt-1">Распределение по типам заболеваний</p>
                </div>
                <div className="px-6 pb-6 -mt-2 space-y-4">
                    {categories.map((c, i) => (
                        <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 flex-1">
                                <c.icon className={`h-5 w-5 ${c.iconColor}`} />
                                <div className="flex-1">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="font-medium text-sm">{c.label}</span>
                                        <span className="text-sm text-muted-foreground">{c.cases} случаев, {c.days} дней</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${c.pct}%` }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
                <div className="px-6 pt-6">
                    <h4 className="leading-none font-semibold text-base">Сравнение по годам</h4>
                    <p className="text-sm text-muted-foreground mt-1">Динамика заболеваемости</p>
                </div>
                <div className="px-6 pb-6 -mt-2 space-y-4">
                    {years.map((y, i) => (
                        <div key={i} className="border rounded-lg p-4">
                            <div className="flex justify-between items-center mb-2">
                                <h4 className="font-semibold">{y.year} год</h4>
                                <div className="flex items-center space-x-2">
                                    {y.trend === "up"
                                        ? <TrendingUp className={`h-4 w-4 ${y.trendColor}`} />
                                        : <TrendingDown className={`h-4 w-4 ${y.trendColor}`} />
                                    }
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-muted-foreground">Больничных:</span>
                                    <span className="ml-2 font-medium">{y.sick}</span>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Дней:</span>
                                    <span className="ml-2 font-medium">{y.days}</span>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Средняя длительность:</span>
                                    <span className="ml-2 font-medium">{y.avg}</span>
                                </div>
                                <div>
                                    <span className="text-muted-foreground">Пособие:</span>
                                    <span className="ml-2 font-medium">{y.benefit}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
