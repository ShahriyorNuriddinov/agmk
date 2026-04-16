"use client";

import { useQuery } from "@tanstack/react-query";
import { Eye, MessageSquare, Monitor } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { supportApi } from "@/api/support";

const statusMap: Record<string, { label: string; cls: string }> = {
    open: { label: "Ожидает", cls: "text-orange-600 border-orange-600" },
    in_progress: { label: "В работе", cls: "text-blue-600 border-blue-600" },
    resolved: { label: "Решено", cls: "text-green-600 border-green-600" },
    closed: { label: "Закрыто", cls: "text-green-600 border-green-600" },
};

const priorityMap: Record<string, { label: string; variant: "destructive" | "outline"; cls?: string }> = {
    high: { label: "Высокий", variant: "destructive" },
    medium: { label: "Средний", variant: "outline", cls: "text-yellow-600 border-yellow-600" },
    low: { label: "Низкий", variant: "outline", cls: "text-green-600 border-green-600" },
};

export function MyTicketsTab() {
    const { data, isLoading } = useQuery({
        queryKey: ["support"],
        queryFn: supportApi.getMy,
    });

    const tickets = data?.data ?? [];

    if (isLoading) return <div className="text-center py-10 text-muted-foreground">Загрузка...</div>;

    return (
        <Card>
            <CardHeader>
                <CardTitle>Мои заявки в техподдержку</CardTitle>
                <CardDescription>История ваших обращений в IT службу</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {tickets.length === 0 ? (
                        <p className="text-center text-muted-foreground py-8">У вас пока нет заявок</p>
                    ) : (
                        tickets.map((t: any) => {
                            const st = statusMap[t.status] ?? { label: t.status, cls: "" };
                            const pr = priorityMap[t.priority] ?? { label: t.priority, variant: "outline" as const };
                            const created = new Date(t.createdAt).toLocaleString("ru-RU");
                            const updated = new Date(t.updatedAt).toLocaleString("ru-RU");

                            return (
                                <div key={t._id} className="border rounded-lg p-4 hover:shadow-md transition-all">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-start space-x-3">
                                            <Monitor className="h-4 w-4 text-blue-600 mt-0.5" aria-hidden />
                                            <div>
                                                <h4 className="font-semibold">{t.title}</h4>
                                                <p className="text-sm text-muted-foreground">№ {t.ticketNumber}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Badge variant={pr.variant} className={pr.cls}>{pr.label}</Badge>
                                            <Badge variant="outline" className={st.cls}>{st.label}</Badge>
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4 text-sm mb-3">
                                        <div><span className="font-medium">Создано:</span><p>{created}</p></div>
                                        <div><span className="font-medium">Обновлено:</span><p>{updated}</p></div>
                                        <div><span className="font-medium">Категория:</span><p>{t.category}</p></div>
                                        <div><span className="font-medium">Местоположение:</span><p>{t.location ?? "—"}</p></div>
                                    </div>
                                    <div className="mb-3">
                                        <span className="font-medium text-sm">Описание:</span>
                                        <p className="text-sm text-muted-foreground">{t.description}</p>
                                    </div>
                                    {t.solution && (
                                        <div className="mb-3 p-3 bg-green-50 rounded-lg">
                                            <span className="font-medium text-sm text-green-800">Решение:</span>
                                            <p className="text-sm text-green-700">{t.solution}</p>
                                        </div>
                                    )}
                                    <div className="flex justify-end space-x-2">
                                        <Button variant="outline" size="sm">
                                            <Eye className="h-4 w-4 mr-2" aria-hidden />Подробнее
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <MessageSquare className="h-4 w-4 mr-2" aria-hidden />Комментарий
                                        </Button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
