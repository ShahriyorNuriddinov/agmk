import { Stethoscope, AlertCircle, Heart, Zap } from "lucide-react";

const recs = [
    {
        date: "18.09.2025", doctor: "Петрова И.А.",
        rec: "Избегать переохлаждения, укреплять иммунитет",
        action: "При повторных симптомах обратиться к врачу",
    },
    {
        date: "30.06.2025", doctor: "Сидоров В.П.",
        rec: "Лечебная физкультура, избегать тяжелых физических нагрузок",
        action: "Контрольный осмотр через 3 месяца",
    },
    {
        date: "15.03.2025", doctor: "Морозова Е.К.",
        rec: "Диета №1, исключить острую и жирную пищу",
        action: "Повторное обследование при необходимости",
    },
];

const prevention = [
    {
        icon: Heart, iconColor: "text-red-500",
        title: "Сердечно-сосудистая система",
        items: [
            "Регулярные кардиологические обследования",
            "Контроль артериального давления",
            "Умеренные физические нагрузки",
            "Ограничение соли и жирной пищи",
        ],
    },
    {
        icon: Zap, iconColor: "text-green-500",
        title: "Общее здоровье",
        items: [
            "Ежегодная вакцинация против гриппа",
            "Вакцинация против гриппа",
            "Соблюдение режима труда и отдыха",
            "Здоровое питание и достаточный сон",
        ],
    },
];

export function SickLeaveRecommendations() {
    return (
        <div className="space-y-6">
            <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
                <div className="px-6 pt-6">
                    <h4 className="leading-none font-semibold text-base">Медицинские рекомендации</h4>
                    <p className="text-sm text-muted-foreground mt-1">Рекомендации врачей по итогам лечения</p>
                </div>
                <div className="px-6 pb-6 -mt-2 space-y-4">
                    {recs.map((r, i) => (
                        <div key={i} className="border rounded-lg p-4">
                            <div className="flex items-start justify-between mb-3">
                                <div>
                                    <div className="flex items-center space-x-2">
                                        <Stethoscope className="h-4 w-4 text-blue-600" />
                                        <span className="font-semibold text-sm">Рекомендация от {r.date}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-0.5">Врач: {r.doctor}</p>
                                </div>
                                <AlertCircle className="h-5 w-5 text-yellow-600 shrink-0" />
                            </div>
                            <div className="space-y-2">
                                <div>
                                    <span className="font-medium text-sm">Рекомендации:</span>
                                    <p className="text-sm mt-0.5">{r.rec}</p>
                                </div>
                                <div>
                                    <span className="font-medium text-sm">Дальнейшие действия:</span>
                                    <p className="text-sm text-muted-foreground mt-0.5">{r.action}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
                <div className="px-6 pt-6">
                    <h4 className="leading-none font-semibold text-base">Рекомендации по профилактике</h4>
                    <p className="text-sm text-muted-foreground mt-1">Общие рекомендации для поддержания здоровья</p>
                </div>
                <div className="px-6 pb-6 -mt-2">
                    <div className="grid md:grid-cols-2 gap-6">
                        {prevention.map((p, i) => (
                            <div key={i}>
                                <div className="flex items-center gap-2 mb-2">
                                    <p.icon className={`h-4 w-4 ${p.iconColor}`} />
                                    <span className="font-medium text-sm">{p.title}</span>
                                </div>
                                <ul className="space-y-1">
                                    {p.items.map((item, j) => (
                                        <li key={j} className="text-sm text-muted-foreground">• {item}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
