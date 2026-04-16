import { CalendarDays } from "lucide-react";

const career = [
    {
        period: "2018 · настоящее время",
        title: "Ведущий инженер-металлург",
        dept: "Производственный отдел",
        desc: "Контроль качества производства, оптимизация процессов, руководство проектами",
        current: true,
    },
    {
        period: "2015 · 2018",
        title: "Инженер-металлург",
        dept: "Производственный отдел",
        desc: "Технологический контроль, анализ показателей производства",
        current: false,
    },
    {
        period: "2013 · 2015",
        title: "Младший инженер-металлург",
        dept: "Производственный отдел",
        desc: "Помощь в контроле производственных процессов, ведение документации",
        current: false,
    },
];

export function CareerTab() {
    return (
        <div className="bg-card text-card-foreground rounded-xl border p-6">
            <div className="mb-6">
                <h3 className="font-bold text-base">История трудовой деятельности</h3>
                <p className="text-sm text-blue-600">Карьерный путь в АГМК</p>
            </div>

            <div className="space-y-0">
                {career.map((item, i) => (
                    <div key={i} className="flex gap-4">
                        {/* Timeline dot + line */}
                        <div className="flex flex-col items-center">
                            <div className="w-3 h-3 rounded-full bg-blue-600 shrink-0 mt-1.5" />
                            {i < career.length - 1 && (
                                <div className="w-0.5 bg-blue-200 flex-1 my-1" />
                            )}
                        </div>
                        <div className={`pb-6 ${i === career.length - 1 ? "pb-0" : ""}`}>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                                <CalendarDays className="h-3.5 w-3.5" />
                                <span>{item.period}</span>
                            </div>
                            <p className="font-semibold text-sm">{item.title}</p>
                            <p className="text-sm text-blue-600">{item.dept}</p>
                            <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
