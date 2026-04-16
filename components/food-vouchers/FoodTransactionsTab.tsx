import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const transactions = [
    { date: "29.09.2025", time: "08:30", type: "ЛПП", typeCls: "text-blue-600 border-blue-600", category: "Первый завтрак", place: "Столовая №1 (Корпус А)", amount: "-12,000 сум", balance: "438,000 сум" },
    { date: "29.09.2025", time: "10:15", type: "БП", typeCls: "text-green-600 border-green-600", category: "Напитки горячие", place: "Буфет (Корпус В)", amount: "-3,000 сум", balance: "317,000 сум" },
    { date: "29.09.2025", time: "13:45", type: "ЛПП", typeCls: "text-blue-600 border-blue-600", category: "Обед", place: "Столовая №2 (Корпус Б)", amount: "-18,000 сум", balance: "420,000 сум" },
    { date: "28.09.2025", time: "15:20", type: "БП", typeCls: "text-green-600 border-green-600", category: "Выпечка", place: "Буфет (Корпус А)", amount: "-5,000 сум", balance: "315,000 сум" },
    { date: "28.09.2025", time: "08:15", type: "ЛПП", typeCls: "text-blue-600 border-blue-600", category: "Первый завтрак", place: "Столовая №1 (Корпус А)", amount: "-12,000 сум", balance: "438,000 сум" },
];

export function FoodTransactionsTab() {
    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
            <div className="px-6 pt-6">
                <h4 className="leading-none font-semibold text-base">История транзакций</h4>
                <p className="text-sm text-muted-foreground mt-1">Последние операции по талонам питания</p>
            </div>
            <div className="px-6 pb-6 -mt-2">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Дата/Время</TableHead>
                            <TableHead>Тип</TableHead>
                            <TableHead>Категория</TableHead>
                            <TableHead>Место</TableHead>
                            <TableHead className="text-right">Сумма</TableHead>
                            <TableHead className="text-right">Остаток</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transactions.map((t, i) => (
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
                                <TableCell className="text-right font-mono text-muted-foreground">{t.balance}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
