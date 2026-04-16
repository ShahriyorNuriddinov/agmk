import { User, Building2, Factory, MapPin, Calendar, Clock, Briefcase } from "lucide-react";

export function BasicInfoCard() {
    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
            <div className="px-6 pt-6 pb-3">
                <h4 className="leading-none flex items-center space-x-2 text-base font-semibold">
                    <User className="h-5 w-5 text-blue-600" />
                    <span>Основная информация</span>
                </h4>
            </div>
            <div className="px-6 pb-6 pt-1">
                <div className="flex items-start space-x-4">
                    <span className="relative flex size-10 shrink-0 overflow-hidden rounded-full w-20 h-20 bg-muted items-center justify-center text-lg font-semibold">
                        ИИ
                    </span>
                    <div className="flex-1 space-y-4">
                        <div>
                            <h3 className="text-xl font-semibold">Иванов Иван Иванович</h3>
                            <p className="text-muted-foreground">Ведущий инженер-металлург</p>
                            <span className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium mt-1">
                                Руководящий состав
                            </span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Building2 className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">Предприятие:</span>
                                </div>
                                <p className="ml-6">Алмалыкский завод тяжёлых цветных металлов</p>
                                <div className="flex items-center space-x-2">
                                    <Factory className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">Цех:</span>
                                </div>
                                <p className="ml-6">Цех №3 - Переработка медного концентрата</p>
                                <div className="flex items-center space-x-2">
                                    <MapPin className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">Местоположение:</span>
                                </div>
                                <p className="ml-6">Производственный корпус №3, Кабинет 245</p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">Дата найма:</span>
                                </div>
                                <p className="ml-6">01.09.2011</p>
                                <div className="flex items-center space-x-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">Общий стаж:</span>
                                </div>
                                <p className="ml-6">14 лет 1 месяц</p>
                                <div className="flex items-center space-x-2">
                                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                                    <span className="font-medium">В должности:</span>
                                </div>
                                <p className="ml-6">7 лет 6 месяцев</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
