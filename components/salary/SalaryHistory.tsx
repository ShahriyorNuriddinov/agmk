import { Download } from "lucide-react";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const rows = [
    { period: "Сентябрь 2025", salary: "850,000 сум", bonus: "120,000 сум", total: "975,000 сум" },
    { period: "Август 2025", salary: "850,000 сум", bonus: "85,000 сум", total: "935,000 сум" },
    { period: "Июль 2025", salary: "850,000 сум", bonus: "100,000 сум", total: "950,000 сум" },
    { period: "Июнь 2025", salary: "820,000 сум", bonus: "110,000 сум", total: "930,000 сум" },
    { period: "Май 2025", salary: "820,000 сум", bonus: "95,000 сум", total: "915,000 сум" },
    { period: "Апрель 2025", salary: "820,000 сум", bonus: "75,000 сум", total: "895,000 сум" },
];

export function SalaryHistory() {
    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
            <div className="px-6 pt-6">
                <h4 className="leading-none font-semibold text-base">История выплат</h4>
                <p className="text-sm text-muted-foreground mt-1">Данные о зарплате за последние 6 месяцев</p>
            </div>
            <div className="px-6 pb-6 -mt-2">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Период</TableHead>
                            <TableHead className="text-right">Оклад</TableHead>
                            <TableHead className="text-right">Премии</TableHead>
                            <TableHead className="text-right">Итого</TableHead>
                            <TableHead>Статус</TableHead>
                            <TableHead />
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rows.map((r, i) => (
                            <TableRow key={i}>
                                <TableCell className="font-medium">{r.period}</TableCell>
                                <TableCell className="text-right font-mono">{r.salary}</TableCell>
                                <TableCell className="text-right font-mono">{r.bonus}</TableCell>
                                <TableCell className="text-right font-mono font-bold">{r.total}</TableCell>
                                <TableCell>
                                    <span className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium text-green-600 border-green-600">
                                        Выплачено
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
            </div>
        </div>
    );
}
