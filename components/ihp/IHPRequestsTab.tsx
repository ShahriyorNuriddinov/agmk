"use client";

import { useQuery } from "@tanstack/react-query";
import { Eye } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ihpApi } from "@/api/ihp";

const statusConfig: Record<string, { label: string; cls: string }> = {
    pending: { label: "На рассмотрении", cls: "text-yellow-600 border-yellow-600" },
    approved: { label: "Одобрено", cls: "text-green-600 border-green-600" },
    rejected: { label: "Отклонено", cls: "text-red-600 border-red-600" },
    issued: { label: "Выдано", cls: "bg-blue-600 text-white border-transparent" },
};

const urgencyMap: Record<string, string> = {
    low: "Низкая",
    normal: "Обычная",
    high: "Высокая",
};

export function IHPRequestsTab() {
    const { data, isLoading } = useQuery({
        queryKey: ["ihp"],
        queryFn: ihpApi.getMy,
    });

    const requests = data?.data ?? [];

    if (isLoading) return <div className="text-center py-10 text-muted-foreground">Загрузка...</div>;

    if (requests.length === 0) {
        return (
            <div className="bg-card rounded-xl border p-10 text-center text-muted-foreground">
                У вас нет заявок на ИХП
            </div>
        );
    }

    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
            <div className="px-6 pt-6">
                <h4 className="leading-none font-semibold text-base">Мои заявки на ИХП</h4>
                <p className="text-sm text-muted-foreground mt-1">История и статус заявок на оборудование</p>
            </div>
            <div className="px-6 pb-6 -mt-2">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Наименование</TableHead>
                            <TableHead>Кол-во</TableHead>
                            <TableHead>Срочность</TableHead>
                            <TableHead>Дата заявки</TableHead>
                            <TableHead>Статус</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {requests.map((r: any) => {
                            const st = statusConfig[r.status] ?? { label: r.status, cls: "" };
                            const date = new Date(r.createdAt).toLocaleDateString("ru-RU");
                            return (
                                <TableRow key={r._id}>
                                    <TableCell>
                                        <div className="font-medium">{r.itemName}</div>
                                        <div className="text-sm text-muted-foreground">{r.category}</div>
                                        {r.purpose && (
                                            <div className="text-xs text-muted-foreground">{r.purpose}</div>
                                        )}
                                    </TableCell>
                                    <TableCell>{r.quantity}</TableCell>
                                    <TableCell>{urgencyMap[r.urgency] ?? r.urgency}</TableCell>
                                    <TableCell>{date}</TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${st.cls}`}>
                                            {st.label}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <button className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-accent transition-colors">
                                            <Eye className="h-4 w-4" aria-hidden />
                                        </button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
