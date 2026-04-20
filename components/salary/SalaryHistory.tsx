"use client";

import { useQuery } from "@tanstack/react-query";
import { Download } from "lucide-react";
import { salaryApi } from "@/api/salary";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

function monthName(month: number, year: number) {
    return new Date(year, month - 1, 1).toLocaleDateString("ru-RU", { month: "long", year: "numeric" });
}
export function SalaryHistory() {
    const { data, isLoading } = useQuery({
        queryKey: ["salary-history"],
        queryFn: salaryApi.getHistory,
    });
    const salaries: any[] = data?.data ?? [];

    if (isLoading) return <div className="text-center py-10 text-muted-foreground">Загрузка...</div>;

    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
            <div className="px-6 pt-6">
                <h4 className="leading-none font-semibold text-base">История выплат</h4>
                <p className="text-sm text-muted-foreground mt-1">Данные о зарплате за последние месяцы</p>
            </div>
            <div className="px-6 pb-6 -mt-2">
                {salaries.length === 0 ? (
                    <p className="text-center text-muted-foreground py-6">История выплат не найдена</p>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Период</TableHead>
                                <TableHead className="text-right">Оклад</TableHead>
                                <TableHead className="text-right">Надбавки</TableHead>
                                <TableHead className="text-right">Удержания</TableHead>
                                <TableHead className="text-right">Итого</TableHead>
                                <TableHead>Статус</TableHead>
                                <TableHead />
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {salaries.map((s) => (
                                <TableRow key={s._id}>
                                    <TableCell className="font-medium capitalize">
                                        {monthName(s.month, s.year)}
                                    </TableCell>
                                    <TableCell className="text-right font-mono">
                                        {s.baseSalary.toLocaleString()} сум
                                    </TableCell>
                                    <TableCell className="text-right font-mono text-green-600">
                                        +{s.totalIncome.toLocaleString()} сум
                                    </TableCell>
                                    <TableCell className="text-right font-mono text-red-600">
                                        -{s.totalDeductions.toLocaleString()} сум
                                    </TableCell>
                                    <TableCell className="text-right font-mono font-bold">
                                        {s.netSalary.toLocaleString()} сум
                                    </TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium ${s.status === "paid" ? "text-green-600 border-green-600" : "text-yellow-600 border-yellow-600"}`}>
                                            {s.status === "paid" ? "Выплачено" : "Ожидается"}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <button className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-accent transition-colors">
                                            <Download className="h-4 w-4" />
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
        </div>
    );
}
