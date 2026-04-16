import { BarChart3, PieChart } from "lucide-react";

export function SalaryAnalytics() {
    return (
        <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
                <div className="px-6 pt-6">
                    <h4 className="leading-none font-semibold text-base">Динамика доходов</h4>
                </div>
                <div className="px-6 pb-6">
                    <div className="h-48 flex items-center justify-center text-muted-foreground">
                        <BarChart3 className="h-16 w-16" />
                        <span className="ml-4">График доходов за последние 12 месяцев</span>
                    </div>
                </div>
            </div>

            <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
                <div className="px-6 pt-6">
                    <h4 className="leading-none font-semibold text-base">Структура выплат</h4>
                </div>
                <div className="px-6 pb-6">
                    <div className="h-48 flex items-center justify-center text-muted-foreground">
                        <PieChart className="h-16 w-16" />
                        <span className="ml-4">Диаграмма структуры зарплаты</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
