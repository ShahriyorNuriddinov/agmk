"use client";

import { useState } from "react";
import { Search, Phone, Mail, Cake, Crown, Factory, Building, Users, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

type Employee = {
    initials: string;
    name: string;
    isLeader: boolean;
    deptIcon: React.ElementType;
    deptIconCls: string;
    id: number;
    position: string;
    department: string;
    phone: string;
    ext: string;
    mobile: string;
    email: string;
    birthday: string;
};

const employees: Employee[] = [
    { initials: "РАК", name: "Раимов Алишер Каримович", isLeader: true, deptIcon: Crown, deptIconCls: "text-purple-600", id: 1, position: "Генеральный директор АГМК", department: "Руководство", phone: "+998 69 233-10-01", ext: "1001", mobile: "+998 90 123-45-67", email: "a.raimov@agmk.uz", birthday: "15.03.1965" },
    { initials: "ПП", name: "Петров Павел Петрович", isLeader: true, deptIcon: Crown, deptIconCls: "text-purple-600", id: 2, position: "Заместитель генерального директора", department: "Руководство", phone: "+998 69 233-10-02", ext: "1002", mobile: "+998 90 123-45-68", email: "p.petrov@agmk.uz", birthday: "22.07.1970" },
    { initials: "МБТ", name: "Мирзаев Бахтиёр Турсунович", isLeader: true, deptIcon: Factory, deptIconCls: "text-blue-600", id: 3, position: "Директор Алмалыкского завода", department: "Алмалыкский завод тяжёлых цветных металлов", phone: "+998 69 233-20-01", ext: "2001", mobile: "+998 90 234-56-78", email: "b.mirzaev@agmk.uz", birthday: "08.11.1968" },
    { initials: "ИИИ", name: "Иванов Иван Иванович", isLeader: false, deptIcon: Factory, deptIconCls: "text-blue-600", id: 4, position: "Ведущий инженер-металлург", department: "Алмалыкский завод тяжёлых цветных металлов", phone: "+998 69 233-20-15", ext: "2015", mobile: "+998 90 345-67-89", email: "i.ivanov@agmk.uz", birthday: "12.05.1985" },
    { initials: "САИ", name: "Сидорова Анна Ивановна", isLeader: true, deptIcon: Factory, deptIconCls: "text-blue-600", id: 5, position: "Начальник лаборатории качества", department: "Алмалыкский завод тяжёлых цветных металлов", phone: "+998 69 233-20-25", ext: "2025", mobile: "+998 90 456-78-90", email: "a.sidorova@agmk.uz", birthday: "30.09.1980" },
    { initials: "УКР", name: "Усманов Камил Рашидович", isLeader: true, deptIcon: Building, deptIconCls: "text-green-600", id: 6, position: "Директор Кальмакирской фабрики", department: "Кальмакирская фабрика", phone: "+998 69 233-30-01", ext: "3001", mobile: "+998 90 567-89-01", email: "k.usmanov@agmk.uz", birthday: "18.01.1972" },
    { initials: "МЕК", name: "Морозова Елена Константиновна", isLeader: true, deptIcon: Building, deptIconCls: "text-green-600", id: 7, position: "Начальник смены", department: "Кальмакирская фабрика", phone: "+998 69 233-30-12", ext: "3012", mobile: "+998 90 678-90-12", email: "e.morozova@agmk.uz", birthday: "25.12.1983" },
    { initials: "КНА", name: "Каримова Нилуфар Азимовна", isLeader: true, deptIcon: Building, deptIconCls: "text-orange-600", id: 8, position: "Директор департамента финансов", department: "Департамент финансов", phone: "+998 69 233-40-01", ext: "4001", mobile: "+998 90 789-01-23", email: "n.karimova@agmk.uz", birthday: "05.06.1975" },
    { initials: "КДС", name: "Козлов Дмитрий Сергеевич", isLeader: false, deptIcon: Building, deptIconCls: "text-orange-600", id: 9, position: "Главный бухгалтер", department: "Департамент финансов", phone: "+998 69 233-40-15", ext: "4015", mobile: "+998 90 890-12-34", email: "d.kozlov@agmk.uz", birthday: "14.04.1978" },
    { initials: "АСШ", name: "Алиева Севара Шукуровна", isLeader: true, deptIcon: Building, deptIconCls: "text-orange-600", id: 10, position: "Директор HR департамента", department: "HR департамент", phone: "+998 69 233-50-01", ext: "5001", mobile: "+998 90 901-23-45", email: "s.alieva@agmk.uz", birthday: "28.02.1980" },
    { initials: "НАМ", name: "Новикова Анна Михайловна", isLeader: false, deptIcon: Building, deptIconCls: "text-orange-600", id: 11, position: "Специалист по кадрам", department: "HR департамент", phone: "+998 69 233-50-12", ext: "5012", mobile: "+998 90 012-34-56", email: "a.novikova@agmk.uz", birthday: "16.08.1987" },
    { initials: "ВСР", name: "Волков Сергей Романович", isLeader: true, deptIcon: Users, deptIconCls: "text-gray-600", id: 12, position: "Руководитель IT службы", department: "IT служба", phone: "+998 69 233-60-01", ext: "6001", mobile: "+998 90 123-45-67", email: "s.volkov@agmk.uz", birthday: "11.10.1982" },
    { initials: "ТАФ", name: "Тешабаев Азиз Фарходович", isLeader: false, deptIcon: Users, deptIconCls: "text-gray-600", id: 13, position: "Системный администратор", department: "IT служба", phone: "+998 69 233-60-05", ext: "6005", mobile: "+998 90 234-56-78", email: "a.teshabaev@agmk.uz", birthday: "07.09.1990" },
    { initials: "НВП", name: "Николаев Владимир Петрович", isLeader: true, deptIcon: Users, deptIconCls: "text-gray-600", id: 14, position: "Начальник службы безопасности", department: "Служба безопасности", phone: "+998 69 233-70-01", ext: "7001", mobile: "+998 90 345-67-89", email: "v.nikolaev@agmk.uz", birthday: "03.02.1973" },
    { initials: "КША", name: "Каримов Шавкат Абдурахимович", isLeader: true, deptIcon: Crown, deptIconCls: "text-purple-600", id: 15, position: "Начальник управления транспорта", department: "Управление транспорта", phone: "+998 69 233-80-01", ext: "8001", mobile: "+998 90 456-78-90", email: "sh.karimov@agmk.uz", birthday: "19.06.1969" },
];

const departments = ["Все подразделения", "Руководство", "Алмалыкский завод тяжёлых цветных металлов", "Кальмакирская фабрика", "Департамент финансов", "HR департамент", "IT служба", "Служба безопасности", "Управление транспорта"];

export function PhonebookDirectoryTab() {
    const [search, setSearch] = useState("");
    const [dept, setDept] = useState("Все подразделения");

    const filtered = employees.filter((e) => {
        const matchSearch = search === "" || e.name.toLowerCase().includes(search.toLowerCase()) || e.position.toLowerCase().includes(search.toLowerCase()) || e.phone.includes(search);
        const matchDept = dept === "Все подразделения" || e.department === dept;
        return matchSearch && matchDept;
    });

    return (
        <div className="space-y-6">
            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden />
                            <Input
                                className="pl-10"
                                placeholder="Поиск по имени, должности, телефону..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <Select value={dept} onValueChange={setDept}>
                            <SelectTrigger className="w-full md:w-64">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {departments.map((d) => (
                                    <SelectItem key={d} value={d}>{d}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Справочник сотрудников</CardTitle>
                    <CardDescription>Найдено {filtered.length} сотрудников</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Сотрудник</TableHead>
                                <TableHead>Должность</TableHead>
                                <TableHead>Подразделение</TableHead>
                                <TableHead>Телефоны</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>День рождения</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filtered.map((e) => (
                                <TableRow key={e.id}>
                                    <TableCell>
                                        <div className="flex items-center space-x-3">
                                            <Avatar className="w-10 h-10">
                                                <AvatarFallback className="text-xs">{e.initials}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-medium flex items-center space-x-2">
                                                    <span>{e.name}</span>
                                                    {e.isLeader && <Crown className="h-3 w-3 text-yellow-600" aria-hidden />}
                                                </div>
                                                <div className="text-sm text-muted-foreground flex items-center space-x-1">
                                                    <e.deptIcon className={`h-4 w-4 ${e.deptIconCls}`} aria-hidden />
                                                    <span>ID: {e.id}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{e.position}</TableCell>
                                    <TableCell>
                                        <div className="font-medium">{e.department}</div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="space-y-1 text-sm">
                                            <div className="flex items-center space-x-2">
                                                <Phone className="h-3 w-3 text-muted-foreground" aria-hidden />
                                                <span className="font-mono">{e.phone}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-muted-foreground">вн:</span>
                                                <span className="font-mono">{e.ext}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <span className="text-muted-foreground">моб:</span>
                                                <span className="font-mono text-xs">{e.mobile}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <Mail className="h-3 w-3 text-muted-foreground" aria-hidden />
                                            <span className="text-sm font-mono">{e.email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <Cake className="h-3 w-3 text-pink-600" aria-hidden />
                                            <span className="text-sm">{e.birthday}</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
