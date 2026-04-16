import { TrendingUp, TrendingDown } from "lucide-react";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const rows = [
    { period: "Сентябрь 2025", lpp: "425,000 сум", bp: "280,000 сум", total: "705,000 сум", change: "8.4%", down: true },
    { period: "Август 2025", lpp: "450,000 сум", bp: "320,000 сум", total: "770,000 сум", change: "5.5%", down: false },
    { period: "Июль 2025", lpp: "435,000 сум", bp: "295,000 сум", total: "730,000 сум", change: "2.7%", down: true },
    { period: "Июнь 2025", lpp: "440,000 сум", bp: "310,000 сум", total: "750,000 сум", change: "6.4%", down: false },
    { period: "Май 2025", lpp: "420,000 сум", bp: "285,000 сум", total: "705,000 сум", change: "2.2%", down: false },
    { period: "Апрель 2025", lpp: "415,000 сум", bp: "275,000 сум", total: "690,000 сум", change: null, down: false },
];

export function FoodAnalyticsTab() {
    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
            <div className="px-6 pt-6">
                <h4 className="leading-none font-semibold text-base">Расходы по месяцам</h4>
                <p className="text-sm text-muted-foreground mt-1">Динамика использования талонов питания</p>
            </div>
            <div className="px-6 pb-6 -mt-2">
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
                                <TableCell className="text-right font-mono">{r.lpp}</TableCell>
                                <TableCell className="text-right font-mono">{r.bp}</TableCell>
                                <TableCell className="text-right font-mono font-bold">{r.total}</TableCell>
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
            </div>
        </div>
    );
}
