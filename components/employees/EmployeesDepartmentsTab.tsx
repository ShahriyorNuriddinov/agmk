import { Badge } from "@/components/ui/badge";

type DeptStat = {
    name: string;
    efficiency: string;
    total: number;
    active: number;
    vacation: number;
    sick: number;
};

const departments: DeptStat[] = [
    { name: "Производственный отдел", efficiency: "94%", total: 1245, active: 1198, vacation: 32, sick: 15 },
    { name: "Лаборатория", efficiency: "97%", total: 156, active: 145, vacation: 8, sick: 3 },
    { name: "Отдел кадров", efficiency: "91%", total: 45, active: 42, vacation: 2, sick: 1 },
    { name: "Служба ремонта", efficiency: "89%", total: 567, active: 534, vacation: 25, sick: 8 },
];

export function EmployeesDepartmentsTab() {
    return (
        <div className="grid gap-6">
            {departments.map((d, i) => (
                <div key={i} className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
                    <div className="px-6 pt-6">
                        <div className="flex items-center justify-between">
                            <h4 className="leading-none font-semibold text-base">{d.name}</h4>
                            <Badge variant="outline" className="text-sm">Эффективность: {d.efficiency}</Badge>
                        </div>
                    </div>
                    <div className="px-6 pb-6 -mt-2">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">{d.total}</div>
                                <div className="text-sm text-muted-foreground">Всего</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">{d.active}</div>
                                <div className="text-sm text-muted-foreground">Активных</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-yellow-600">{d.vacation}</div>
                                <div className="text-sm text-muted-foreground">В отпуске</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-red-600">{d.sick}</div>
                                <div className="text-sm text-muted-foreground">Больничный</div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
