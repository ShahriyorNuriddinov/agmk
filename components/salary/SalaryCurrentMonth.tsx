import { Eye } from "lucide-react";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const rows = [
    { label: "Оклад", amount: "+850,000 сум", color: "text-green-600" },
    { label: "Премия за выполнение плана", amount: "+120,000 сум", color: "text-green-600" },
    { label: "Доплата за сверхурочные", amount: "+45,000 сум", color: "text-green-600" },
    { label: "Компенсация питания", amount: "+25,000 сум", color: "text-green-600" },
    { label: "Подоходный налог (12%)", amount: "-45,000 сум", color: "text-red-600" },
    { label: "Пенсионные взносы", amount: "-20,000 сум", color: "text-red-600" },
];

export function SalaryCurrentMonth() {
    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
            <div className="px-6 pt-6">
                <h4 className="leading-none font-semibold text-base">Детальная разбивка - Сентябрь 2025</h4>
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
                        {rows.map((r, i) => (
                            <TableRow key={i}>
                                <TableCell className="font-medium">{r.label}</TableCell>
                                <TableCell className={`text-right font-mono ${r.color}`}>{r.amount}</TableCell>
                                <TableCell className="text-right">
                                    <button className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-accent transition-colors">
                                        <Eye className="h-4 w-4" />
                                    </button>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow className="border-t-2">
                            <TableCell className="font-bold">Итого к выплате</TableCell>
                            <TableCell className="text-right font-bold text-lg text-green-600">975,000 сум</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
