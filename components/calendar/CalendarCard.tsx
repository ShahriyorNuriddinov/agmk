"use client";

import { Calendar } from "lucide-react";
import { Calendar as ShadCalendar } from "@/components/ui/calendar";
import { ru } from "react-day-picker/locale";

interface Props {
    date: Date | undefined;
    onSelect: (d: Date | undefined) => void;
    selectedLabel: string;
}

export function CalendarCard({ date, onSelect, selectedLabel }: Props) {
    return (
        <div className="space-y-6">
            <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
                <div className="px-6 pt-6">
                    <h4 className="leading-none flex items-center space-x-2 font-semibold text-base">
                        <Calendar className="h-5 w-5 text-blue-600" />
                        <span>Календарь событий</span>
                    </h4>
                </div>
                <div className="px-6 pb-6 -mt-2">
                    <ShadCalendar
                        mode="single"
                        selected={date}
                        onSelect={onSelect}
                        locale={ru}
                        showOutsideDays
                        className="[--cell-size:--spacing(8)]"
                    />
                    <div className="mt-4 flex flex-wrap gap-4 text-sm border-t pt-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded" />
                            <span>События</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-red-500 rounded" />
                            <span>Праздники</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-blue-600 rounded" />
                            <span>Сегодня</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
                <div className="px-6 pt-6">
                    <h4 className="leading-none font-semibold text-base">
                        События на {selectedLabel}
                    </h4>
                </div>
                <div className="px-6 pb-6">
                    <p className="text-muted-foreground text-center py-8">
                        На эту дату нет запланированных событий
                    </p>
                </div>
            </div>
        </div>
    );
}
