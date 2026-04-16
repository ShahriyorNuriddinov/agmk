import { Phone, Mail, MapPin, User, Target, TrendingUp, Camera } from "lucide-react";

const contacts = [
    { label: "Рабочий телефон", icon: Phone, value: "+998 (69) 233-XX-XX (внутр. 1234)" },
    { label: "Email", icon: Mail, value: "i.ivanov@agmk.uz" },
    { label: "Рабочий кабинет", icon: MapPin, value: "Корпус А, этаж 3, каб. 301" },
    { label: "Непосредственный руководитель", icon: User, value: "Петров Петр Петрович" },
];

const kpis = [
    { label: "Качество продукции", value: 98, goal: 95, trendColor: "text-green-500" },
    { label: "Выполнение плана", value: 105, goal: 100, trendColor: "text-green-500" },
    { label: "Соблюдение сроков", value: 96, goal: 95, trendColor: "text-gray-500" },
    { label: "Инновационная активность", value: 85, goal: 80, trendColor: "text-green-500" },
];

export function GeneralTab() {
    return (
        <div className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
                <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
                    <div className="p-6">
                        <div className="flex flex-col items-center space-y-4">
                            <div className="relative">
                                <span className="relative flex shrink-0 overflow-hidden rounded-full w-24 h-24 bg-muted items-center justify-center text-2xl font-semibold">
                                    ИИ
                                </span>
                                <button className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center">
                                    <Camera className="h-3.5 w-3.5" />
                                </button>
                            </div>
                            <div className="text-center">
                                <h3 className="font-bold">Иванов Иван Иванович</h3>
                                <p className="text-sm text-muted-foreground">Ведущий инженер-металлург</p>
                                <p className="text-sm text-muted-foreground">Производственный отдел</p>
                            </div>
                            <div className="w-full space-y-2">
                                <span className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium border-transparent bg-blue-600 text-white w-full justify-center">
                                    ID: AGM-2013-1234
                                </span>
                                <span className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium text-foreground w-full justify-center">
                                    Стаж: 12 лет 6 месяцев
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-2 bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
                    <div className="px-6 pt-6">
                        <h4 className="font-semibold">Контактная информация</h4>
                    </div>
                    <div className="px-6 pb-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            {contacts.map((c) => (
                                <div key={c.label} className="space-y-1.5">
                                    <p className="text-sm font-medium">{c.label}</p>
                                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                        <c.icon className="h-4 w-4 shrink-0" />
                                        <span>{c.value}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
                <div className="px-6 pt-6">
                    <h4 className="leading-none flex items-center space-x-2 font-semibold">
                        <Target className="h-5 w-5" />
                        <span>Ключевые показатели эффективности (KPI)</span>
                    </h4>
                </div>
                <div className="px-6 pb-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {kpis.map((k) => (
                            <div key={k.label} className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium">{k.label}</span>
                                    <div className="flex items-center space-x-1">
                                        <TrendingUp className={`h-3 w-3 ${k.trendColor}`} />
                                        <span className="text-sm font-bold">{k.value}%</span>
                                    </div>
                                </div>
                                <div className="bg-blue-600/20 relative w-full overflow-hidden rounded-full h-2">
                                    <div
                                        className="bg-blue-600 h-full transition-all rounded-full"
                                        style={{ width: `${Math.min(k.value, 100)}%` }}
                                    />
                                </div>
                                <div className="text-xs text-muted-foreground">Цель: {k.goal}%</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
