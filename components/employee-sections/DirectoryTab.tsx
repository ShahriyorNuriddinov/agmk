"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search, Phone, Mail, Cake, Crown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { employeesApi } from "@/api/employees";

const departments = [
    "Все подразделения",
    "Руководство",
    "Алмалыкский завод тяжёлых цветных металлов",
    "Кальмакирская фабрика",
    "Департамент финансов",
    "HR департамент",
    "IT служба",
    "Служба безопасности",
    "Управление транспорта",
];

export function DirectoryTab() {
    const [search, setSearch] = useState("");
    const [dept, setDept] = useState("Все подразделения");

    const { data, isLoading } = useQuery({
        queryKey: ["employees", search, dept],
        queryFn: () => employeesApi.getAll({
            search: search || undefined,
            department: dept === "Все подразделения" ? undefined : dept,
            limit: 50,
        }),
        placeholderData: (prev) => prev,
    });

    const employees = data?.data ?? [];

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
                            <SelectTrigger className="w-full md:w-64"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {departments.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Справочник сотрудников</CardTitle>
                    <CardDescription>
                        {isLoading ? "Загрузка..." : `Найдено ${data?.pagination?.total ?? employees.length} сотрудников`}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="text-center py-10 text-muted-foreground">Загрузка...</div>
                    ) : employees.length === 0 ? (
                        <div className="text-center py-10 text-muted-foreground">Сотрудники не найдены</div>
                    ) : (
                        <div className="overflow-x-auto">
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
                                    {employees.map((e: any) => {
                                        const initials = `${e.lastName?.[0] ?? ""}${e.firstName?.[0] ?? ""}`;
                                        const fullName = `${e.lastName} ${e.firstName} ${e.middleName ?? ""}`.trim();
                                        const birthday = e.birthday
                                            ? new Date(e.birthday).toLocaleDateString("ru-RU")
                                            : "—";

                                        return (
                                            <TableRow key={e._id} className="cursor-pointer">
                                                <TableCell>
                                                    <div className="flex items-center space-x-3">
                                                        <Avatar className="w-10 h-10">
                                                            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <div className="font-medium flex items-center space-x-2">
                                                                <span>{fullName}</span>
                                                                {e.isLeader && <Crown className="h-3 w-3 text-yellow-600" aria-hidden />}
                                                            </div>
                                                            <div className="text-sm text-muted-foreground">
                                                                ID: {e.tabNumber}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{e.position ?? "—"}</TableCell>
                                                <TableCell>{e.department ?? "—"}</TableCell>
                                                <TableCell>
                                                    <div className="space-y-1 text-sm">
                                                        {e.phone && (
                                                            <div className="flex items-center space-x-2">
                                                                <Phone className="h-3 w-3 text-muted-foreground" aria-hidden />
                                                                <span className="font-mono">{e.phone}</span>
                                                            </div>
                                                        )}
                                                        {e.mobile && (
                                                            <div className="flex items-center space-x-2">
                                                                <span className="text-muted-foreground text-xs">моб:</span>
                                                                <span className="font-mono text-xs">{e.mobile}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    {e.email && (
                                                        <div className="flex items-center space-x-2">
                                                            <Mail className="h-3 w-3 text-muted-foreground" aria-hidden />
                                                            <span className="text-sm font-mono">{e.email}</span>
                                                        </div>
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center space-x-2">
                                                        <Cake className="h-3 w-3 text-pink-600" aria-hidden />
                                                        <span className="text-sm">{birthday}</span>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
