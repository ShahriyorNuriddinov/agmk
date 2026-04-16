import { Briefcase, Building, Factory, Calendar, Users } from "lucide-react";

const duties = [
    "Контроль технологических процессов переработки",
    "Управление бригадой из 12 специалистов",
    "Оптимизация производственных показателей",
    "Соблюдение требований промышленной безопасности",
    "Подготовка технических отчетов",
];

const experience = [
    { label: "Общий стаж", value: "14 лет 1 месяц", color: "text-foreground" },
    { label: "В АГМК", value: "14 лет 1 месяц", color: "text-blue-600" },
    { label: "В должности", value: "7 лет 6 месяцев", color: "text-green-600" },
    { label: "В металлургии", value: "14 лет 1 месяц", color: "text-purple-600" },
];

export function CurrentPositionTab() {
    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
                    <div className="px-6 pt-6">
                        <h4 className="leading-none flex items-center space-x-2 font-semibold">
                            <Briefcase className="h-5 w-5 text-blue-600" />
                            <span>Текущая должность</span>
                        </h4>
                    </div>
                    <div className="px-6 pb-6 space-y-4">
                        <div>
                            <h3 className="font-semibold text-lg">Ведущий инженер-металлург</h3>
                            <p className="text-muted-foreground">Алмалыкский завод тяжёлых цветных металлов</p>
                        </div>
                        <div className="space-y-3 text-sm">
                            <div className="flex items-center space-x-2">
                                <Building className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Подразделение:</span>
                                <span>Производственный отдел</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Factory className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Цех:</span>
                                <span>Цех №3 - Переработка медного концентрата</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Начало работы:</span>
                                <span>15.03.2018</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Users className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Подчиненных:</span>
                                <span>12 чел.</span>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                                <span className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium text-blue-600 border-blue-600">
                                    Руководящий состав
                                </span>
                                <span className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground border-transparent">
                                    Полный рабочий день
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
                    <div className="px-6 pt-6">
                        <h4 className="leading-none font-semibold">Стаж работы</h4>
                    </div>
                    <div className="px-6 pb-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            {experience.map((e) => (
                                <div key={e.label}>
                                    <p className="text-sm text-muted-foreground">{e.label}</p>
                                    <p className={`font-bold text-lg ${e.color}`}>{e.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
                <div className="px-6 pt-6">
                    <h4 className="leading-none font-semibold">Должностные обязанности</h4>
                </div>
                <div className="px-6 pb-6">
                    <ul className="space-y-2">
                        {duties.map((d, i) => (
                            <li key={i} className="flex items-start space-x-2">
                                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0" />
                                <span className="text-sm">{d}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
