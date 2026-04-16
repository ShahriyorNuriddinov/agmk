import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const inventory = [
    {
        name: "Компьютер рабочий Dell OptiPlex",
        serial: "DLO-2024-A15432",
        received: "12.03.2024",
        condition: "good",
        warranty: "12.03.2027",
        location: "Корпус А, каб. 301",
        responsible: "Иванов И.И.",
    },
    {
        name: "Мышь компьютерная Logitech",
        serial: "LOG-2024-M8765",
        received: "12.03.2024",
        condition: "replace",
        warranty: "12.03.2025",
        location: "Корпус А, каб. 301",
        responsible: "Иванов И.И.",
    },
    {
        name: "Клавиатура OKLICK",
        serial: "OKL-2024-K4321",
        received: "12.03.2024",
        condition: "good",
        warranty: "12.03.2025",
        location: "Корпус А, каб. 301",
        responsible: "Иванов И.И.",
    },
];

const conditionConfig: Record<string, { label: string; cls: string }> = {
    good: { label: "Исправно", cls: "text-green-600 border-green-600" },
    replace: { label: "Требует замены", cls: "bg-red-600 text-white border-transparent" },
    repair: { label: "На ремонте", cls: "text-yellow-600 border-yellow-600" },
};

export function IHPInventoryTab() {
    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
            <div className="px-6 pt-6">
                <h4 className="leading-none font-semibold text-base">Закрепленное имущество</h4>
                <p className="text-sm text-muted-foreground mt-1">Оборудование, закрепленное за вами</p>
            </div>
            <div className="px-6 pb-6 -mt-2">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Наименование</TableHead>
                            <TableHead>Серийный номер</TableHead>
                            <TableHead>Дата получения</TableHead>
                            <TableHead>Состояние</TableHead>
                            <TableHead>Гарантия до</TableHead>
                            <TableHead>Местоположение</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {inventory.map((item, i) => (
                            <TableRow key={i}>
                                <TableCell className="font-medium">{item.name}</TableCell>
                                <TableCell className="font-mono text-sm">{item.serial}</TableCell>
                                <TableCell>{item.received}</TableCell>
                                <TableCell>
                                    <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${conditionConfig[item.condition].cls}`}>
                                        {conditionConfig[item.condition].label}
                                    </span>
                                </TableCell>
                                <TableCell>{item.warranty}</TableCell>
                                <TableCell>
                                    <div>{item.location}</div>
                                    <div className="text-xs text-muted-foreground">Ответственный: {item.responsible}</div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
