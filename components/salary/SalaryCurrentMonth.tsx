"use client";

import { useQuery } from "@tanstack/react-query";
import { Eye } from "lucide-react";
import { salaryApi } from "@/api/salary";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const now = new Date();
const monthLabel = now.toLocaleDateString("ru-RU", { month: "long", year: "numeric" });

export function SalaryCurrentMonth() {
    const { data, isLoading } = useQuery({
        queryKey: ["salary-current"],
        queryFn: salaryApi.getCurrent,
    });

    const salary = data?.data;

    if (isLoading) return <div className="text-center py-10 text-muted-foreground">Загрузка...</div>;

    if (!salary) {
        return (
            <div className="bg-card rounded-xl border p-10 text-center text-muted-foreground">
                Данные о зарплате за текущий месяц не найдены
            </div>
        );
    }

    const incomes = salary.items.filter((i: any) => i.type === "income");
    const deductions = salary.items.filter((i: any) => i.type === "deduction");

    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
            <div className="px-6 pt-6">
                <h4 className="leading-none font-semibold text-base capitalize">
                    Детальная разбивка — {monthLabel}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">Подробная информация о начислениях и удержаниях</p>
            </div>
            <div className="px-6 pb-6 -mt-2">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Категория</TableHead>
                            <TableHead className="text-right">Сумма</TableHead>
                            <TableHead className="text-right">Действие</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {/* Оклад */}
                        <TableRow>
                            <TableCell className="font-medium">Оклад</TableCell>
                            <TableCell className="text-right font-mono text-green-600">
                                +{salary.baseSalary.toLocaleString()} сум
                            </TableCell>
                            <TableCell className="text-right">
                                <button className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-accent transition-colors">
                                    <Eye className="h-4 w-4" />
                                </button>
                            </TableCell>
                        </TableRow>
                        {/* Доходы */}
                        {incomes.map((item: any) => (
                            <TableRow key={item._id}>
                                <TableCell className="font-medium">{item.label}</TableCell>
                                <TableCell className="text-right font-mono text-green-600">
                                    +{item.amount.toLocaleString()} сум
                                </TableCell>
                                <TableCell className="text-right">
                                    <button className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-accent transition-colors">
                                        <Eye className="h-4 w-4" />
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {/* Удержания */}
                        {deductions.map((item: any) => (
                            <TableRow key={item._id}>
                                <TableCell className="font-medium">{item.label}</TableCell>
                                <TableCell className="text-right font-mono text-red-600">
                                    -{item.amount.toLocaleString()} сум
                                </TableCell>
                                <TableCell className="text-right">
                                    <button className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-accent transition-colors">
                                        <Eye className="h-4 w-4" />
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow className="border-t-2">
                            <TableCell className="font-bold">Итого к выплате</TableCell>
                            <TableCell className="text-right font-bold text-lg text-green-600">
                                {salary.netSalary.toLocaleString()} сум
                            </TableCell>
                            <TableCell />
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
