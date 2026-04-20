"use client";

import { useQuery } from "@tanstack/react-query";
import { TrendingUp, TrendingDown } from "lucide-react";
import { foodVouchersApi } from "@/api/foodVouchers";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

function monthName(month: number, year: number) {
    return new Date(year, month - 1, 1).toLocaleDateString("ru-RU", { month: "long", year: "numeric" });
}

export function FoodAnalyticsTab() {
    const { data, isLoading } = useQuery({
        queryKey: ["food-vouchers-history"],
        queryFn: foodVouchersApi.getHistory,
    });

    const vouchers: any[] = data?.data ?? [];

    // Oylar bo'yicha guruhlash
    const byMonth: Record<string, { period: string; lpp: number; bp: number }> = {};
    vouchers.forEach((v) => {
        const key = `${v.year}-${String(v.month).padStart(2, "0")}`;
        if (!byMonth[key]) byMonth[key] = { period: monthName(v.month, v.year), lpp: 0, bp: 0 };
        if (v.type === "LPP") byMonth[key].lpp += v.used;
        else byMonth[key].bp += v.used;
    });

    const rows = Object.entries(byMonth)
        .sort((a, b) => b[0].localeCompare(a[0]))
        .map(([, v], i, arr) => {
            const total = v.lpp + v.bp;
            const prevTotal = i < arr.length - 1 ? arr[i + 1][1].lpp + arr[i + 1][1].bp : null;
            const change = prevTotal ? (((total - prevTotal) / prevTotal) * 100).toFixed(1) + "%" : null;
            const down = prevTotal ? total < prevTotal : false;
            return { ...v, total, change, down };
        });

    if (isLoading) return <div className="text-center py-10 text-muted-foreground">Загрузка...</div>;

    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
            <div className="px-6 pt-6">
                <h4 className="leading-none font-semibold text-base">Расходы по месяцам</h4>
                <p className="text-sm text-muted-foreground mt-1">Динамика использования талонов питания</p>
            </div>
            <div className="px-6 pb-6 -mt-2">
                {rows.length === 0 ? (
                    <p className="text-center text-muted-foreground py-6">Нет данных для аналитики</p>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Период</TableHead>
                                <TableHead className="text-right">ЛПП</TableHead>
                                <TableHead className="text-right">БП</TableHead>
                                <TableHead className="text-right">Общая сумма</TableHead>
                                <TableHead className="text-right">Изменение</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rows.map((r, i) => (
                                <TableRow key={i}>
                                    <TableCell className="font-medium">{r.period}</TableCell>
                                    <TableCell className="text-right font-mono">{r.lpp.toLocaleString()} сум</TableCell>
                                    <TableCell className="text-right font-mono">{r.bp.toLocaleString()} сум</TableCell>
                                    <TableCell className="text-right font-mono font-bold">{r.total.toLocaleString()} сум</TableCell>
                                    <TableCell className="text-right">
                                        {r.change && (
                                            <div className={`flex items-center justify-end space-x-1 ${r.down ? "text-green-600" : "text-red-600"}`}>
                                                {r.down
                                                    ? <TrendingDown className="h-4 w-4" aria-hidden />
                                                    : <TrendingUp className="h-4 w-4" aria-hidden />
                                                }
                                                <span className="text-sm">{r.change}</span>
                                            </div>
                                        )}
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
