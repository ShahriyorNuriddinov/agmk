import { Calendar } from "lucide-react";

const holidays = [
    { name: "Новый год", date: "1 янв." },
    { name: "День защитников Родины", date: "14 янв." },
    { name: "Международный женский день", date: "8 мар." },
    { name: "Навруз", date: "21 мар." },
];

export function HolidaysCard() {
    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
            <div className="px-6 pt-6">
                <h4 className="leading-none flex items-center space-x-2 font-semibold text-base">
                    <Calendar className="h-5 w-5 text-red-600" />
                    <span>Ближайшие праздники</span>
                </h4>
            </div>
            <div className="px-6 pb-6">
                <div className="space-y-2">
                    {holidays.map((h, i) => (
                        <div key={i} className="flex justify-between items-center text-sm">
                            <span>{h.name}</span>
                            <span className="text-muted-foreground">{h.date}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
