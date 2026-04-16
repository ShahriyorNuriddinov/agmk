import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

type NewHire = {
    initials: string;
    name: string;
    position: string;
    department: string;
    date: string;
    stage: string;
};

const newHires: NewHire[] = [
    { initials: "НА", name: "Новиков А.В.", position: "Инженер-технолог", department: "Производственный отдел", date: "2025-09-15", stage: "Испытательный срок" },
    { initials: "ВМ", name: "Волкова М.П.", position: "Лаборант", department: "Лаборатория", date: "2025-09-10", stage: "Адаптация" },
    { initials: "ОС", name: "Орлов С.И.", position: "Слесарь-ремонтник", department: "Служба ремонта", date: "2025-09-05", stage: "Обучение" },
];

export function EmployeesNewHiresTab() {
    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
            <div className="px-6 pt-6">
                <h4 className="leading-none font-semibold text-base">Новые сотрудники</h4>
                <p className="text-sm text-muted-foreground mt-1">Принятые на работу в текущем месяце</p>
            </div>
            <div className="px-6 pb-6 -mt-2 space-y-4">
                {newHires.map((h, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-3">
                            <Avatar>
                                <AvatarFallback>{h.initials}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h4 className="font-medium">{h.name}</h4>
                                <p className="text-sm text-muted-foreground">{h.position}</p>
                                <p className="text-sm text-muted-foreground">{h.department}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-sm font-medium">{h.date}</p>
                            <Badge variant="outline">{h.stage}</Badge>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
