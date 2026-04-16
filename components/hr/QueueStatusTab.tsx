import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const queues = [
    { name: 'Детский сад "Солнышко"', address: "ул. Металлургов, 15", pct: 95, barColor: "bg-yellow-500", capacity: "142/150", free: 8, queue: 28, wait: "3 мес." },
    { name: 'Детский сад "Радуга"', address: "ул. Шахтёрская, 8", pct: 96, barColor: "bg-red-500", capacity: "115/120", free: 5, queue: 35, wait: "3 мес." },
    { name: 'Детский сад "Ромашка"', address: "пр. Мустакиллик, 25", pct: 97, barColor: "bg-red-500", capacity: "175/180", free: 5, queue: 42, wait: "4 мес." },
    { name: 'Детский сад "Сказка"', address: "ул. Горняков, 12", pct: 98, barColor: "bg-red-500", capacity: "88/90", free: 2, queue: 15, wait: "2 мес." },
];

export function QueueStatusTab() {
    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
            <div className="px-6 pt-6">
                <h4 className="leading-none font-semibold text-base">Состояние очередей по детским садам</h4>
                <p className="text-sm text-muted-foreground mt-1">Актуальная информация о свободных местах и очередях</p>
            </div>
            <div className="px-6 pb-6 -mt-2">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Детский сад</TableHead>
                            <TableHead>Заполненность</TableHead>
                            <TableHead>Свободные места</TableHead>
                            <TableHead>В очереди</TableHead>
                            <TableHead>Среднее время ожидания</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {queues.map((q, i) => (
                            <TableRow key={i}>
                                <TableCell>
                                    <div className="font-medium">{q.name}</div>
                                    <div className="text-sm text-muted-foreground">{q.address}</div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-2">
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className={`h-2 rounded-full ${q.barColor}`} style={{ width: `${q.pct}%` }} />
                                        </div>
                                        <span className="text-sm font-mono">{q.pct}%</span>
                                    </div>
                                    <div className="text-xs text-muted-foreground mt-1">{q.capacity}</div>
                                </TableCell>
                                <TableCell>
                                    <span className="font-medium text-green-600">{q.free}</span>
                                </TableCell>
                                <TableCell>
                                    <span className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium text-yellow-600 border-yellow-600">
                                        {q.queue}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <span className="text-sm">{q.wait}</span>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
