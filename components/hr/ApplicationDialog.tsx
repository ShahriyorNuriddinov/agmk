"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCreateKindergarten } from "@/hooks/useKindergarten";

const schema = z.object({
    childFirstName: z.string().min(1, "Введите имя ребенка"),
    childLastName: z.string().min(1, "Введите фамилию ребенка"),
    childBirthDate: z.string().min(1, "Введите дату рождения"),
    preferredGarden: z.string().optional(),
    parentInfo: z.string().optional(),
    contacts: z.string().optional(),
    additionalInfo: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const gardens = [
    'Детский сад "Солнышко"',
    'Детский сад "Радуга"',
    'Детский сад "Ромашка"',
    'Детский сад "Сказка"',
];

interface Props {
    open: boolean;
    onClose: () => void;
}

export function ApplicationDialog({ open, onClose }: Props) {
    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const { mutate, isPending } = useCreateKindergarten(() => { reset(); onClose(); });

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle>Заявление в детский сад</DialogTitle>
                    <DialogDescription>
                        Заполните форму для постановки ребенка в очередь на место в детском саду
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit((d) => mutate(d))} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="childFirstName">Имя ребенка</Label>
                            <Input id="childFirstName" placeholder="Введите имя" {...register("childFirstName")} />
                            {errors.childFirstName && <p className="text-xs text-destructive">{errors.childFirstName.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="childLastName">Фамилия ребенка</Label>
                            <Input id="childLastName" placeholder="Введите фамилию" {...register("childLastName")} />
                            {errors.childLastName && <p className="text-xs text-destructive">{errors.childLastName.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="childBirthDate">Дата рождения</Label>
                            <Input id="childBirthDate" type="date" {...register("childBirthDate")} />
                            {errors.childBirthDate && <p className="text-xs text-destructive">{errors.childBirthDate.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label>Предпочитаемый детский сад</Label>
                            <Select onValueChange={(v) => setValue("preferredGarden", v)}>
                                <SelectTrigger><SelectValue placeholder="Выберите детский сад" /></SelectTrigger>
                                <SelectContent>
                                    {gardens.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="parentInfo">Информация о родителе</Label>
                        <Input id="parentInfo" placeholder="ФИО, должность, табельный номер" {...register("parentInfo")} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="contacts">Контактные данные</Label>
                        <Input id="contacts" placeholder="Телефон, email" {...register("contacts")} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="additionalInfo">Дополнительная информация</Label>
                        <Textarea
                            id="additionalInfo"
                            placeholder="Особые потребности, медицинские ограничения и т.д."
                            rows={3}
                            {...register("additionalInfo")}
                        />
                    </div>

                    <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline" onClick={onClose}>Отмена</Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Отправка..." : "Подать заявление"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
