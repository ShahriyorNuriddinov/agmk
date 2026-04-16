import { Bookmark } from "lucide-react";

const history = [
    {
        title: "Ведущий инженер-металлург",
        company: "Алмалыкский завод тяжёлых цветных металлов",
        dept: "Цех №3 · Переработка медного концентрата",
        period: "15.03.2018 - по настоящее время",
        salary: "8,500,000  сум",
        staj: "7 лет 6 месяцев",
        dotColor: "bg-blue-600",
        duties: [
            "Повышение производительности на 15%",
            "Снижение брака на 8%",
            "Внедрение новой технологии обогащения",
        ],
    },
    {
        title: "Инженер-металлург II категории",
        company: "Алмалыкский завод тяжёлых цветных металлов",
        dept: "Цех №2 · Флотация",
        period: "20.08.2014 - 14.03.2018",
        salary: "5,200,000  сум",
        staj: "3 года 7 месяцев",
        dotColor: "bg-blue-600",
        duties: [
            "Оптимизация процесса флотации",
            "Участие в модернизации оборудования",
            "Повышение квалификации",
        ],
    },
    {
        title: "Инженер-металлург",
        company: "Алмалыкский завод тяжёлых цветных металлов",
        dept: "Лаборатория качества",
        period: "10.06.2012 - 19.08.2014",
        salary: "3,800,000  сум",
        staj: "2 года 2 месяца",
        dotColor: "bg-blue-600",
        duties: [
            "Освоение методов анализа руды",
            "Сертификация по системе качества",
            "Участие в научно-исследовательских работах",
        ],
    },
    {
        title: "Стажер-металлург",
        company: "Алмалыкский завод тяжёлых цветных металлов",
        dept: "Учебный центр",
        period: "01.09.2011 - 09.06.2012",
        salary: "2,100,000  сум",
        staj: "9 месяцев",
        dotColor: "bg-green-500",
        duties: [
            "Успешное прохождение стажировки",
            "Изучение технологических процессов",
            "Получение допуска к самостоятельной работе",
        ],
    },
];

export function WorkHistoryTab() {
    return (
        <div className="bg-card text-card-foreground rounded-xl border p-6">
            <div className="mb-6">
                <h3 className="font-bold text-base">История трудовой деятельности</h3>
                <p className="text-sm text-blue-600">Хронология занимаемых должностей в АГМК</p>
            </div>

            <div className="relative">
                <div className="absolute left-2 top-3 bottom-3 w-0.5 bg-blue-200" />

                <div className="space-y-4">
                    {history.map((h, i) => (
                        <div key={i} className="flex gap-5">
                            <div className="relative z-10 mt-3 shrink-0">
                                <div className={`w-5 h-5 rounded-full ${h.dotColor} border-2 border-white shadow`} />
                            </div>
                            <div className="flex-1 border rounded-xl p-4">
                                <div className="flex items-start justify-between gap-4 mb-3">
                                    <div>
                                        <p className="font-semibold text-sm">{h.title}</p>
                                        <p className="text-sm text-blue-600">{h.company}</p>
                                        <p className="text-xs text-muted-foreground">{h.dept}</p>
                                    </div>
                                    <span className="text-sm text-muted-foreground shrink-0">{h.staj}</span>
                                </div>

                                <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                                    <div>
                                        <p className="font-semibold text-xs mb-0.5">Период:</p>
                                        <p className="text-muted-foreground">{h.period}</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-xs mb-0.5">Оклад:</p>
                                        <p className="text-muted-foreground">{h.salary}</p>
                                    </div>
                                </div>

                                <div>
                                    <p className="font-semibold text-xs mb-1.5">Основные достижения:</p>
                                    <ul className="space-y-1">
                                        {h.duties.map((d, j) => (
                                            <li key={j} className="flex items-start gap-2 text-sm">
                                                <Bookmark className="h-3.5 w-3.5 text-yellow-500 shrink-0 mt-0.5" />
                                                <span>{d}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
