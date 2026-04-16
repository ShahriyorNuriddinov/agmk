import { AlertCircle } from "lucide-react";

const deadlines = [
    { title: "Сдача месячного отчета", date: "1 октября 2025 г.", days: 2, badgeCls: "text-red-600 border-red-600" },
    { title: "Завершение курса по металлургии", date: "15 октября 2025 г.", days: 16, badgeCls: "text-yellow-600 border-yellow-600" },
    { title: "Аттестация сотрудников", date: "31 октября 2025 г.", days: 32, badgeCls: "text-red-600 border-red-600" },
    { title: "Плановая инвентаризация", date: "15 ноября 2025 г.", days: 47, badgeCls: "text-green-600 border-green-600" },
];

export function DeadlinesCard() {
    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
            <div className="px-6 pt-6">
                <h4 className="leading-none flex items-center space-x-2 font-semibold text-base">
                    <AlertCircle className="h-5 w-5 text-orange-600" />
                    <span>Важные сроки</span>
                </h4>
            </div>
            <div className="px-6 pb-6">
                <div className="space-y-3">
                    {deadlines.map((d, i) => (
                        <div key={i} className="border rounded-lg p-3">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h4 className="font-medium text-sm">{d.title}</h4>
                                    <p className="text-xs text-muted-foreground">{d.date}</p>
                                </div>
                                <span className={`inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium shrink-0 ml-2 ${d.badgeCls}`}>
                                    {d.days} дн.
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
