"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { useCreateIhp } from "@/hooks/useIhp";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ihpApi } from "@/api/ihp";
import { useQueryClient } from "@tanstack/react-query";

const categories = ["Компьютеры", "Периферия", "Мобильные устройства", "Аудио", "Печатная техника", "Видео", "Другое"];

const itemsByCategory: Record<string, string[]> = {
    "Компьютеры": ["Компьютер рабочий Dell OptiPlex", "Ноутбук Lenovo ThinkPad"],
    "Периферия": ["Мышь компьютерная Logitech", "Клавиатура OKLICK"],
    "Мобильные устройства": ["Планшет Samsung Galaxy Tab"],
    "Аудио": ["Наушники с микрофоном"],
    "Печатная техника": ["МФУ Canon i-SENSYS"],
    "Видео": ["Веб-камера Logitech C920"],
    "Другое": [],
};

interface Props {
    open: boolean;
    onClose: () => void;
    defaultCategory?: string;
    defaultItem?: string;
}

export function IHPDialog({ open, onClose, defaultCategory, defaultItem }: Props) {
    const queryClient = useQueryClient();

    const [category, setCategory] = useState(defaultCategory ?? "");
    const [itemName, setItemName] = useState(defaultItem ?? "");
    const [quantity, setQuantity] = useState(1);
    const [urgency, setUrgency] = useState<"low" | "normal" | "high">("normal");
    const [purpose, setPurpose] = useState("");
    const [justification, setJustification] = useState("");

    const items = itemsByCategory[category] ?? [];

    const { mutate, isPending } = useCreateIhp(onClose);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!category) { toast.error("Выберите категорию"); return; }
        if (!itemName) { toast.error("Укажите наименование"); return; }
        mutate({ category, itemName, quantity, urgency, purpose, justification });
    };

    return (
        <Dialog open={open} onOpenChange={(isOpen) => { if (!isOpen) onClose(); }}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Заявка на ИХП</DialogTitle>
                    <DialogDescription>Заполните форму для заказа необходимого оборудования</DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Категория</Label>
                        <Select value={category} onValueChange={(v) => { setCategory(v); setItemName(""); }}>
                            <SelectTrigger><SelectValue placeholder="Выберите категорию" /></SelectTrigger>
                            <SelectContent>
                                {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Наименование</Label>
                        {items.length > 0 ? (
                            <Select value={itemName} onValueChange={setItemName}>
                                <SelectTrigger><SelectValue placeholder="Выберите товар" /></SelectTrigger>
                                <SelectContent>
                                    {items.map(i => <SelectItem key={i} value={i}>{i}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        ) : (
                            <Input placeholder="Введите наименование" value={itemName} onChange={e => setItemName(e.target.value)} />
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="quantity">Количество</Label>
                            <Input id="quantity" type="number" min={1} value={quantity} onChange={e => setQuantity(Number(e.target.value))} />
                        </div>
                        <div className="space-y-2">
                            <Label>Срочность</Label>
                            <Select value={urgency} onValueChange={(v) => setUrgency(v as any)}>
                                <SelectTrigger><SelectValue placeholder="Выберите срочность" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="low">Низкая</SelectItem>
                                    <SelectItem value="normal">Обычная</SelectItem>
                                    <SelectItem value="high">Высокая</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="purpose">Цель использования</Label>
                        <Textarea id="purpose" placeholder="Опишите для каких целей необходимо оборудование" rows={3} value={purpose} onChange={e => setPurpose(e.target.value)} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="justification">Обоснование</Label>
                        <Textarea id="justification" placeholder="Обоснование необходимости заказа" rows={2} value={justification} onChange={e => setJustification(e.target.value)} />
                    </div>

                    <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline" onClick={onClose}>Отмена</Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Отправка..." : "Отправить заявку"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
