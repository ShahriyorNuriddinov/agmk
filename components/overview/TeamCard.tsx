import { Users } from "lucide-react";

export function TeamCard() {
    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
            <div className="px-6 pt-6 pb-3">
                <h4 className="leading-none flex items-center space-x-2 text-base font-semibold">
                    <Users className="h-5 w-5 text-orange-600" />
                    <span>Команда</span>
                </h4>
            </div>
            <div className="px-6 pb-6 pt-1 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                        <p className="text-2xl font-bold text-blue-600">12</p>
                        <p className="text-xs text-muted-foreground">Прямых подчиненных</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-green-600">45</p>
                        <p className="text-xs text-muted-foreground">Общий размер команды</p>
                    </div>
                </div>
                <div className="text-center">
                    <p className="text-lg font-semibold">8.5 лет</p>
                    <p className="text-xs text-muted-foreground">Средний опыт команды</p>
                </div>
                <div>
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">Эффективность команды</span>
                        <span className="text-sm font-bold text-green-600">96%</span>
                    </div>
                    <div className="bg-slate-200 relative w-full overflow-hidden rounded-full h-2">
                        <div className="bg-blue-700 h-full transition-all rounded-full" style={{ width: "96%" }} />
                    </div>
                </div>
            </div>
        </div>
    );
}
