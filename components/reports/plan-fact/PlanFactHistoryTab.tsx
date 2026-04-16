import { Badge } from "@/components/ui/badge";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

type HistoryRecord = {
    period: string;
    planPct: number;
    production: number;
    quality: number;
    finance: number;
    personnel: number;
    status: "good" | "warning" | "bad";
};

const history: HistoryRecord[] = [
    { period: "Сентябрь 2025", planPct: 94.2, production: 96.2, quality: 98.5, finance: 95.8, personnel: 96.8, status: "warning" },
    { period: "Август 2025", planPct: 96.8, production: 97.1, quality: 99.1, finance: 97.4, personnel: 98.2, status: "good" },
    { period: "Июль 2025", planPct: 95.3, production: 95.8, quality: 98.7, finance: 96.1, personnel: 97.5, status: "warning" },
    { period: "Июнь 2025", planPct: 98.1, production: 98.5, quality: 99.3, finance: 98.8, personnel: 99.1, status: "good" },
    { period: "Май 2025", planPct: 93.7, production: 94.2, quality: 97.9, finance: 94.5, personnel: 95.8, status: "warning" },
    { period: "Апрель 2025", planPct: 97.5, production: 97.8, quality: 99.0, finance: 98.1, personnel: 98.7, status: "good" },
];

const statusConfig = {
    good: {
        badge: <Badge variant="outline" className="text-green-600 border-green-600 text-xs">Выполнено</Badge>,
    },
    warning: {
        badge: <Badge variant="outline" className="text-yellow-600 border-yellow-600 text-xs">Частично</Badge>,
    },
    bad: {
        badge: <Badge variant="destructive" className="text-xs">Не выполнено</Badge>,
    },
};

function PctCell({ value }: { value: number }) {
    const cls = value >= 97 ? "text-green-600" : value >= 90 ? "text-yellow-600" : "text-red-600";
    return <span className={`font-mono font-medium ${cls}`}>{value}%</span>;
}

export function PlanFactHistoryTab() {
    return (
        <div className="bg-card text-card-foreground rounded-xl border">
            <div className="px-6 pt-6 pb-4">
                <h4 className="font-semibold text-base">История выполнения плана</h4>
                <p className="text-sm text-muted-foreground mt-1">Динамика показателей за последние месяцы</p>
            </div>
            <div className="px-6 pb-6">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Период</TableHead>
                            <TableHead className="text-right">Производство</TableHead>
                            <TableHead className="text-right">Качество</TableHead>
                            <TableHead className="text-right">Финансы</TableHead>
                            <TableHead className="text-right">Персонал</TableHead>
                            <TableHead className="text-right">Итого</TableHead>
                            <TableHead className="text-right">Статус</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {history.map((h, i) => {
                            const cfg = statusConfig[h.status];
                            return (
                                <TableRow key={i}>
                                    <TableCell className="font-medium">{h.period}</TableCell>
                                    <TableCell className="text-right"><PctCell value={h.production} /></TableCell>
                                    <TableCell className="text-right"><PctCell value={h.quality} /></TableCell>
                                    <TableCell className="text-right"><PctCell value={h.finance} /></TableCell>
                                    <TableCell className="text-right"><PctCell value={h.personnel} /></TableCell>
                                    <TableCell className="text-right"><PctCell value={h.planPct} /></TableCell>
                                    <TableCell className="text-right">{cfg.badge}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
