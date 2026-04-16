import { Clock } from "lucide-react";

export function TodayCard() {
    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
            <div className="px-6 pt-6">
                <h4 className="leading-none flex items-center space-x-2 font-semibold text-base">
                    <Clock className="h-5 w-5 text-green-600" />
                    <span>Сегодня</span>
                </h4>
            </div>
            <div className="px-6 pb-6">
                <p className="text-muted-foreground text-sm">Сегодня событий нет</p>
            </div>
        </div>
    );
}
