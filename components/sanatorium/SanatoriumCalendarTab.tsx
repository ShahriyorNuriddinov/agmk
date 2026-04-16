import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const months = ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];

const schedule: { name: string; price: string; months: boolean[] }[] = [
    {
        name: 'Санаторий "Олтин Олма"',
        price: "450,000 сум/день",
        months: [true, true, true, true, true, true, true, true, true, true, true, true],
    },
    {
        name: "Профилакторий АГМК",
        price: "Бесплатно",
        months: [true, true, true, true, true, true, true, true, true, true, true, true],
    },
    {
        name: 'Санаторий "Чимган"',
        price: "580,000 сум/день",
        months: [true, true, true, false, false, true, true, true, true, true, false, false],
    },
    {
        name: 'Санаторий "Ходжикент"',
        price: "380,000 сум/день",
        months: [false, false, false, true, true, true, true, true, true, true, true, false],
    },
    {
        name: 'Санаторий "Бельдерсай"',
        price: "480,000 сум/день",
        months: [false, false, false, false, false, true, true, true, true, false, false, false],
    },
    {
        name: 'Санаторий "Зарафшан"',
        price: "320,000 сум/день",
        months: [false, false, false, false, true, true, true, true, true, true, false, false],
    },
];

export function SanatoriumCalendarTab() {
    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
            <div className="px-6 pt-6">
                <h4 className="leading-none font-semibold text-base">Календарь работы санаториев</h4>
                <p className="text-sm text-muted-foreground mt-1">Расписание работы по месяцам</p>
            </div>
            <div className="px-6 pb-6 -mt-2">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Санаторий</TableHead>
                            {months.map(m => (
                                <TableHead key={m} className="text-center px-1">{m}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {schedule.map((s, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    <div className="font-medium">{s.name}</div>
                                    <div className="text-xs text-muted-foreground">{s.price}</div>
                                </TableCell>
                                {s.months.map((active, j) => (
                                    <TableCell key={j} className="text-center">
                                        <div
                                            className={`w-6 h-6 rounded mx-auto ${active ? "bg-green-500" : "bg-gray-200"}`}
                                            title={active ? "Работает" : "Не работает"}
                                        />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <div className="flex items-center space-x-4 mt-4 text-sm">
                    <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-green-500 rounded" />
                        <span>Работает</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-gray-200 rounded" />
                        <span>Не работает</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
