import { Building, CircleCheckBig, CircleAlert, Clock } from "lucide-react";

const stats = [
    {
        label: "Всего подразделений", value: "60", icon: Building,
        iconCls: "text-muted-foreground", valueCls: "",
        sub: null,
    },
    {
        label: "Сдано отчетов", value: "45", icon: CircleCheckBig,
        iconCls: "text-green-600", valueCls: "text-green-600",
        sub: "из 60",
    },
    {
        label: "Просрочено", value: "3", icon: CircleAlert,
        iconCls: "text-red-600", valueCls: "text-red-600",
        sub: "требуют внимания",
    },
    {
        label: "Своевременность", value: "92.5%", icon: Clock,
        iconCls: "text-blue-600", valueCls: "text-blue-600",
        sub: "средний показатель",
    },
];

type DivisionGroup = {
    name: string;
    total: number;
    submitted: number;
    inProgress: number;
    overdue: number;
};

const divisions: DivisionGroup[] = [
    { name: "Фабрики", total: 8, submitted: 6, inProgress: 0, overdue: 0 },
    { name: "Заводы", total: 12, submitted: 10, inProgress: 1, overdue: 0 },
    { name: "Управления", total: 15, submitted: 12, inProgress: 1, overdue: 0 },
    { name: "Департаменты", total: 18, submitted: 15, inProgress: 1, overdue: 0 },
    { name: "Службы", total: 7, submitted: 5, inProgress: 0, overdue: 0 },
];

export function ReportsDashboardTab() {
    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((s, i) => (
                    <div key={i} className="bg-card text-card-foreground rounded-xl border p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">{s.label}</p>
                                <p className={`text-2xl font-bold ${s.valueCls}`}>{s.value}</p>
                                {s.sub && <p className="text-xs text-muted-foreground">{s.sub}</p>}
                            </div>
                            <s.icon className={`h-8 w-8 ${s.iconCls}`} aria-hidden />
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
                <div className="px-6 pt-6">
                    <h4 className="leading-none font-semibold text-base">Отчетность по типам подразделений</h4>
                    <p className="text-sm text-muted-foreground mt-1">Текущий статус сдачи отчетов (неделя 39)</p>
                </div>
                <div className="px-6 pb-6 -mt-2">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {divisions.map((d, i) => (
                            <div key={i} className="border rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <h4 className="font-medium">{d.name}</h4>
                                    <span className="text-sm text-muted-foreground">{d.total} ед.</span>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                        <span>Сдано:</span>
                                        <span className="text-green-600 font-medium">{d.submitted}/{d.total}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>В работе:</span>
                                        <span className="text-yellow-600 font-medium">{d.inProgress}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Просрочено:</span>
                                        <span className="text-red-600 font-medium">{d.overdue}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
