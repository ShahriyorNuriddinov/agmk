"use client";

import { useQuery } from "@tanstack/react-query";
import { foodVouchersApi } from "@/api/foodVouchers";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

type TxRow = {
    date: string;
    time: string;
    type: string;
    typeCls: string;
    category: string;
    place: string;
    amount: string;
    ts: number;
};

export function FoodTransactionsTab() {
    const { data, isLoading } = useQuery({
        queryKey: ["food-vouchers-history"],
        queryFn: foodVouchersApi.getHistory,
    });

    const vouchers: any[] = data?.data ?? [];

    const rows: TxRow[] = [];
    for (const v of vouchers) {
        for (const t of v.transactions ?? []) {
            const d = new Date(t.date);
            rows.push({
                ts: d.getTime(),
                date: d.toLocaleDateString("ru-RU"),
                time: d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
                type: v.type,
                typeCls: v.type === "LPP" ? "text-blue-600 border-blue-600" : "text-green-600 border-green-600",
                category: t.description ?? "—",
                place: t.location ?? "—",
                amount: `-${t.amount.toLocaleString()} сум`,
            });
        }
    }
    rows.sort((a, b) => b.ts - a.ts);

    if (isLoading) {
        return <div className="text-center py-10 text-muted-foreground">Загрузка...</div>;
    }

    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
            <div className="px-6 pt-6">
                <h4 className="leading-none font-semibold text-base">История транзакций</h4>
                <p className="text-sm text-muted-foreground mt-1">Последние операции по талонам питания</p>
            </div>
            <div className="px-6 pb-6 -mt-2">
                {rows.length === 0 ? (
                    <p className="text-center text-muted-foreground py-6">Транзакции не найдены</p>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Дата/Время</TableHead>
                                <TableHead>Тип</TableHead>
                                <TableHead>Категория</TableHead>
                                <TableHead>Место</TableHead>
                                <TableHead className="text-right">Сумма</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {rows.map((t, i) => (
                                <TableRow key={i}>
                                    <TableCell>
                                        <div className="font-medium">{t.date}</div>
                                        <div className="text-sm text-muted-foreground">{t.time}</div>
                                    </TableCell>
                                    <TableCell>
                                        <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${t.typeCls}`}>
                                            {t.type}
                                        </span>
                                    </TableCell>
                                    <TableCell>{t.category}</TableCell>
                                    <TableCell className="text-sm text-muted-foreground">{t.place}</TableCell>
                                    <TableCell className="text-right font-mono">{t.amount}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
        </div>
    );
}
