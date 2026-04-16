import { Clock, Shield, FileText, GraduationCap, Users } from "lucide-react";

const activities = [
    { icon: Shield, ic: "text-green-600", title: "Проведен инструктаж по безопасности", date: "29.09.2025 в 14:30" },
    { icon: FileText, ic: "text-blue-600", title: "Утвержден отчет по производственным показателям", date: "28.09.2025 в 09:15" },
    { icon: GraduationCap, ic: "text-purple-600", title: 'Завершен курс "Современные методы металлургии"', date: "27.09.2025 в 16:45" },
    { icon: Users, ic: "text-orange-600", title: "Участие в планерном совещании", date: "26.09.2025 в 11:20" },
];

export function RecentActivityCard() {
    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
            <div className="px-6 pt-6 pb-3">
                <h4 className="leading-none flex items-center space-x-2 text-base font-semibold">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <span>Последние активности</span>
                </h4>
            </div>
            <div className="px-6 pb-6 pt-1">
                <div className="space-y-3">
                    {activities.map((a, i) => (
                        <div key={i} className="flex items-start space-x-3">
                            <a.icon className={`h-4 w-4 ${a.ic} mt-0.5 shrink-0`} />
                            <div className="flex-1">
                                <p className="text-sm font-medium">{a.title}</p>
                                <p className="text-xs text-muted-foreground">{a.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
