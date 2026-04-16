import { Eye, Download } from "lucide-react";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const records = [
    {
        period: "12.09.2025 - 18.09.2025", num: "№ БЛ-2025-004567",
        diagnosis: "ОРВИ (острая респираторная вирусная инфекция)", category: "Простудные заболевания",
        doctor: "Петрова И.А.", clinic: "Поликлиника АГМК №1",
        days: "7 дн.", benefit: "1,250,000 сум",
    },
    {
        period: "25.06.2025 - 30.06.2025", num: "№ БЛ-2025-003421",
        diagnosis: "Обострение остеохондроза поясничного отдела", category: "Заболевания опорно-двигательного аппарата",
        doctor: "Сидоров В.П.", clinic: "Медсанчасть АГМК",
        days: "6 дн.", benefit: "1,071,000 сум",
    },
    {
        period: "08.03.2025 - 15.03.2025", num: "№ БЛ-2025-001892",
        diagnosis: "Острый гастрит", category: "Заболевания ЖКТ",
        doctor: "Морозова Е.К.", clinic: "Поликлиника АГМК №2",
        days: "8 дн.", benefit: "1,428,000 сум",
    },
];

interface Props { year?: string }

export function SickLeaveTable({ year = "2025" }: Props) {
    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
            <div className="px-6 pt-6">
                <h4 className="leading-none font-semibold text-base">
                    Больничные листы {year} года
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                    История временной нетрудоспособности
                </p>
            </div>
            <div className="px-6 pb-6 -mt-2">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Период</TableHead>
                            <TableHead>Диагноз</TableHead>
                            <TableHead>Врач</TableHead>
                            <TableHead>Длительность</TableHead>
                            <TableHead>Статус</TableHead>
                            <TableHead className="text-right">Пособие</TableHead>
                            <TableHead>Действия</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {records.map((r, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    <div className="font-medium">{r.period}</div>
                                    <div className="text-sm text-muted-foreground">{r.num}</div>
                                </TableCell>
                                <TableCell>
                                    <div className="font-medium">{r.diagnosis}</div>
                                    <div className="text-sm text-muted-foreground">{r.category}</div>
                                </TableCell>
                                <TableCell>
                                    <div>{r.doctor}</div>
                                    <div className="text-sm text-muted-foreground">{r.clinic}</div>
                                </TableCell>
                                <TableCell>
                                    <span className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium">
                                        {r.days}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <span className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium text-green-600 border-green-600">
                                        Закрыт
                                    </span>
                                </TableCell>
                                <TableCell className="text-right font-mono">{r.benefit}</TableCell>
                                <TableCell>
                                    <div className="flex space-x-1">
                                        <button className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-accent transition-colors">
                                            <Eye className="h-4 w-4" />
                                        </button>
                                        <button className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-accent transition-colors">
                                            <Download className="h-4 w-4" />
                                        </button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
