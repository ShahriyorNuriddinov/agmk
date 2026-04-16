import { Eye } from "lucide-react";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const transfers = [
    {
        date: "15.03.2018",
        from: { title: "Инженер-металлург II категории", dept: "Цех №2 - Флотация" },
        to: { title: "Ведущий инженер-металлург", dept: "Цех №3 - Переработка медного концентрата" },
        reason: "Повышение по служебной лестнице",
        doc: "Приказ №45-К от 15.03.2018",
    },
    {
        date: "20.08.2014",
        from: { title: "Инженер-металлург", dept: "Лаборатория качества" },
        to: { title: "Инженер-металлург II категории", dept: "Цех №2 - Флотация" },
        reason: "Производственная необходимость",
        doc: "Приказ №127-К от 20.08.2014",
    },
    {
        date: "10.06.2012",
        from: { title: "Стажер-металлург", dept: "Учебный центр" },
        to: { title: "Инженер-металлург", dept: "Лаборатория качества" },
        reason: "Завершение стажировки",
        doc: "Приказ №89-К от 10.06.2012",
    },
];

export function TransfersTab() {
    return (
        <div className="bg-card text-card-foreground rounded-xl border">
            <div className="px-6 pt-6 pb-2">
                <h4 className="font-semibold text-base">История переводов</h4>
                <p className="text-sm text-muted-foreground">Переводы между подразделениями и должностями</p>
            </div>
            <div className="px-6 pb-6">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Дата</TableHead>
                            <TableHead>Откуда</TableHead>
                            <TableHead>Куда</TableHead>
                            <TableHead>Причина</TableHead>
                            <TableHead>Документ</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {transfers.map((t, i) => (
                            <TableRow key={i}>
                                <TableCell className="font-medium">{t.date}</TableCell>
                                <TableCell>
                                    <div className="font-medium">{t.from.title}</div>
                                    <div className="text-sm text-muted-foreground">{t.from.dept}</div>
                                </TableCell>
                                <TableCell>
                                    <div className="font-medium">{t.to.title}</div>
                                    <div className="text-sm text-muted-foreground">{t.to.dept}</div>
                                </TableCell>
                                <TableCell>{t.reason}</TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm font-mono">{t.doc}</span>
                                        <button className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-accent transition-colors">
                                            <Eye className="h-4 w-4" />
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
