import { Badge } from "@/components/ui/badge";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

type HistoryRecord = {
    period: string;
    submitted: number;
    total: number;
    timeliness: string;
    status: "completed" | "partial";
};

const history: HistoryRecord[] = [
    { period: "Неделя 38 (16-22 сент)", submitted: 58, total: 60, timeliness: "96.7%", status: "partial" },
    { period: "Неделя 37 (9-15 сент)", submitted: 59, total: 60, timeliness: "98.3%", status: "partial" },
    { period: "Неделя 36 (2-8 сент)", submitted: 57, total: 60, timeliness: "95%", status: "partial" },
    { period: "Неделя 35 (26 авг-1 сент)", submitted: 60, total: 60, timeliness: "100%", status: "completed" },
    { period: "Неделя 34 (19-25 авг)", submitted: 58, total: 60, timeliness: "96.7%", status: "partial" },
];

export function ReportsHistoryTab() {
    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
            <div className="px-6 pt-6">
                <h4 className="leading-none font-semibold text-base">История отчетности</h4>
                <p className="text-sm text-muted-foreground mt-1">Статистика сдачи отчетов за последние недели</p>
            </div>
            <div className="px-6 pb-6 -mt-2">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Период</TableHead>
                            <TableHead className="text-right">Сдано</TableHead>
                            <TableHead className="text-right">Всего</TableHead>
                            <TableHead className="text-right">Своевременность</TableHead>
                            <TableHead className="text-right">Статус</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {history.map((h, i) => (
                            <TableRow key={i}>
                                <TableCell className="font-medium">{h.period}</TableCell>
                                <TableCell className="text-right">{h.submitted}</TableCell>
                                <TableCell className="text-right">{h.total}</TableCell>
                                <TableCell className="text-right">
                                    <span className="font-medium text-green-600">{h.timeliness}</span>
                                </TableCell>
                                <TableCell className="text-right">
                                    {h.status === "completed" ? (
                                        <Badge variant="outline" className="text-green-600 border-green-600">
                                            Завершено
                                        </Badge>
                                    ) : (
                                        <Badge variant="outline" className="text-blue-600 border-blue-600">
                                            Частично
                                        </Badge>
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
