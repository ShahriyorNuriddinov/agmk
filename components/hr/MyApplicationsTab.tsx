"use client";

import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useKindergartenApplications, useCancelKindergarten } from "@/hooks/useKindergarten";

const statusMap: Record<string, { label: string; cls: string }> = {
    pending: { label: "На рассмотрении", cls: "text-blue-600 border-blue-600" },
    queue: { label: "В очереди", cls: "text-yellow-600 border-yellow-600" },
    enrolled: { label: "Зачислен", cls: "text-green-600 border-green-600" },
    rejected: { label: "Отклонено", cls: "text-red-600 border-red-600" },
};

export function MyApplicationsTab() {
    const { data, isLoading } = useKindergartenApplications();
    const { mutate: cancel } = useCancelKindergarten();

    const applications = data?.data ?? [];

    if (isLoading) return <div className="text-center py-10 text-muted-foreground">Загрузка...</div>;

    if (applications.length === 0) {
        return (
            <div className="bg-card rounded-xl border p-10 text-center text-muted-foreground">
                У вас нет поданных заявлений
            </div>
        );
    }

    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
            <div className="px-6 pt-6">
                <h4 className="leading-none font-semibold text-base">Мои заявления</h4>
                <p className="text-sm text-muted-foreground mt-1">Статус поданных заявлений</p>
            </div>
            <div className="px-6 pb-6 -mt-2">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Ребенок</TableHead>
                            <TableHead>Детский сад</TableHead>
                            <TableHead>Дата подачи</TableHead>
                            <TableHead>Позиция</TableHead>
                            <TableHead>Статус</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {applications.map((a: any) => {
                            const st = statusMap[a.status] ?? { label: a.status, cls: "" };
                            const date = new Date(a.createdAt).toLocaleDateString("ru-RU");
                            const birth = new Date(a.childBirthDate).toLocaleDateString("ru-RU");
                            return (
                                <TableRow key={a._id}>
                                    <TableCell>
                                        <div className="font-medium">{a.childLastName} {a.childFirstName}</div>
                                        <div className="text-sm text-muted-foreground">Дата рождения: {birth}</div>
                                    </TableCell>
                                    <TableCell>{a.preferredGarden ?? "—"}</TableCell>
                                    <TableCell>{date}</TableCell>
                                    <TableCell>
                                        {a.queuePosition
                                            ? <span className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium">#{a.queuePosition}</span>
                                            : "—"}
                                    </TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${st.cls}`}>
                                            {st.label}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        {(a.status === "pending" || a.status === "queue") && (
                                            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600" onClick={() => cancel(a._id)}>
                                                Отменить
                                            </Button>
                                        )}
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
