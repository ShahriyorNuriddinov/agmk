import { Trophy, Award, Star } from "lucide-react";

type Achievement = {
    icon: React.ElementType;
    iconCls: string;
    title: string;
    description: string;
    date: string;
};

const achievements: Achievement[] = [
    {
        icon: Trophy, iconCls: "text-yellow-500",
        title: "Эксперт по качеству",
        description: "Завершены все курсы по управлению качеством",
        date: "15.08.2025",
    },
    {
        icon: Award, iconCls: "text-blue-500",
        title: "Специалист по безопасности",
        description: "Пройдено обучение по промышленной безопасности",
        date: "20.07.2025",
    },
    {
        icon: Star, iconCls: "text-green-500",
        title: "Активный ученик",
        description: "Завершено 5 курсов за полугодие",
        date: "30.06.2025",
    },
];

export function AchievementsTab() {
    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
            <div className="px-6 pt-6">
                <h4 className="leading-none font-semibold text-base">Мои достижения</h4>
                <p className="text-sm text-muted-foreground mt-1">Награды и сертификаты за обучение</p>
            </div>
            <div className="px-6 pb-6 -mt-2">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {achievements.map((a, i) => (
                        <div key={i} className="bg-card border rounded-xl p-6">
                            <div className="flex items-center space-x-4">
                                <div>
                                    <a.icon className={`h-6 w-6 ${a.iconCls}`} aria-hidden />
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold">{a.title}</h4>
                                    <p className="text-sm text-muted-foreground">{a.description}</p>
                                    <p className="text-xs text-muted-foreground mt-2">{a.date}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
