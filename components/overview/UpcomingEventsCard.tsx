import { Calendar, Award, Users, User, GraduationCap } from "lucide-react";

const events = [
    { icon: Award, ic: "text-yellow-600", title: "Аттестация по промышленной безопасности", date: "02.10.2025 в 10:00" },
    { icon: Users, ic: "text-orange-600", title: "Планерное совещание отдела", date: "05.10.2025 в 14:00" },
    { icon: User, ic: "text-red-600", title: "Медицинский осмотр", date: "10.10.2025 в 09:00" },
    { icon: GraduationCap, ic: "text-blue-600", title: "Обучение по новому оборудованию", date: "15.10.2025 в 13:30" },
];

export function UpcomingEventsCard() {
    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
            <div className="px-6 pt-6 pb-3">
                <h4 className="leading-none flex items-center space-x-2 text-base font-semibold">
                    <Calendar className="h-5 w-5 text-green-600" />
                    <span>Предстоящие события</span>
                </h4>
            </div>
            <div className="px-6 pb-6 pt-1">
                <div className="space-y-3">
                    {events.map((e, i) => (
                        <div key={i} className="flex items-start space-x-3">
                            <e.icon className={`h-4 w-4 ${e.ic} mt-0.5 shrink-0`} />
                            <div className="flex-1">
                                <p className="text-sm font-medium">{e.title}</p>
                                <p className="text-xs text-muted-foreground">{e.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
