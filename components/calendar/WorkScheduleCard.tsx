import { Briefcase } from "lucide-react";

const schedule = [
    { day: "Понедельник:", time: "08:00 - 17:00", off: false },
    { day: "Вторник:", time: "08:00 - 17:00", off: false },
    { day: "Среда:", time: "08:00 - 17:00", off: false },
    { day: "Четверг:", time: "08:00 - 17:00", off: false },
    { day: "Пятница:", time: "08:00 - 17:00", off: false },
    { day: "Суббота:", time: "Выходной", off: true },
    { day: "Воскресенье:", time: "Выходной", off: true },
];

export function WorkScheduleCard() {
    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
            <div className="px-6 pt-6">
                <h4 className="leading-none flex items-center space-x-2 font-semibold text-base">
                    <Briefcase className="h-5 w-5 text-blue-600" />
                    <span>График работы</span>
                </h4>
            </div>
            <div className="px-6 pb-6">
                <div className="space-y-2 text-sm">
                    {schedule.map((s) => (
                        <div key={s.day} className="flex justify-between items-center">
                            <span className="font-medium">{s.day}</span>
                            <span className={s.off ? "text-red-600" : "text-muted-foreground"}>{s.time}</span>
                        </div>
                    ))}
                    <div className="mt-3 pt-3 border-t text-xs text-muted-foreground">
                        Обеденный перерыв: 12:00 - 13:00
                    </div>
                </div>
            </div>
        </div>
    );
}
