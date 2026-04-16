import { Building, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

type Division = {
    name: string;
    type: string;
    planPct: number;
    production: number;
    quality: number;
    finance: number;
    overall: "good" | "warning" | "bad";
};

const divisions: Division[] = [
    { name: "Медно-обогатительная фабрика №1", type: "Фабрика", planPct: 97.2, production: 97.2, quality: 99.1, finance: 95.8, overall: "good" },
    { name: "Медно-обогатительная фабрика №2", type: "Фабрика", planPct: 94.5, production: 94.5, quality: 98.3, finance: 93.1, overall: "warning" },
    { name: "Цинковый завод", type: "Завод", planPct: 98.1, production: 98.1, quality: 99.5, finance: 97.4, overall: "good" },
    { name: "Свинцовый завод", type: "Завод", planPct: 88.3, production: 88.3, quality: 96.2, finance: 84.7, overall: "bad" },
    { name: "Управление по персоналу", type: "Управление", planPct: 95.0, production: 95.0, quality: 97.8, finance: 94.2, overall: "warning" },
    { name: "Управление транспорта", type: "Управление", planPct: 91.4, production: 91.4, quality: 95.0, finance: 89.3, overall: "warning" },
    { name: "Департамент финансов", type: "Департамент", planPct: 96.7, production: 96.7, quality: 98.9, finance: 96.1, overall: "good" },
    { name: "Служба безопасности", type: "Служба", planPct: 100.0, production: 100.0, quality: 100.0, finance: 100.0, overall: "good" },
];

const statusConfig = {
    good: {
        badge: <Badge variant="outline" className="text-green-600 border-green-600 text-xs">Выполнено</Badge>,
        icon: <TrendingUp className="h-4 w-4 text-green-500" aria-hidden />,
    },
    warning: {
        badge: <Badge variant="outline" className="text-yellow-600 border-yellow-600 text-xs">Частично</Badge>,
        icon: <Minus className="h-4 w-4 text-yellow-500" aria-hidden />,
    },
    bad: {
        badge: <Badge variant="destructive" className="text-xs">Не выполнено</Badge>,
        icon: <TrendingDown className="h-4 w-4 text-red-500" aria-hidden />,
    },
};

function PctCell({ value }: { value: number }) {
    const cls = value >= 97 ? "text-green-600" : value >= 90 ? "text-yellow-600" : "text-red-600";
    return <span className={`font-mono font-medium ${cls}`}>{value}%</span>;
}

export function PlanFactDivisionsTab() {
    return (
        <div className="bg-card text-card-foreground rounded-xl border">
            <div className="px-6 pt-6 pb-4">
                <h4 className="font-semibold text-base">Выполнение плана по подразделениям</h4>
                <p className="text-sm text-muted-foreground mt-1">Сравнение плановых и фактических показателей за текущий период</p>
            </div>
            <div className="px-6 pb-6">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Подразделение</TableHead>
                            <TableHead>Тип</TableHead>
                            <TableHead className="text-right">Производство</TableHead>
                            <TableHead className="text-right">Качество</TableHead>
                            <TableHead className="text-right">Финансы</TableHead>
                            <TableHead className="text-right">Итого</TableHead>
                            <TableHead className="text-right">Статус</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {divisions.map((d, i) => {
                            const cfg = statusConfig[d.overall];
                            return (
                                <TableRow key={i}>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Building className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden />
                                            <span className="font-medium">{d.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className="text-xs">{d.type}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right"><PctCell value={d.production} /></TableCell>
                                    <TableCell className="text-right"><PctCell value={d.quality} /></TableCell>
                                    <TableCell className="text-right"><PctCell value={d.finance} /></TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            {cfg.icon}
                                            <PctCell value={d.planPct} />
                                        </div>
                                    </TableCell>
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
