import { Cake, Mail, Calendar, Crown, Factory, Building, Users } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Employee = {
    initials: string;
    name: string;
    deptIcon: React.ElementType;
    deptIconCls: string;
    id: number;
    position: string;
    department: string;
    email: string;
    birthday: string;
};

const employees: Employee[] = [
    { initials: "РАК", name: "Раимов Алишер Каримович", deptIcon: Crown, deptIconCls: "text-purple-600", id: 1, position: "Генеральный директор АГМК", department: "Руководство", email: "a.raimov@agmk.uz", birthday: "15.03.1965" },
    { initials: "ПП", name: "Петров Павел Петрович", deptIcon: Crown, deptIconCls: "text-purple-600", id: 2, position: "Заместитель генерального директора", department: "Руководство", email: "p.petrov@agmk.uz", birthday: "22.07.1970" },
    { initials: "МБТ", name: "Мирзаев Бахтиёр Турсунович", deptIcon: Factory, deptIconCls: "text-blue-600", id: 3, position: "Директор Алмалыкского завода", department: "Алмалыкский завод тяжёлых цветных металлов", email: "b.mirzaev@agmk.uz", birthday: "08.11.1968" },
    { initials: "ИИИ", name: "Иванов Иван Иванович", deptIcon: Factory, deptIconCls: "text-blue-600", id: 4, position: "Ведущий инженер-металлург", department: "Алмалыкский завод тяжёлых цветных металлов", email: "i.ivanov@agmk.uz", birthday: "12.05.1985" },
    { initials: "САИ", name: "Сидорова Анна Ивановна", deptIcon: Factory, deptIconCls: "text-blue-600", id: 5, position: "Начальник лаборатории качества", department: "Алмалыкский завод тяжёлых цветных металлов", email: "a.sidorova@agmk.uz", birthday: "30.09.1980" },
    { initials: "УКР", name: "Усманов Камил Рашидович", deptIcon: Building, deptIconCls: "text-green-600", id: 6, position: "Директор Кальмакирской фабрики", department: "Кальмакирская фабрика", email: "k.usmanov@agmk.uz", birthday: "18.01.1972" },
    { initials: "МЕК", name: "Морозова Елена Константиновна", deptIcon: Building, deptIconCls: "text-green-600", id: 7, position: "Начальник смены", department: "Кальмакирская фабрика", email: "e.morozova@agmk.uz", birthday: "25.12.1983" },
    { initials: "КНА", name: "Каримова Нилуфар Азимовна", deptIcon: Building, deptIconCls: "text-orange-600", id: 8, position: "Директор департамента финансов", department: "Департамент финансов", email: "n.karimova@agmk.uz", birthday: "05.06.1975" },
    { initials: "КДС", name: "Козлов Дмитрий Сергеевич", deptIcon: Building, deptIconCls: "text-orange-600", id: 9, position: "Главный бухгалтер", department: "Департамент финансов", email: "d.kozlov@agmk.uz", birthday: "14.04.1978" },
    { initials: "АСШ", name: "Алиева Севара Шукуровна", deptIcon: Building, deptIconCls: "text-orange-600", id: 10, position: "Директор HR департамента", department: "HR департамент", email: "s.alieva@agmk.uz", birthday: "28.02.1980" },
    { initials: "НАМ", name: "Новикова Анна Михайловна", deptIcon: Building, deptIconCls: "text-orange-600", id: 11, position: "Специалист по кадрам", department: "HR департамент", email: "a.novikova@agmk.uz", birthday: "16.08.1987" },
    { initials: "ВСР", name: "Волков Сергей Романович", deptIcon: Users, deptIconCls: "text-gray-600", id: 12, position: "Руководитель IT службы", department: "IT служба", email: "s.volkov@agmk.uz", birthday: "11.10.1982" },
    { initials: "ТАФ", name: "Тешабаев Азиз Фарходович", deptIcon: Users, deptIconCls: "text-gray-600", id: 13, position: "Системный администратор", department: "IT служба", email: "a.teshabaev@agmk.uz", birthday: "07.09.1990" },
    { initials: "НВП", name: "Николаев Владимир Петрович", deptIcon: Users, deptIconCls: "text-gray-600", id: 14, position: "Начальник службы безопасности", department: "Служба безопасности", email: "v.nikolaev@agmk.uz", birthday: "03.02.1973" },
    { initials: "КША", name: "Каримов Шавкат Абдурахимович", deptIcon: Crown, deptIconCls: "text-purple-600", id: 15, position: "Начальник управления транспорта", department: "Управление транспорта", email: "sh.karimov@agmk.uz", birthday: "19.06.1969" },
];

const months = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"];

export function BirthdaysTab() {
    const today = new Date();

    const weekBirthdays = employees.filter((e) => {
        const [day, month] = e.birthday.split(".").map(Number);
        const bday = new Date(today.getFullYear(), month - 1, day);
        if (bday < today) bday.setFullYear(today.getFullYear() + 1);
        return Math.ceil((bday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) <= 7;
    });

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <Cake className="h-5 w-5 text-pink-500" aria-hidden />
                        <span>Дни рождения на этой неделе</span>
                    </CardTitle>
                    <CardDescription>Сотрудники, у которых день рождения на текущей неделе</CardDescription>
                </CardHeader>
                <CardContent>
                    {weekBirthdays.length === 0 ? (
                        <div className="text-center py-8">
                            <Cake className="h-16 w-16 text-muted-foreground mx-auto mb-4" aria-hidden />
                            <h3 className="text-lg font-medium mb-2">Нет дней рождения на этой неделе</h3>
                            <p className="text-muted-foreground">На текущую неделю не запланировано празднований дней рождения</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Сотрудник</TableHead>
                                        <TableHead>Должность</TableHead>
                                        <TableHead>Дата рождения</TableHead>
                                        <TableHead>Email</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {weekBirthdays.map((e) => (
                                        <TableRow key={e.id}>
                                            <TableCell>
                                                <div className="flex items-center space-x-3">
                                                    <Avatar className="w-10 h-10">
                                                        <AvatarFallback className="text-xs">{e.initials}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="font-medium">{e.name}</div>
                                                </div>
                                            </TableCell>
                                            <TableCell>{e.position}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Cake className="h-3 w-3 text-pink-600" aria-hidden />
                                                    <span className="font-mono">{e.birthday}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center space-x-2">
                                                    <Mail className="h-3 w-3 text-muted-foreground" aria-hidden />
                                                    <span className="font-mono text-xs">{e.email}</span>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Календарь дней рождения</CardTitle>
                    <CardDescription>Дни рождения сотрудников по месяцам</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {months.map((monthName, idx) => {
                            const monthEmployees = employees.filter((e) => parseInt(e.birthday.split(".")[1], 10) === idx + 1);
                            if (monthEmployees.length === 0) return null;
                            return (
                                <div key={monthName} className="border rounded-lg p-3 transition-all duration-200 hover:shadow-md hover:border-primary/30 hover:-translate-y-0.5">
                                    <h4 className="font-medium mb-2 flex items-center space-x-2">
                                        <Calendar className="h-4 w-4 text-blue-600" aria-hidden />
                                        <span>{monthName}</span>
                                        <Badge variant="outline" className="text-xs">{monthEmployees.length}</Badge>
                                    </h4>
                                    <div className="space-y-1">
                                        {monthEmployees.map((e) => (
                                            <div key={e.id} className="text-sm flex justify-between">
                                                <span>{e.name.split(" ")[0]} {e.name.split(" ")[1]?.[0]}.</span>
                                                <span className="text-muted-foreground">{e.birthday.split(".")[0]}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
