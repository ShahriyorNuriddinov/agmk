"use client";

import { useState } from "react";
import { X, Download, Plus, FileSpreadsheet } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { foodVouchersApi } from "@/api/foodVouchers";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";

type Tab = "export" | "add";

interface Props {
    onClose: () => void;
}

export function FoodReportModal({ onClose }: Props) {
    const [tab, setTab] = useState<Tab>("export");
    const [form, setForm] = useState({
        type: "LPP",
        allocated: "",
        month: String(new Date().getMonth() + 1),
        year: String(new Date().getFullYear()),
    });

    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryKey: ["food-vouchers-history"],
        queryFn: foodVouchersApi.getHistory,
    });

    const vouchers: any[] = data?.data ?? [];

    // Excel eksport
    const handleExport = () => {
        const rows: any[] = [];
        for (const v of vouchers) {
            if ((v.transactions ?? []).length === 0) {
                rows.push({
                    "Тип": v.type,
                    "Месяц": v.month,
                    "Год": v.year,
                    "Выделено (сум)": v.allocated,
                    "Использовано (сум)": v.used,
                    "Остаток (сум)": v.allocated - v.used,
                    "Дата транзакции": "",
                    "Сумма транзакции": "",
                    "Место": "",
                    "Описание": "",
                });
            } else {
                for (const t of v.transactions) {
                    rows.push({
                        "Тип": v.type,
                        "Месяц": v.month,
                        "Год": v.year,
                        "Выделено (сум)": v.allocated,
                        "Использовано (сум)": v.used,
                        "Остаток (сум)": v.allocated - v.used,
                        "Дата транзакции": new Date(t.date).toLocaleDateString("ru-RU"),
                        "Сумма транзакции": t.amount,
                        "Место": t.location ?? "",
                        "Описание": t.description ?? "",
                    });
                }
            }
        }

        if (rows.length === 0) {
            toast.error("Нет данных для экспорта");
            return;
        }

        const ws = XLSX.utils.json_to_sheet(rows);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Талоны питания");
        XLSX.writeFile(wb, `food-vouchers-${Date.now()}.xlsx`);
        toast.success("Файл скачан");
        onClose();
    };

    // Qo'lda qo'shish
    const addMutation = useMutation({
        mutationFn: () => foodVouchersApi.addVoucher({
            type: form.type,
            allocated: Number(form.allocated),
            month: Number(form.month),
            year: Number(form.year),
        }),
        onSuccess: () => {
            toast.success("Талон добавлен");
            queryClient.invalidateQueries({ queryKey: ["food-vouchers"] });
            queryClient.invalidateQueries({ queryKey: ["food-vouchers-history"] });
            onClose();
        },
        onError: (e: any) => {
            toast.error(e?.response?.data?.message ?? "Ошибка при добавлении");
        },
    });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md mx-4">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b">
                    <h3 className="font-semibold text-lg">Отчет по талонам питания</h3>
                    <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b">
                    <button
                        onClick={() => setTab("export")}
                        className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${tab === "export" ? "border-b-2 border-blue-600 text-blue-600" : "text-muted-foreground hover:text-foreground"}`}
                    >
                        <FileSpreadsheet className="h-4 w-4" />
                        Выгрузить Excel
                    </button>
                    <button
                        onClick={() => setTab("add")}
                        className={`flex-1 py-3 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${tab === "add" ? "border-b-2 border-blue-600 text-blue-600" : "text-muted-foreground hover:text-foreground"}`}
                    >
                        <Plus className="h-4 w-4" />
                        Добавить талон
                    </button>
                </div>

                <div className="p-6">
                    {tab === "export" ? (
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Экспортирует все талоны и транзакции в формате Excel (.xlsx)
                            </p>
                            <div className="bg-accent/50 rounded-lg p-4 text-sm">
                                <p className="font-medium mb-1">Файл будет содержать:</p>
                                <ul className="text-muted-foreground space-y-1 list-disc list-inside">
                                    <li>Тип талона (ЛПП / БП)</li>
                                    <li>Выделенная и использованная сумма</li>
                                    <li>Все транзакции с датами и местами</li>
                                </ul>
                            </div>
                            <button
                                onClick={handleExport}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-md h-10 text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                            >
                                <Download className="h-4 w-4" />
                                Скачать Excel
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium block mb-1.5">Тип талона</label>
                                <select
                                    value={form.type}
                                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                                    className="w-full border rounded-md px-3 h-10 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                                >
                                    <option value="LPP">ЛПП (Лечебно-профилактическое)</option>
                                    <option value="BP">БП (Буфетное питание)</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-medium block mb-1.5">Выделенная сумма (сум)</label>
                                <input
                                    type="number"
                                    placeholder="450000"
                                    value={form.allocated}
                                    onChange={(e) => setForm({ ...form, allocated: e.target.value })}
                                    className="w-full border rounded-md px-3 h-10 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-sm font-medium block mb-1.5">Месяц</label>
                                    <select
                                        value={form.month}
                                        onChange={(e) => setForm({ ...form, month: e.target.value })}
                                        className="w-full border rounded-md px-3 h-10 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                                    >
                                        {Array.from({ length: 12 }, (_, i) => (
                                            <option key={i + 1} value={i + 1}>
                                                {new Date(2000, i, 1).toLocaleDateString("ru-RU", { month: "long" })}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-sm font-medium block mb-1.5">Год</label>
                                    <input
                                        type="number"
                                        value={form.year}
                                        onChange={(e) => setForm({ ...form, year: e.target.value })}
                                        className="w-full border rounded-md px-3 h-10 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                                    />
                                </div>
                            </div>
                            <button
                                onClick={() => addMutation.mutate()}
                                disabled={!form.allocated || addMutation.isPending}
                                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-md h-10 text-sm font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-60"
                            >
                                {addMutation.isPending
                                    ? <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                    : <Plus className="h-4 w-4" />
                                }
                                {addMutation.isPending ? "Добавляем..." : "Добавить талон"}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
