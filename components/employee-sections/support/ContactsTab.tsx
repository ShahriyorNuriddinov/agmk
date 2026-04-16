import { Phone, Mail, Headphones, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ContactsTab() {
    return (
        <div className="grid md:grid-cols-2 gap-6">
            {/* Горячая линия */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <Headphones className="h-5 w-5 text-green-600" aria-hidden />
                        <span>Горячая линия поддержки</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg transition-all duration-200 hover:shadow-sm hover:bg-blue-100/70">
                        <div className="flex items-center space-x-2 mb-2">
                            <Phone className="h-5 w-5 text-blue-600" aria-hidden />
                            <span className="font-bold text-xl">6001</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Внутренний номер службы поддержки</p>
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg transition-all duration-200 hover:shadow-sm hover:bg-green-100/70">
                        <div className="flex items-center space-x-2 mb-2">
                            <Phone className="h-5 w-5 text-green-600" aria-hidden />
                            <span className="font-bold text-lg">+998 69 233-60-01</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Прямой номер IT службы</p>
                    </div>

                    <div className="p-4 bg-orange-50 rounded-lg transition-all duration-200 hover:shadow-sm hover:bg-orange-100/70">
                        <div className="flex items-center space-x-2 mb-2">
                            <Mail className="h-5 w-5 text-orange-600" aria-hidden />
                            <span className="font-bold">support@agmk.uz</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Email для отправки заявок</p>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Время работы поддержки</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <h4 className="font-medium">Рабочие дни</h4>
                        <div className="text-sm space-y-1">
                            <div className="flex justify-between">
                                <span>Понедельник - Пятница:</span>
                                <span className="font-mono">08:00 - 17:00</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Обеденный перерыв:</span>
                                <span className="font-mono">12:00 - 13:00</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <h4 className="font-medium">Выходные дни</h4>
                        <div className="text-sm space-y-1">
                            <div className="flex justify-between">
                                <span>Суббота - Воскресенье:</span>
                                <span className="text-red-600">Выходной</span>
                            </div>
                            <p className="text-muted-foreground text-xs">* Экстренные вызовы по телефону +998 90 123-45-67</p>
                        </div>
                    </div>

                    <div className="p-3 bg-yellow-50 rounded-lg">
                        <div className="flex items-center space-x-2">
                            <Zap className="h-4 w-4 text-yellow-600" aria-hidden />
                            <span className="font-medium text-sm">Среднее время ответа</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                            Критические: 15 мин<br />
                            Высокий: 2 часа<br />
                            Средний: 4 часа<br />
                            Низкий: 24 часа
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
