import { Trophy } from "lucide-react";
import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

type Leader = {
    rank: number;
    initials: string;
    name: string;
    department: string;
    courses: number;
    hours: number;
    isMe?: boolean;
};

const leaders: Leader[] = [
    { rank: 1, initials: "ПП", name: "Петров П.П.", department: "Производство", courses: 12, hours: 240 },
    { rank: 2, initials: "СА", name: "Сидорова А.И.", department: "Лаборатория", courses: 11, hours: 220 },
    { rank: 3, initials: "КД", name: "Козлов Д.С.", department: "Производство", courses: 10, hours: 200 },
    { rank: 4, initials: "МЕ", name: "Морозова Е.А.", department: "HR", courses: 9, hours: 185 },
    { rank: 5, initials: "ИИ", name: "Иванов И.И.", department: "Производство", courses: 8, hours: 180, isMe: true },
];

const trophyColor: Record<number, string> = {
    1: "text-yellow-500",
    2: "text-gray-400",
    3: "text-amber-600",
};

export function LeaderboardTab() {
    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
            <div className="px-6 pt-6">
                <h4 className="leading-none font-semibold text-base">Рейтинг обучающихся</h4>
                <p className="text-sm text-muted-foreground mt-1">Топ сотрудников по количеству пройденных курсов</p>
            </div>
            <div className="px-6 pb-6 -mt-2">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Позиция</TableHead>
                            <TableHead>Сотрудник</TableHead>
                            <TableHead>Отдел</TableHead>
                            <TableHead className="text-right">Курсов</TableHead>
                            <TableHead className="text-right">Часов</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {leaders.map((l) => (
                            <TableRow key={l.rank} className={l.isMe ? "bg-accent" : ""}>
                                <TableCell>
                                    <div className="flex items-center space-x-2">
                                        {trophyColor[l.rank] ? (
                                            <Trophy className={`h-4 w-4 ${trophyColor[l.rank]}`} aria-hidden />
                                        ) : null}
                                        <span className="font-bold">#{l.rank}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-3">
                                        <span className="relative flex w-8 h-8 shrink-0 overflow-hidden rounded-full bg-muted items-center justify-center text-xs font-medium">
                                            {l.initials}
                                        </span>
                                        <span className="font-medium">{l.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{l.department}</TableCell>
                                <TableCell className="text-right font-bold">{l.courses}</TableCell>
                                <TableCell className="text-right">{l.hours}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
