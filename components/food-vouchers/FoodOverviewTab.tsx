"use client";

import { useQuery } from "@tanstack/react-query";
import { ChefHat, Utensils, Calendar, TrendingUp, CircleCheckBig } from "lucide-react";
import { foodVouchersApi } from "@/api/foodVouchers";

const typeConfig: Record<string, { label: string; icon: React.ElementType; iconCls: string; badgeCls: string; barCls: string }> = {
    LPP: {
        label: "ЛПП (Лечебно-профилактическое)",
        icon: ChefHat,
        iconCls: "text-blue-600",
        badgeCls: "text-blue-600 border-blue-600",
        barCls: "bg-blue-600",
    },
    BP: {
        label: "БП (Буфетное питание)",
        icon: Utensils,
        iconCls: "text-green-600",
        badgeCls: "text-green-600 border-green-600",
        barCls: "bg-green-600",
    },
};

const now = new Date();
const monthName = now.toLocaleDateString("ru-RU", { month: "long", year: "numeric" });

export function FoodOverviewTab() {
    const { data, isLoading } = useQuery({
        queryKey: ["food-vouchers"],
        queryFn: foodVouchersApi.getCurrent,
    });

    const vouchers: any[] = data?.data ?? [];

    if (isLoading) return <div className="text-center py-10 text-muted-foreground">Загрузка...</div>;

    if (vouchers.length === 0) {
        return (
            <div className="bg-card rounded-xl border p-10 text-center text-muted-foreground">
                Талоны питания на текущий месяц не найдены
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
                {vouchers.map((v) => {
                    const cfg = typeConfig[v.type] ?? { label: v.type, icon: ChefHat, iconCls: "", badgeCls: "", barCls: "bg-primary" };
                    const pct = v.allocated > 0 ? Math.round((v.used / v.allocated) * 100) : 0;
                    const remaining = v.allocated - v.used;
                    const pctCls = pct >= 90 ? "text-red-600" : pct >= 70 ? "text-yellow-600" : "text-green-600";

                    return (
                        <div key={v._id} className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
                            <div className="px-6 pt-6">
                                <div className="flex items-center justify-between">
                                    <h4 className="leading-none flex items-center space-x-2 font-semibold text-base">
                                        <cfg.icon className={`h-5 w-5 ${cfg.iconCls}`} aria-hidden />
                                        <span>{cfg.label}</span>
                                    </h4>
                                    <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${cfg.badgeCls}`}>
                                        {monthName}
                                    </span>
                                </div>
                            </div>
                            <div className="px-6 pb-6 -mt-2 space-y-4">
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <p className="text-muted-foreground">Выделено</p>
                                        <p className="font-bold text-lg">{v.allocated.toLocaleString()} сум</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Использовано</p>
                                        <p className={`font-bold text-lg ${cfg.iconCls}`}>{v.used.toLocaleString()} сум</p>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-sm font-medium">Использование</span>
                                        <span className={`text-sm font-bold ${pctCls}`}>{pct}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2">
                                        <div className={`${cfg.barCls} h-2 rounded-full`} style={{ width: `${Math.min(pct, 100)}%` }} />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Остаток</p>
                                        <p className="font-bold text-green-600">{remaining.toLocaleString()} сум</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Транзакций</p>
                                        <p className="font-bold">{v.transactions?.length ?? 0}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Mini stats — static */}
            <div className="grid md:grid-cols-4 gap-4">
                {[
                    { label: "Сегодня потрачено", value: "—", sub: "сум", icon: Calendar, iconCls: "text-muted-foreground" },
                    { label: "Среднедневной расход", value: "—", sub: "сум", icon: TrendingUp, iconCls: "text-green-600" },
                    { label: "Любимая категория", value: "Обед", sub: "—", icon: ChefHat, iconCls: "text-muted-foreground" },
                    { label: "Статус", value: "Активен", sub: "Текущий месяц", icon: CircleCheckBig, iconCls: "text-green-600", valueCls: "text-green-600" },
                ].map((s, i) => (
                    <div key={i} className="bg-card text-card-foreground rounded-xl border">
                        <div className="p-6 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">{s.label}</p>
                                <p className={`text-2xl font-bold ${(s as any).valueCls ?? ""}`}>{s.value}</p>
                                <p className="text-xs text-muted-foreground">{s.sub}</p>
                            </div>
                            <s.icon className={`h-8 w-8 ${s.iconCls}`} aria-hidden />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
