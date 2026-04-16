import { Building2, TrendingUp, TrendingDown, Minus } from "lucide-react";

const items = [
    { Icon: TrendingUp, ic: "text-green-500", title: "МОФ №1", body: "Выполнение плана за текущий период", author: "Фабрика", date: "97.2%" },
    { Icon: TrendingDown, ic: "text-red-500", title: "Свинцовый завод", body: "Выполнение плана за текущий период", author: "Завод", date: "88.3%" },
    { Icon: Minus, ic: "text-yellow-500", title: "Управление по персоналу", body: "Выполнение плана за текущий период", author: "Управление", date: "95.0%" },
];

export function PlanFactDivisionsCard() {
    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border lg:col-span-1">
            <div className="px-6 pt-6">
                <h4 className="leading-none flex items-center space-x-2 font-semibold">
                    <Building2 className="h-5 w-5" />
                    <span>По подразделениям</span>
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
                    Все подразделения
                </button>
            </div>
        </div>
    );
}
