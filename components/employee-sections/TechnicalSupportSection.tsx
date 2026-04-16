"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { MyTicketsTab } from "./support/MyTicketsTab";
import { AllTicketsTab } from "./support/AllTicketsTab";
import { SupportTeamTab } from "./support/SupportTeamTab";
import { FaqTab } from "./support/FaqTab";
import { ContactsTab } from "./support/ContactsTab";
import { useCreateTicket } from "@/hooks/useSupport";

const schema = z.object({
    category: z.string().min(1, "Выберите категорию"),
    priority: z.enum(["low", "medium", "high"]),
    title: z.string().min(3, "Введите описание проблемы"),
    description: z.string().min(5, "Опишите проблему подробнее"),
    location: z.string().optional(),
    contactPhone: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

function CreateTicketDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
    const queryClient = useQueryClient();

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: { priority: "medium" },
    });

    const { mutate, isPending } = useCreateTicket(() => { reset(); onClose(); });

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Новая заявка в техподдержку</DialogTitle>
                    <DialogDescription>Опишите вашу проблему или запрос как можно подробнее</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit((d) => mutate(d))} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Категория</Label>
                            <Select onValueChange={(v) => setValue("category", v)}>
                                <SelectTrigger><SelectValue placeholder="Выберите категорию" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Оборудование">Оборудование</SelectItem>
                                    <SelectItem value="Программное обеспечение">Программное обеспечение</SelectItem>
                                    <SelectItem value="Сеть">Сеть</SelectItem>
                                    <SelectItem value="Почта">Почта</SelectItem>
                                    <SelectItem value="Доступы">Доступы</SelectItem>
                                    <SelectItem value="Другое">Другое</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.category && <p className="text-xs text-destructive">{errors.category.message}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label>Приоритет</Label>
                            <Select defaultValue="medium" onValueChange={(v) => setValue("priority", v as any)}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="high">Высокий</SelectItem>
                                    <SelectItem value="medium">Средний</SelectItem>
                                    <SelectItem value="low">Низкий</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Краткое описание проблемы</Label>
                        <Input placeholder="Например: Не работает принтер" {...register("title")} />
                        {errors.title && <p className="text-xs text-destructive">{errors.title.message}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label>Подробное описание</Label>
                        <Textarea placeholder="Опишите проблему подробно..." rows={4} {...register("description")} />
                        {errors.description && <p className="text-xs text-destructive">{errors.description.message}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Местоположение</Label>
                            <Input placeholder="Корпус, этаж, кабинет" {...register("location")} />
                        </div>
                        <div className="space-y-2">
                            <Label>Контактный телефон</Label>
                            <Input placeholder="Внутренний номер" {...register("contactPhone")} />
                        </div>
                    </div>
                    <div className="flex justify-end space-x-2">
                        <Button type="button" variant="outline" onClick={onClose}>Отмена</Button>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Создание..." : "Создать заявку"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export function TechnicalSupportSection() {
    const [dialogOpen, setDialogOpen] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold">Техническая поддержка</h2>
                    <p className="text-muted-foreground">IT сервисы и техническая поддержка АГМК</p>
                </div>
                <Button onClick={() => setDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" aria-hidden />
                    Создать заявку
                </Button>
            </div>

            <Tabs defaultValue="my-tickets">
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="my-tickets">Мои заявки</TabsTrigger>
                    <TabsTrigger value="all-tickets">Все заявки</TabsTrigger>
                    <TabsTrigger value="support-team">Команда поддержки</TabsTrigger>
                    <TabsTrigger value="faq">FAQ</TabsTrigger>
                    <TabsTrigger value="contacts">Контакты</TabsTrigger>
                </TabsList>

                <TabsContent value="my-tickets">
                    <MyTicketsTab />
                </TabsContent>
                <TabsContent value="all-tickets">
                    <AllTicketsTab tickets={[]} />
                </TabsContent>
                <TabsContent value="support-team">
                    <SupportTeamTab />
                </TabsContent>
                <TabsContent value="faq">
                    <FaqTab />
                </TabsContent>
                <TabsContent value="contacts">
                    <ContactsTab />
                </TabsContent>
            </Tabs>

            <CreateTicketDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
        </div>
    );
}
