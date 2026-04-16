import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const records = [
    { period: "12.09.2025 - 18.09.2025", num: "БЛ-2025-004567", diagnosis: "ОРВИ (острая респираторная вирусная инфекция)", category: "Простудные заболевания", doctor: "Петрова И.А.", clinic: "Поликлиника АГМК №1", days: 7, benefit: "1,250,000 сум" },
    { period: "25.06.2025 - 30.06.2025", num: "БЛ-2025-003421", diagnosis: "Обострение остеохондроза поясничного отдела", category: "Заболевания опорно-двигательного аппарата", doctor: "Сидоров В.П.", clinic: "Медсанчасть АГМК", days: 6, benefit: "1,071,000 сум" },
    { period: "08.03.2025 - 15.03.2025", num: "БЛ-2025-001892", diagnosis: "Острый гастрит", category: "Заболевания ЖКТ", doctor: "Морозова Е.К.", clinic: "Поликлиника АГМК №2", days: 8, benefit: "1,428,000 сум" },
    { period: "14.12.2024 - 21.12.2024", num: "БЛ-2024-008934", diagnosis: "Грипп тип А", category: "Простудные заболевания", doctor: "Алиев Р.Т.", clinic: "Поликлиника АГМК №1", days: 8, benefit: "1,392,000 сум" },
    { period: "03.08.2024 - 10.08.2024", num: "БЛ-2024-005612", diagnosis: "Артериальная гипертензия (гипертонический криз)", category: "Сердечно-сосудистые заболевания", doctor: "Кузнецова Л.М.", clinic: "Кардиологический центр", days: 8, benefit: "1,392,000 сум" },
    { period: "15.04.2024 - 18.04.2024", num: "БЛ-2024-002987", diagnosis: "Пищевое отравление", category: "Заболевания ЖКТ", doctor: "Иванова С.Н.", clinic: "Медсанчасть АГМК", days: 4, benefit: "696,000 сум" },
];

export function SickLeaveHistory() {
    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
            <div className="px-6 pt-6">
                <h4 className="leading-none font-semibold text-base">Полная история больничных листов</h4>
                <p className="text-sm text-muted-foreground mt-1">Все зарегистрированные случаи временной нетрудоспособности</p>
            </div>
            <div className="px-6 pb-6 -mt-2">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Период</TableHead>
                            <TableHead>Диагноз</TableHead>
                            <TableHead>Врач/Учреждение</TableHead>
                            <TableHead>Дни</TableHead>
                            <TableHead className="text-right">Пособие</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {records.map((r, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    <div className="font-medium">{r.period}</div>
                                    <div className="text-xs text-muted-foreground">{r.num}</div>
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
                                <TableCell className="text-right font-mono">{r.benefit}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
