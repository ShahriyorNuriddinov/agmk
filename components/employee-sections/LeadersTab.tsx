import { Phone, Mail, Cake, Crown, Factory, Building, Users } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

type Leader = {
    initials: string;
    name: string;
    deptIcon: React.ElementType;
    deptIconCls: string;
    position: string;
    department: string;
    phone: string;
    ext: string;
    email: string;
    birthday: string;
};

const leaders: Leader[] = [
    { initials: "РАК", name: "Раимов Алишер Каримович", deptIcon: Crown, deptIconCls: "text-purple-600", position: "Генеральный директор АГМК", department: "Руководство", phone: "+998 69 233-10-01", ext: "1001", email: "a.raimov@agmk.uz", birthday: "15 марта" },
    { initials: "ПП", name: "Петров Павел Петрович", deptIcon: Crown, deptIconCls: "text-purple-600", position: "Заместитель генерального директора", department: "Руководство", phone: "+998 69 233-10-02", ext: "1002", email: "p.petrov@agmk.uz", birthday: "22 июля" },
    { initials: "МБТ", name: "Мирзаев Бахтиёр Турсунович", deptIcon: Factory, deptIconCls: "text-blue-600", position: "Директор Алмалыкского завода", department: "Алмалыкский завод тяжёлых цветных металлов", phone: "+998 69 233-20-01", ext: "2001", email: "b.mirzaev@agmk.uz", birthday: "08 ноября" },
    { initials: "САИ", name: "Сидорова Анна Ивановна", deptIcon: Factory, deptIconCls: "text-blue-600", position: "Начальник лаборатории качества", department: "Алмалыкский завод тяжёлых цветных металлов", phone: "+998 69 233-20-25", ext: "2025", email: "a.sidorova@agmk.uz", birthday: "30 сентября" },
    { initials: "УКР", name: "Усманов Камил Рашидович", deptIcon: Building, deptIconCls: "text-green-600", position: "Директор Кальмакирской фабрики", department: "Кальмакирская фабрика", phone: "+998 69 233-30-01", ext: "3001", email: "k.usmanov@agmk.uz", birthday: "18 января" },
    { initials: "МЕК", name: "Морозова Елена Константиновна", deptIcon: Building, deptIconCls: "text-green-600", position: "Начальник смены", department: "Кальмакирская фабрика", phone: "+998 69 233-30-12", ext: "3012", email: "e.morozova@agmk.uz", birthday: "25 декабря" },
    { initials: "КНА", name: "Каримова Нилуфар Азимовна", deptIcon: Building, deptIconCls: "text-orange-600", position: "Директор департамента финансов", department: "Департамент финансов", phone: "+998 69 233-40-01", ext: "4001", email: "n.karimova@agmk.uz", birthday: "05 июня" },
    { initials: "АСШ", name: "Алиева Севара Шукуровна", deptIcon: Building, deptIconCls: "text-orange-600", position: "Директор HR департамента", department: "HR департамент", phone: "+998 69 233-50-01", ext: "5001", email: "s.alieva@agmk.uz", birthday: "28 февраля" },
    { initials: "ВСР", name: "Волков Сергей Романович", deptIcon: Users, deptIconCls: "text-gray-600", position: "Руководитель IT службы", department: "IT служба", phone: "+998 69 233-60-01", ext: "6001", email: "s.volkov@agmk.uz", birthday: "11 октября" },
    { initials: "НВП", name: "Николаев Владимир Петрович", deptIcon: Users, deptIconCls: "text-gray-600", position: "Начальник службы безопасности", department: "Служба безопасности", phone: "+998 69 233-70-01", ext: "7001", email: "v.nikolaev@agmk.uz", birthday: "03 февраля" },
    { initials: "КША", name: "Каримов Шавкат Абдурахимович", deptIcon: Crown, deptIconCls: "text-purple-600", position: "Начальник управления транспорта", department: "Управление транспорта", phone: "+998 69 233-80-01", ext: "8001", email: "sh.karimov@agmk.uz", birthday: "19 июня" },
];

export function LeadersTab() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    <Crown className="h-5 w-5 text-yellow-600" aria-hidden />
                    <span>Руководящий состав АГМК</span>
                </CardTitle>
                <CardDescription>Контактная информация руководителей подразделений</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                    {leaders.map((e) => (
                        <Card key={e.email} className="transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                            <CardContent className="p-6">
                                <div className="flex items-start space-x-4">
                                    <Avatar className="w-12 h-12">
                                        <AvatarFallback>{e.initials}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 space-y-3">
                                        <div>
                                            <h4 className="font-semibold flex items-center space-x-2">
                                                <span>{e.name}</span>
                                                <Crown className="h-4 w-4 text-yellow-600" aria-hidden />
                                            </h4>
                                            <p className="text-sm text-muted-foreground">{e.position}</p>
                                            <p className="text-sm font-medium">{e.department}</p>
                                        </div>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center space-x-2">
                                                <Phone className="h-4 w-4 text-blue-600" aria-hidden />
                                                <span className="font-mono">{e.phone}</span>
                                                <Badge variant="outline" className="text-xs">вн. {e.ext}</Badge>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Mail className="h-4 w-4 text-green-600" aria-hidden />
                                                <span className="font-mono text-xs">{e.email}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Cake className="h-4 w-4 text-pink-600" aria-hidden />
                                                <span>{e.birthday}</span>
                                            </div>
                                        </div>
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
