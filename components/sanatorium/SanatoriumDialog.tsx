"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateSanatorium } from "@/hooks/useSanatorium";

const schema = z.object({
    sanatorium: z.string().min(1, "Выберите санаторий"),
    checkIn: z.string().min(1, "Укажите дату заезда"),
    checkOut: z.string().min(1, "Укажите дату выезда"),
    roomType: z.string().optional(),
    treatment: z.string().optional(),
    spouseName: z.string().optional(),
    child1: z.string().optional(),
    child2: z.string().optional(),
    medicalNotes: z.string().optional(),
    specialRequests: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const sanatoriumList = [
    'Санаторий "Чимган"', 'Санаторий "Ходжикент"', 'Санаторий "Бельдерсай"',
    'Санаторий "Олтин Олма"', "Профилакторий АГМК", 'Санаторий "Зарафшан"',
];
const roomTypes = ["Одноместный", "Двухместный", "Семейный номер", "Люкс"];
const treatments = ["Кардиология", "Неврология", "Ортопедия", "Гастроэнтерология", "Пульмонология", "Профилактическое лечение", "Реабилитация"];

interface Props { open: boolean; onClose: () => void; defaultSanatorium?: string; }

export function SanatoriumDialog({ open, onClose, defaultSanatorium }: Props) {
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: { sanatorium: defaultSanatorium },
    });

    const { mutate, isPending } = useCreateSanatorium(() => { reset(); onClose(); });

    const onSubmit = (data: FormData) => {
        const companions = [];
        if (data.spouseName) companions.push({ name: data.spouseName, relation: "Супруг/супруга" });
        if (data.child1) companions.push({ name: data.child1, relation: "Ребенок" });
        if (data.child2) companions.push({ name: data.child2, relation: "Ребенок" });
        mutate({ sanatorium: data.sanatorium, checkIn: data.checkIn, checkOut: data.checkOut, roomType: data.roomType, treatment: data.treatment, companions, medicalNotes: data.medicalNotes, specialRequests: data.specialRequests });
    };

    return (
        <Dialog open={open} onOpenChange={(v) => { if (!v) onClose(); }}>
            <DialogContent className="max-w-3xl max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>Заявление на санаторно-курортное лечение</DialogTitle>
                    <DialogDescription>Заполните форму для бронирования места в санатории</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-h-[75vh] overflow-y-auto pr-2">
                    <div className="space-y-2">
                        <Label>Санаторий</Label>
                        <Select defaultValue={defaultSanatorium} onValueChange={(v) => setValue("sanatorium", v)}>
                            <SelectTrigger><SelectValue placeholder="Выберите санаторий" /></SelectTrigger>
                            <SelectContent>{sanatoriumList.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                        </Select>
                        {errors.sanatorium && <p className="text-xs text-destructive">{errors.sanatorium.message}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Дата заезда</Label>
                            <Input type="date" {...register("checkIn")} />
                            {errors.checkIn && <p className="text-xs text-destructive">{errors.checkIn.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label>Дата выезда</Label>
                            <Input type="date" {...register("checkOut")} />
                            {errors.checkOut && <p className="text-xs text-destructive">{errors.checkOut.message}</p>}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Тип номера</Label>
                            <Select onValueChange={(v) => setValue("roomType", v)}>
                                <SelectTrigger><SelectValue placeholder="Выберите тип номера" /></SelectTrigger>
                                <SelectContent>{roomTypes.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Профиль лечения</Label>
                            <Select onValueChange={(v) => setValue("treatment", v)}>
                                <SelectTrigger><SelectValue placeholder="Выберите профиль" /></SelectTrigger>
                                <SelectContent>{treatments.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Сопровождающие лица</Label>
                        <div className="space-y-2">
                            <Input placeholder="ФИО супруга/супруги" {...register("spouseName")} />
                            <Input placeholder="ФИО ребенка 1" {...register("child1")} />
                            <Input placeholder="ФИО ребенка 2" {...register("child2")} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Медицинские показания</Label>
                        <Textarea placeholder="Укажите диагноз и показания к санаторно-курортному лечению" rows={3} {...register("medicalNotes")} />
                    </div>
                    <div className="space-y-2">
                        <Label>Дополнительные пожелания</Label>
                        <Textarea placeholder="Особые требования к питанию, номеру и т.д." rows={2} {...register("specialRequests")} />
                    </div>
                    <div className="flex justify-end space-x-2 pt-2">
                        <Button type="button" variant="outline" onClick={onClose}>Отмена</Button>
                        <Button type="submit" disabled={isPending}>{isPending ? "Отправка..." : "Подать заявление"}</Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
