import { Building, Users, CircleCheckBig, CircleX, Clock, Eye, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

type ReportStatus = "submitted" | "overdue" | "reviewing" | "in_progress";

type Report = {
    division: string;
    divisionIcon: React.ElementType;
    divisionIconCls: string;
    manager: string;
    type: string;
    status: ReportStatus;
    submittedAt: string | null;
    deadline: string;
    canDownload: boolean;
};

const reports: Report[] = [
    {
        division: "Медно-обогатительная фабрика №1", divisionIcon: Building, divisionIconCls: "text-blue-600",
        manager: "Ахмедов Б.Т.", type: "Фабрика",
        status: "submitted", submittedAt: "16:30", deadline: "25.09.2025 18:00", canDownload: true,
    },
    {
        division: "Цинковый завод", divisionIcon: Building, divisionIconCls: "text-green-600",
        manager: "Рахимов К.С.", type: "Завод",
        status: "submitted", submittedAt: "14:15", deadline: "25.09.2025 18:00", canDownload: true,
    },
    {
        division: "Управление по персоналу", divisionIcon: Users, divisionIconCls: "text-blue-600",
        manager: "Юсупова М.А.", type: "Управление",
        status: "in_progress", submittedAt: null, deadline: "25.09.2025 18:00", canDownload: false,
    },
    {
        division: "Медно-обогатительная фабрика №2", divisionIcon: Building, divisionIconCls: "text-blue-600",
        manager: "Назаров Д.Р.", type: "Фабрика",
        status: "submitted", submittedAt: "17:20", deadline: "25.09.2025 18:00", canDownload: true,
    },
    {
        division: "Управление транспорта", divisionIcon: Users, divisionIconCls: "text-purple-600",
        manager: "Каримов Ш.А.", type: "Управление",
        status: "overdue", submittedAt: null, deadline: "25.09.2025 18:00", canDownload: false,
    },
    {
        division: "Департамент финансов", divisionIcon: Building, divisionIconCls: "text-orange-600",
        manager: "Петрова И.Н.", type: "Департамент",
        status: "reviewing", submittedAt: "17:55", deadline: "25.09.2025 18:00", canDownload: true,
    },
    {
        division: "Служба безопасности", divisionIcon: Users, divisionIconCls: "text-gray-600",
        manager: "Николаев В.П.", type: "Служба",
        status: "submitted", submittedAt: "15:45", deadline: "25.09.2025 18:00", canDownload: true,
    },
];

const statusConfig: Record<ReportStatus, { icon: React.ElementType; iconCls: string; badge: React.ReactNode }> = {
    submitted: {
        icon: CircleCheckBig, iconCls: "text-green-600",
        badge: <Badge variant="outline" className="text-green-600 border-green-600">Сдан</Badge>,
    },
    overdue: {
        icon: CircleX, iconCls: "text-red-600",
        badge: <Badge variant="destructive">Просрочен</Badge>,
    },
    reviewing: {
        icon: Clock, iconCls: "text-blue-600",
        badge: <Badge variant="outline" className="text-blue-600 border-blue-600">На проверке</Badge>,
    },
    in_progress: {
        icon: Clock, iconCls: "text-yellow-600",
        badge: <Badge variant="outline" className="text-yellow-600 border-yellow-600">В работе</Badge>,
    },
};

export function ReportsCurrentTab() {
    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
            <div className="px-6 pt-6">
                <h4 className="leading-none font-semibold text-base">Текущие отчеты</h4>
                <p className="text-sm text-muted-foreground mt-1">Статус сдачи отчетов за текущую неделю</p>
            </div>
            <div className="px-6 pb-6 -mt-2">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Подразделение</TableHead>
                            <TableHead>Руководитель</TableHead>
                            <TableHead>Тип</TableHead>
                            <TableHead>Статус</TableHead>
                            <TableHead>Время сдачи</TableHead>
                            <TableHead>Дедлайн</TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reports.map((r, i) => {
                            const s = statusConfig[r.status];
                            const isOverdue = r.status === "overdue";
                            return (
                                <TableRow key={i} className={isOverdue ? "bg-red-50 dark:bg-red-950/20" : ""}>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <r.divisionIcon className={`h-4 w-4 ${r.divisionIconCls}`} aria-hidden />
                                            <div className="font-medium">{r.division}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{r.manager}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{r.type}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <s.icon className={`h-4 w-4 ${s.iconCls}`} aria-hidden />
                                            {s.badge}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {r.submittedAt
                                            ? <span className="font-mono">{r.submittedAt}</span>
                                            : <span className="text-muted-foreground">—</span>
                                        }
                                    </TableCell>
                                    <TableCell>
                                        <span className={`font-mono ${isOverdue ? "text-red-600" : ""}`}>
                                            {r.deadline}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex space-x-1">
                                            <Button variant="ghost" size="sm">
                                                <Eye className="h-4 w-4" aria-hidden />
                                            </Button>
                                            {r.canDownload && (
                                                <Button variant="ghost" size="sm">
                                                    <Download className="h-4 w-4" aria-hidden />
                                                </Button>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
