import { Activity, AlertCircle, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const tasks = [
    { clockColor: "text-gray-500", title: "Сдать месячный отчет по производству", due: "До 30 сентября", progress: 75, badge: "Высокий", badgeVariant: "destructive" as const },
    { clockColor: "text-yellow-500", title: 'Пройти курс "Промышленная безопасность"', due: "До 2 октября", progress: 40, badge: "Средний", badgeVariant: "default" as const },
    { clockColor: "text-gray-500", title: "Обновить личные данные в системе", due: "До 5 октября", progress: null, badge: "Низкий", badgeVariant: "secondary" as const },
    { clockColor: "text-blue-500", title: "Участие в планерке отдела", due: "До Сегодня 14:00", progress: 100, badge: "Высокий", badgeVariant: "destructive" as const, useAlert: true },
];

export function TasksCard() {
    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border lg:col-span-1">
            <div className="px-6 pt-6">
                <h4 className="leading-none flex items-center space-x-2 font-semibold">
                    <Activity className="h-5 w-5" />
                    <span>Мои задачи</span>
                </h4>
            </div>
            <div className="px-6 pb-6 space-y-4 -mt-2">
                {tasks.map((t, i) => (
                    <div key={i} className="border rounded-lg p-3 space-y-3">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-2 flex-1">
                                {t.useAlert
                                    ? <AlertCircle className={`h-4 w-4 ${t.clockColor} shrink-0 mt-0.5`} aria-hidden />
                                    : <Clock className={`h-4 w-4 ${t.clockColor} shrink-0 mt-0.5`} aria-hidden />
                                }
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-medium text-sm leading-tight">{t.title}</h4>
                                    <p className="text-xs text-muted-foreground">{t.due}</p>
                                </div>
                            </div>
                            <Badge variant={t.badgeVariant} className="text-xs shrink-0 ml-2">{t.badge}</Badge>
                        </div>
                        {t.progress !== null && (
                            <div>
                                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                                    <span>Прогресс</span>
                                    <span>{t.progress}%</span>
                                </div>
                                <Progress value={t.progress} className="h-2" />
                            </div>
                        )}
                    </div>
                ))}
                <button className="inline-flex items-center justify-center w-full h-8 rounded-md border bg-background text-foreground hover:bg-accent text-sm font-medium transition-colors">
                    Все задачи
                </button>
            </div>
        </div>
    );
}
