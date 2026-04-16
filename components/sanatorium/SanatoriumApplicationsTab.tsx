"use client";

import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Eye, Download } from "lucide-react";
import { useSanatoriumApplications, useCancelSanatorium } from "@/hooks/useSanatorium";

const statusConfig: Record<string, { label: string; cls: string }> = {
    pending: { label: "На рассмотрении", cls: "text-blue-600 border-blue-600" },
    approved: { label: "Одобрено", cls: "text-green-600 border-green-600" },
    rejected: { label: "Отклонено", cls: "text-red-600 border-red-600" },
    completed: { label: "Завершено", cls: "text-muted-foreground border-border" },
};

export function SanatoriumApplicationsTab() {
    const { data, isLoading } = useSanatoriumApplications();
    const { mutate: cancel } = useCancelSanatorium();

    const applications = data?.data ?? [];

    if (isLoading) return <div className="text-center py-10 text-muted-foreground">Загрузка...</div>;

    if (applications.length === 0) {
        return (
            <div className="bg-card rounded-xl border p-10 text-center text-muted-foreground">
                У вас нет поданных заявлений
            </div>
        );
    }

    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
            <div className="px-6 pt-6">
                <h4 className="leading-none font-semibold text-base">Мои заявления</h4>
                <p className="text-sm text-muted-foreground mt-1">История заявок на санаторно-курортное лечение</p>
            </div>
            <div className="px-6 pb-6 -mt-2 space-y-6">
                {applications.map((a: any) => {
                    const st = statusConfig[a.status] ?? { label: a.status, cls: "" };
                    const appliedDate = new Date(a.createdAt).toLocaleDateString("ru-RU");
                    const checkIn = new Date(a.checkIn).toLocaleDateString("ru-RU");
                    const checkOut = new Date(a.checkOut).toLocaleDateString("ru-RU");

                    return (
                        <div key={a._id} className="border rounded-lg p-4 space-y-4 hover:shadow-md hover:border-primary/30 transition-all">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-semibold">{a.sanatorium}</h4>
                                    <p className="text-sm text-muted-foreground">Заявление от {appliedDate}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${st.cls}`}>
                                        {st.label}
                                    </span>
                                    {a.queuePosition && (
                                        <span className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium">
                                            Очередь: #{a.queuePosition}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4 text-sm">
                                <div className="space-y-2">
                                    <div>
                                        <span className="font-medium">Даты пребывания:</span>
                                        <p>{checkIn} — {checkOut}</p>
                                    </div>
                                    {a.roomType && (
                                        <div>
                                            <span className="font-medium">Тип номера:</span>
                                            <p>{a.roomType}</p>
                                        </div>
                                    )}
                                    {a.treatment && (
                                        <div>
                                            <span className="font-medium">Профиль лечения:</span>
                                            <p>{a.treatment}</p>
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    {a.companions?.length > 0 && (
                                        <div>
                                            <span className="font-medium">Сопровождающие:</span>
                                            {a.companions.map((c: any, j: number) => (
                                                <p key={j} className="text-xs">{c.name} ({c.relation})</p>
                                            ))}
                                        </div>
                                    )}
                                    {a.totalCost && (
                                        <div>
                                            <span className="font-medium">Стоимость:</span>
                                            <p className="font-bold">{a.totalCost.toLocaleString()} сум</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end space-x-2 pt-2 border-t">
                                <button className="inline-flex items-center justify-center text-sm font-medium border bg-background hover:bg-accent h-8 rounded-md px-3 gap-1.5 transition-colors">
                                    <Eye className="h-4 w-4" aria-hidden />
                                    Подробнее
                                </button>
                                {a.status === "approved" && (
                                    <button className="inline-flex items-center justify-center text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white h-8 rounded-md px-3 gap-1.5 transition-colors">
                                        <Download className="h-4 w-4" aria-hidden />
                                        Путевка
                                    </button>
                                )}
                                {(a.status === "pending") && (
                                    <button
                                        onClick={() => cancel(a._id)}
                                        className="inline-flex items-center justify-center text-sm font-medium border border-red-200 text-red-500 hover:bg-red-50 h-8 rounded-md px-3 gap-1.5 transition-colors"
                                    >
                                        Отменить
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
