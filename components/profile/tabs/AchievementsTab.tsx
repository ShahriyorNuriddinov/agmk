import { Award } from "lucide-react";

const achievements = [
    {
        title: "Лучший сотрудник месяца",
        date: "Август 2025",
        desc: "За выдающиеся результаты в оптимизации производственного процесса",
    },
    {
        title: "Завершение курса повышения квалификации",
        date: "Июль 2025",
        desc: "Современные методы металлургического производства",
    },
    {
        title: "10 лет безупречной работы",
        date: "Март 2023",
        desc: "Награда за долгосрочную преданность компании",
    },
];

export function AchievementsTab() {
    return (
        <div className="bg-card text-card-foreground rounded-xl border p-6">
            <div className="flex items-center gap-2 mb-6">
                <Award className="h-5 w-5 text-yellow-500" />
                <h3 className="font-semibold text-base">Достижения и награды</h3>
            </div>
            <div className="space-y-4">
                {achievements.map((a, i) => (
                    <div key={i} className="border rounded-xl p-4">
                        <div className="flex items-start gap-3">
                            <Award className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                            <div>
                                <p className="font-semibold text-sm">{a.title}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{a.date}</p>
                                <p className="text-sm text-muted-foreground mt-1">{a.desc}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
