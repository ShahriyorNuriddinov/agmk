import { Users, Clock, BarChart3, UserPlus, TrendingUp, CircleAlert } from "lucide-react";

const stats = [
    {
        label: "Общая численность", value: "36,247",
        icon: Users,
        trend: <div className="flex items-center space-x-1">
            <TrendingUp className="h-3 w-3 text-green-500" aria-hidden />
            <span className="text-xs text-green-500">+2.3%</span>
        </div>,
    },
    {
        label: "Средний стаж", value: "8.4 года",
        icon: Clock,
        trend: <div className="flex items-center space-x-1">
            <Clock className="h-3 w-3 text-blue-500" aria-hidden />
            <span className="text-xs text-blue-500">+0.2 года</span>
        </div>,
    },
    {
        label: "Текучесть кадров", value: "3.2%",
        icon: BarChart3,
        trend: <div className="flex items-center space-x-1">
            <TrendingUp className="h-3 w-3 text-red-500 rotate-180" aria-hidden />
            <span className="text-xs text-red-500">-0.8%</span>
        </div>,
    },
    {
        label: "Открытые вакансии", value: "127",
        icon: UserPlus,
        trend: <div className="flex items-center space-x-1">
            <CircleAlert className="h-3 w-3 text-yellow-500" aria-hidden />
            <span className="text-xs text-yellow-500">Требует внимания</span>
        </div>,
    },
];

export function EmployeesAnalyticsTab() {
    return (
        <div className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s, i) => (
                    <div key={i} className="bg-card text-card-foreground rounded-xl border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">{s.label}</p>
                                <p className="text-2xl font-bold">{s.value}</p>
                                {s.trend}
                            </div>
                            <s.icon className="h-8 w-8 text-muted-foreground" aria-hidden />
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
                <div className="px-6 pt-6">
                    <h4 className="leading-none font-semibold text-base">Динамика численности персонала</h4>
                </div>
                <div className="px-6 pb-6 -mt-2">
                    <div className="h-64 flex items-center justify-center text-muted-foreground">
                        <BarChart3 className="h-16 w-16" aria-hidden />
                        <span className="ml-4">График изменения численности за год</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
