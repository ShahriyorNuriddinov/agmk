import { Users, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const activity = [
    { initials: "ПП", name: "Петров П.П.", action: "завершил задачу", link: '"Анализ качества продукции"', time: "2 часа назад" },
    { initials: "СА", name: "Сидорова А.И.", action: "добавила комментарий к", link: '"Планерка отдела"', time: "3 часа назад" },
    { initials: "ИИ", name: "Иванов И.И.", action: "обновил статус", link: '"Отчет по смене"', time: "4 часа назад" },
];

export function TeamActivityCard() {
    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border lg:col-span-1">
            <div className="px-6 pt-6">
                <h4 className="leading-none flex items-center space-x-2 font-semibold">
                    <Users className="h-5 w-5" />
                    <span>Активность команды</span>
                </h4>
            </div>
            <div className="px-6 pb-6 space-y-4 -mt-2">
                {activity.map((a, i) => (
                    <div key={i} className="flex items-start space-x-3">
                        <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">{a.initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm">
                                <span className="font-medium">{a.name}</span>{" "}
                                {a.action}{" "}
                                <span className="text-primary">{a.link}</span>
                            </p>
                            <p className="text-xs text-muted-foreground">{a.time}</p>
                        </div>
                    </div>
                ))}
                <button className="inline-flex items-center justify-center w-full h-8 rounded-md border bg-background text-foreground hover:bg-accent text-sm font-medium transition-colors gap-1.5">
                    <MessageCircle className="h-4 w-4" aria-hidden />
                    Открыть чат команды
                </button>
            </div>
        </div>
    );
}
