import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const faqItems = [
    { category: "Пароли", question: "Как сбросить пароль от корпоративной учетной записи?", answer: "Обратитесь в IT службу по телефону 6001 или создайте заявку. При себе иметь паспорт или служебное удостоверение." },
    { category: "Оборудование", question: "Что делать, если компьютер не включается?", answer: "Проверьте подключение питания, убедитесь что кабель подключен к розетке и компьютеру. Если не помогает - создайте заявку." },
    { category: "Сеть", question: "Как подключиться к корпоративной Wi-Fi сети?", answer: "Выберите сеть AGMK-CORP, введите свой логин и пароль от домена. Если не получается - обратитесь в IT службу." },
    { category: "Программы", question: "Можно ли установить дополнительное программное обеспечение?", answer: "Установка ПО возможна только после согласования с IT службой и службой безопасности. Создайте соответствующую заявку." },
    { category: "Безопасность", question: "Что делать при подозрении на вирус?", answer: "Немедленно отключите компьютер от сети и обратитесь в IT службу по телефону 6001. Не запускайте подозрительные файлы." },
    { category: "Доступы", question: "Как получить доступ к общим папкам?", answer: "Доступ к общим папкам предоставляется по заявке через вашего руководителя. Укажите какие папки нужны и для каких целей." },
];

const selfServiceLinks = [
    { label: "Смена пароля", href: "#" },
    { label: "Настройка Outlook", href: "#" },
    { label: "Подключение к VPN", href: "#" },
    { label: "Установка сертификатов", href: "#" },
];

const docsLinks = [
    { label: "Инструкции пользователя", href: "#" },
    { label: "Политика ИБ", href: "#" },
    { label: "Корпоративные стандарты", href: "#" },
    { label: "База знаний", href: "#" },
];

export function FaqTab() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Часто задаваемые вопросы</CardTitle>
                    <CardDescription>Ответы на популярные вопросы по IT услугам</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {faqItems.map((item, idx) => (
                            <div key={idx} className="border rounded-lg p-4 transition-all duration-200 hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5">
                                <div className="flex items-start space-x-3">
                                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                                        <span className="text-xs font-medium text-blue-600">?</span>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold mb-2">{item.question}</h4>
                                        <p className="text-sm text-muted-foreground mb-2">{item.answer}</p>
                                        <Badge variant="outline" className="text-xs">{item.category}</Badge>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Полезные ссылки</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <h4 className="font-medium">Самообслуживание</h4>
                            <div className="space-y-1 text-sm">
                                {selfServiceLinks.map((l) => (
                                    <p key={l.label}>• <a href={l.href} className="text-blue-600 hover:underline">{l.label}</a></p>
                                ))}
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h4 className="font-medium">Документация</h4>
                            <div className="space-y-1 text-sm">
                                {docsLinks.map((l) => (
                                    <p key={l.label}>• <a href={l.href} className="text-blue-600 hover:underline">{l.label}</a></p>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
