"use client";

import { useState } from "react";
import { Search, Eye, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

type EmployeeStatus = "active" | "vacation" | "sick";

type Employee = {
    initials: string;
    name: string;
    experience: string;
    position: string;
    department: string;
    email: string;
    phone: string;
    status: EmployeeStatus;
};

const employees: Employee[] = [
    {
        initials: "ИИ", name: "Иванов Иван Иванович", experience: "13 лет",
        position: "Ведущий инженер-металлург", department: "Производственный отдел",
        email: "i.ivanov@agmk.uz", phone: "+998 69 233-XX-XX (1234)", status: "active",
    },
    {
        initials: "ПП", name: "Петров Петр Петрович", experience: "11 лет",
        position: "Старший технолог", department: "Производственный отдел",
        email: "p.petrov@agmk.uz", phone: "+998 69 233-XX-XX (1235)", status: "active",
    },
    {
        initials: "СА", name: "Сидорова Анна Ивановна", experience: "8 лет",
        position: "Специалист по качеству", department: "Лаборатория",
        email: "a.sidorova@agmk.uz", phone: "+998 69 233-XX-XX (1236)", status: "active",
    },
    {
        initials: "КД", name: "Козлов Дмитрий Сергеевич", experience: "16 лет",
        position: "Начальник смены", department: "Производственный отдел",
        email: "d.kozlov@agmk.uz", phone: "+998 69 233-XX-XX (1237)", status: "active",
    },
    {
        initials: "МЕ", name: "Морозова Елена Александровна", experience: "10 лет",
        position: "HR-специалист", department: "Отдел кадров",
        email: "e.morozova@agmk.uz", phone: "+998 69 233-XX-XX (1238)", status: "vacation",
    },
];

const departments = ["Все отделы", "Производственный отдел", "Лаборатория", "Отдел кадров"];

const statusConfig: Record<EmployeeStatus, React.ReactNode> = {
    active: <Badge variant="outline" className="text-green-600 border-green-600">Активен</Badge>,
    vacation: <Badge variant="outline" className="text-blue-600 border-blue-600">В отпуске</Badge>,
    sick: <Badge variant="outline" className="text-yellow-600 border-yellow-600">Больничный</Badge>,
};

export function EmployeesListTab() {
    const [search, setSearch] = useState("");
    const [department, setDepartment] = useState("Все отделы");

    const filtered = employees.filter(e => {
        const matchSearch =
            e.name.toLowerCase().includes(search.toLowerCase()) ||
            e.position.toLowerCase().includes(search.toLowerCase()) ||
            e.department.toLowerCase().includes(search.toLowerCase());
        const matchDept = department === "Все отделы" || e.department === department;
        return matchSearch && matchDept;
    });

    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
            <div className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden />
                        <Input
                            className="pl-10"
                            placeholder="Поиск по имени, должности или отделу..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                    </div>
                    <Select value={department} onValueChange={setDepartment}>
                        <SelectTrigger className="w-full md:w-48">
                            <Filter className="h-4 w-4 mr-2" aria-hidden />
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {departments.map(d => (
                                <SelectItem key={d} value={d}>{d}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="px-6 pb-6 -mt-2">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Сотрудник</TableHead>
                            <TableHead>Должность</TableHead>
                            <TableHead>Отдел</TableHead>
                            <TableHead>Контакты</TableHead>
                            <TableHead>Статус</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filtered.map((e, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    <div className="flex items-center space-x-3">
                                        <Avatar>
                                            <AvatarFallback>{e.initials}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-medium">{e.name}</div>
                                            <div className="text-sm text-muted-foreground">Стаж: {e.experience}</div>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>{e.position}</TableCell>
                                <TableCell>{e.department}</TableCell>
                                <TableCell>
                                    <div className="space-y-1">
                                        <div className="text-sm">{e.email}</div>
                                        <div className="text-sm text-muted-foreground">{e.phone}</div>
                                    </div>
                                </TableCell>
                                <TableCell>{statusConfig[e.status]}</TableCell>
                                <TableCell>
                                    <Button variant="ghost" size="sm">
                                        <Eye className="h-4 w-4" aria-hidden />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
