import { Star, CirclePlay, Award, BookOpen } from "lucide-react";

type Course = {
    title: string;
    type: string;
    teacher: string;
    hours: string;
    modules: string;
    pct: number;
    rating: number;
    deadline: string;
    activity: string;
    status: "in_progress" | "completed" | "assigned";
    hasCert?: boolean;
};

const courses: Course[] = [
    {
        title: "Промышленная безопасность и охрана труда",
        type: "Обязательное обучение",
        teacher: "Петров В.А.", hours: "16 часов", modules: "7/8",
        pct: 85, rating: 4.8, deadline: "15.10.2025", activity: "2 дня назад",
        status: "in_progress",
    },
    {
        title: "Современные методы металлургического производства",
        type: "Повышение квалификации",
        teacher: "Сидорова Н.И.", hours: "24 часа", modules: "12/12",
        pct: 100, rating: 4.9, deadline: "30.08.2025", activity: "1 месяц назад",
        status: "completed", hasCert: true,
    },
    {
        title: "Управление качеством продукции",
        type: "Профессиональное развитие",
        teacher: "Иванов К.П.", hours: "20 часов", modules: "4/10",
        pct: 45, rating: 4.6, deadline: "20.11.2025", activity: "5 дней назад",
        status: "in_progress",
    },
    {
        title: "Основы экологической безопасности",
        type: "Обязательное обучение",
        teacher: "Морозова Л.С.", hours: "12 часов", modules: "0/6",
        pct: 0, rating: 4.5, deadline: "30.12.2025", activity: "Не начато",
        status: "assigned",
    },
];

const statusBadge: Record<string, { label: string; cls: string }> = {
    in_progress: { label: "В процессе", cls: "text-blue-600 border-blue-600" },
    completed: { label: "Завершен", cls: "text-green-600 border-green-600" },
    assigned: { label: "Назначен", cls: "text-yellow-600 border-yellow-600" },
};

export function MyCoursesList() {
    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
            <div className="px-6 pt-6">
                <h4 className="leading-none font-semibold text-base">Мои курсы</h4>
                <p className="text-sm text-muted-foreground mt-1">Текущие и завершенные курсы обучения</p>
            </div>
            <div className="px-6 pb-6 -mt-2 space-y-4">
                {courses.map((c, i) => (
                    <div key={i} className="border rounded-lg p-4 space-y-4">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h4 className="font-semibold">{c.title}</h4>
                                <p className="text-sm text-muted-foreground">{c.type}</p>
                                <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                                    <span>Преподаватель: {c.teacher}</span>
                                    <span>Продолжительность: {c.hours}</span>
                                    <span>Модулей: {c.modules}</span>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 ml-4">
                                {c.hasCert && (
                                    <span className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium text-yellow-600 border-yellow-600 gap-1">
                                        <Award className="h-3 w-3" />Сертификат
                                    </span>
                                )}
                                <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${statusBadge[c.status].cls}`}>
                                    {statusBadge[c.status].label}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm">
                                <span>Прогресс</span>
                                <span className="font-medium">{c.pct}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${c.pct}%` }} />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-1">
                                    <Star className="h-4 w-4 text-yellow-400 fill-current" aria-hidden />
                                    <span>{c.rating}</span>
                                </div>
                                <span className="text-muted-foreground">Дедлайн: {c.deadline}</span>
                                <span className="text-muted-foreground">Активность: {c.activity}</span>
                            </div>
                            <div className="flex space-x-2">
                                {c.status === "completed" ? (
                                    <button className="inline-flex items-center justify-center text-sm font-medium border bg-background hover:bg-accent h-8 rounded-md px-3 transition-colors gap-1.5">
                                        <Award className="h-4 w-4" aria-hidden />Сертификат
                                    </button>
                                ) : c.status === "assigned" ? (
                                    <button className="inline-flex items-center justify-center text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white h-8 rounded-md px-3 transition-colors gap-1.5">
                                        <BookOpen className="h-4 w-4" aria-hidden />Начать
                                    </button>
                                ) : (
                                    <button className="inline-flex items-center justify-center text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white h-8 rounded-md px-3 transition-colors gap-1.5">
                                        <CirclePlay className="h-4 w-4" aria-hidden />Продолжить
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
