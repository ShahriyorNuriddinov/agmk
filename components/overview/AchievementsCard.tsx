import { Award, Target, Shield, GraduationCap } from "lucide-react";

const achievements = [
    { icon: Award, ic: "text-yellow-600", title: "Лучший работник года", sub: "2024 - За высокие производственные показатели" },
    { icon: Target, ic: "text-blue-600", title: "Эксперт по качеству", sub: "2023 - Сертификация по системе менеджмента качества" },
    { icon: Shield, ic: "text-green-600", title: "Безопасность труда", sub: "2022 - За 365 дней без нарушений ТБ" },
    { icon: GraduationCap, ic: "text-purple-600", title: "Наставник года", sub: "2021 - За подготовку молодых специалистов" },
];

export function AchievementsCard() {
    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
            <div className="px-6 pt-6 pb-3">
                <h4 className="leading-none flex items-center space-x-2 text-base font-semibold">
                    <Award className="h-5 w-5 text-yellow-600" />
                    <span>Достижения</span>
                </h4>
            </div>
            <div className="px-6 pb-6 pt-1">
                <div className="space-y-3">
                    {achievements.map((a, i) => (
                        <div key={i} className="flex items-center space-x-3">
                            <a.icon className={`h-5 w-5 ${a.ic} shrink-0`} />
                            <div className="flex-1">
                                <p className="text-sm font-medium">{a.title}</p>
                                <p className="text-xs text-muted-foreground">{a.sub}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
