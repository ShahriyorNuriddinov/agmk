"use client";

import { Bell, AlertCircle, Calendar } from "lucide-react";
import { useAnnouncements, useMarkRead } from "@/hooks/useAnnouncements";

export function AnnouncementsCard() {
    const { data, isLoading } = useAnnouncements();
    const { mutate: markRead } = useMarkRead();

    const announcements: any[] = data?.data?.slice(0, 3) ?? [];

    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border lg:col-span-1">
            <div className="px-6 pt-6">
                <h4 className="leading-none flex items-center space-x-2 font-semibold">
                    <Bell className="h-5 w-5" />
                    <span>Объявления</span>
                </h4>
            </div>
            <div className="px-6 pb-6 space-y-4 -mt-2">
                {isLoading ? (
                    <p className="text-sm text-muted-foreground text-center py-4">Загрузка...</p>
                ) : announcements.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-4">Нет объявлений</p>
                ) : (
                    announcements.map((a: any) => {
                        const date = new Date(a.createdAt).toLocaleDateString("ru-RU", { day: "numeric", month: "long" });
                        return (
                            <div
                                key={a._id}
                                className={`border rounded-lg p-3 space-y-2 cursor-pointer transition-colors ${a.isRead ? "opacity-70" : "hover:bg-accent/30"}`}
                                onClick={() => !a.isRead && markRead(a._id)}
                            >
                                <div className="flex items-start space-x-2">
                                    {a.isRead
                                        ? <Calendar className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                                        : <AlertCircle className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                                    }
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-sm leading-tight">{a.title}</h4>
                                        <p className="text-xs text-muted-foreground line-clamp-2">{a.content}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-xs text-muted-foreground">
                                    <span>{a.category ?? "Общее"}</span>
                                    <span>{date}</span>
                                </div>
                            </div>
                        );
                    })
                )}
                <button className="inline-flex items-center justify-center w-full h-8 rounded-md border bg-background text-foreground hover:bg-accent text-sm font-medium transition-colors">
                    Все объявления
                </button>
            </div>
        </div>
    );
}
