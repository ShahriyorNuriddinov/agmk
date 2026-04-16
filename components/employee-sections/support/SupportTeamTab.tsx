import { Phone, Mail, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

type MemberStatus = "available" | "busy" | "offline";

type Member = {
    name: string;
    role: string;
    phone: string;
    ext: string;
    email: string;
    hours: string;
    status: MemberStatus;
    skills: string[];
};

const team: Member[] = [
    {
        name: "Волков Сергей Романович",
        role: "Руководитель IT службы",
        phone: "+998 69 233-60-01",
        ext: "6001",
        email: "s.volkov@agmk.uz",
        hours: "08:00 - 17:00",
        status: "available",
        skills: ["Системное администрирование", "Сети", "Безопасность"],
    },
    {
        name: "Тешабаев Азиз Фарходович",
        role: "Системный администратор",
        phone: "+998 69 233-60-05",
        ext: "6005",
        email: "a.teshabaev@agmk.uz",
        hours: "08:00 - 17:00",
        status: "busy",
        skills: ["Оборудование", "Программное обеспечение", "1С"],
    },
    {
        name: "Петров Константин Александрович",
        role: "Сетевой администратор",
        phone: "+998 69 233-60-08",
        ext: "6008",
        email: "k.petrov@agmk.uz",
        hours: "08:00 - 17:00",
        status: "available",
        skills: ["Сети", "Телефония", "Серверы"],
    },
    {
        name: "Иванов Дмитрий Петрович",
        role: "Специалист по безопасности ИТ",
        phone: "+998 69 233-60-12",
        ext: "6012",
        email: "d.ivanov@agmk.uz",
        hours: "08:00 - 17:00",
        status: "available",
        skills: ["Информационная безопасность", "Антивирусы", "Аудит"],
    },
];

const statusBadge: Record<MemberStatus, { label: string; cls: string }> = {
    available: { label: "Доступен", cls: "text-green-600 border-green-600" },
    busy: { label: "Занят", cls: "text-red-600 border-red-600" },
    offline: { label: "Недоступен", cls: "text-gray-500 border-gray-400" },
};

export function SupportTeamTab() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Команда технической поддержки</CardTitle>
                <CardDescription>Специалисты IT службы АГМК</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                    {team.map((m) => (
                        <Card key={m.email} className="transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h4 className="font-semibold">{m.name}</h4>
                                        <p className="text-sm text-muted-foreground">{m.role}</p>
                                    </div>
                                    <Badge variant="outline" className={statusBadge[m.status].cls}>
                                        {statusBadge[m.status].label}
                                    </Badge>
                                </div>

                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center space-x-2">
                                        <Phone className="h-4 w-4 text-blue-600" aria-hidden />
                                        <span className="font-mono">{m.phone}</span>
                                        <Badge variant="outline" className="text-xs">вн. {m.ext}</Badge>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Mail className="h-4 w-4 text-green-600" aria-hidden />
                                        <span className="font-mono text-xs">{m.email}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <Clock className="h-4 w-4 text-orange-600" aria-hidden />
                                        <span>{m.hours}</span>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <h5 className="font-medium text-sm mb-2">Специализация:</h5>
                                    <div className="flex flex-wrap gap-1">
                                        {m.skills.map((s) => (
                                            <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
