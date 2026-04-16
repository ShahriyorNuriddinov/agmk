"use client";

import { useState } from "react";
import { Clock, CheckCircle, AlertCircle, Search, Monitor } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const statusMap: Record<string, { label: string; cls: string; Icon: React.ElementType }> = {
    open: { label: "Ожидает", cls: "text-yellow-600 border-yellow-600", Icon: AlertCircle },
    in_progress: { label: "В работе", cls: "text-blue-600 border-blue-600", Icon: Clock },
    resolved: { label: "Решено", cls: "text-green-600 border-green-600", Icon: CheckCircle },
    closed: { label: "Закрыто", cls: "text-green-600 border-green-600", Icon: CheckCircle },
};

const priorityMap: Record<string, { label: string; variant: "destructive" | "outline"; cls?: string }> = {
    high: { label: "Высокий", variant: "destructive" },
    medium: { label: "Средний", variant: "outline", cls: "text-yellow-600 border-yellow-600" },
    low: { label: "Низкий", variant: "outline", cls: "text-green-600 border-green-600" },
};

export function AllTicketsTab({ tickets = [] }: { tickets?: any[] }) {
    const [search, setSearch] = useState("");

    const filtered = tickets.filter((t) =>
        search === "" ||
        t.title?.toLowerCase().includes(search.toLowerCase()) ||
        t.ticketNumber?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <Card>
                <CardContent className="p-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden />
                        <Input
                            className="pl-10"
                            placeholder="Поиск по номеру или теме..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Все заявки</CardTitle>
                    <CardDescription>Найдено {filtered.length} заявок</CardDescription>
                </CardHeader>
                <CardContent>
                    {filtered.length === 0 ? (
                        <p className="text-center text-muted-foreground py-8">Заявки не найдены</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Заявка</TableHead>
                                        <TableHead>Категория</TableHead>
                                        <TableHead>Приоритет</TableHead>
                                        <TableHead>Статус</TableHead>
                                        <TableHead>Дата</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filtered.map((t: any) => {
                                        const st = statusMap[t.status] ?? { label: t.status, cls: "", Icon: Monitor };
                                        const pr = priorityMap[t.priority] ?? { label: t.priority, variant: "outline" as const };
                                        const date = new Date(t.createdAt).toLocaleDateString("ru-RU");
                                        return (
                                            <TableRow key={t._id}>
                                                <TableCell>
                                                    <div className="font-medium">{t.title}</div>
                                                    <div className="text-sm text-muted-foreground">№ {t.ticketNumber}</div>
                                                </TableCell>
                                                <TableCell>{t.category}</TableCell>
                                                <TableCell>
                                                    <Badge variant={pr.variant} className={pr.cls}>{pr.label}</Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center space-x-2">
                                                        <st.Icon className={`h-4 w-4 ${st.cls}`} aria-hidden />
                                                        <Badge variant="outline" className={st.cls}>{st.label}</Badge>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{date}</TableCell>
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
