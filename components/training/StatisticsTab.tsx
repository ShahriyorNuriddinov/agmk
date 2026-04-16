import { TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const progressItems = [
    { label: "Завершенные курсы", value: "8/15", pct: (8 / 15) * 100 },
    { label: "В процессе", value: "3 курсов", pct: (3 / 15) * 100 },
];

export function StatisticsTab() {
    return (
        <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
                <div className="px-6 pt-6">
                    <h4 className="leading-none font-semibold text-base">Прогресс обучения</h4>
                </div>
                <div className="px-6 pb-6 -mt-2 space-y-4">
                    {progressItems.map((item, i) => (
                        <div key={i}>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium">{item.label}</span>
                                <span className="text-sm">{item.value}</span>
                            </div>
                            <Progress value={item.pct} className="h-2" />
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
                <div className="px-6 pt-6">
                    <h4 className="leading-none font-semibold text-base">Активность по месяцам</h4>
                </div>
                <div className="px-6 pb-6 -mt-2">
                    <div className="h-48 flex items-center justify-center text-muted-foreground">
                        <TrendingUp className="h-16 w-16" aria-hidden />
                        <span className="ml-4">График активности обучения</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
