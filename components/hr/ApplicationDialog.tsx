"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateKindergarten } from "@/hooks/useKindergarten";


const nameRegex = /^[A-Za-zА-Яа-яЁё\s]+$/;

const schema = z.object({

  childBirthDate: z
    .string()
    .min(1, "Введите дату рождения")
    .refine(
      (date) => {
        const d = new Date(date);
        const min = new Date("2019-01-01");
        const max = new Date("2023-12-31");
        return d >= min && d <= max;
      },
      {
        message: "Дата должна быть с 2019 по 2023 год",
      },
    ),

  preferredGarden: z.string().optional(),

  parentInfo: z.string().max(100, "Максимум 100 символов").optional(),

  contacts: z
    .string()
    .max(50, "Максимум 50 символов")
    .regex(/^[0-9+()\-\s]*$/, "Неверный формат контактов")
    .optional(),

  additionalInfo: z.string().max(300, "Максимум 300 символов").optional(),
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
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutate, isPending } = useCreateKindergarten(() => {
    reset();
    onClose();
  });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Заявление в детский сад</DialogTitle>
          <DialogDescription>
            Заполните форму для постановки ребенка в очередь
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit((d) => mutate(d))} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Имя ребенка</Label>
              <Input
                maxLength={30}
                placeholder="Введите имя"
                {...register("childFirstName")}
              />
              {errors.childFirstName && (
                <p className="text-xs text-destructive">
                  {errors.childFirstName.message}
                </p>
              )}
            </div>

            <div>
              <Label>Фамилия ребенка</Label>
              <Input
                maxLength={30}
                placeholder="Введите фамилию"
                {...register("childLastName")}
              />
              {errors.childLastName && (
                <p className="text-xs text-destructive">
                  {errors.childLastName.message}
                </p>
              )}
            </div>
          </div>

          {/* DATE + SELECT */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Дата рождения</Label>
              <Input
                type="date"
                min="2019-01-01"
                max="2023-12-31"
                {...register("childBirthDate")}
              />
              {errors.childBirthDate && (
                <p className="text-xs text-destructive">
                  {errors.childBirthDate.message}
                </p>
              )}
            </div>

            <div>
              <Label>Детский сад</Label>
              <Select onValueChange={(v) => setValue("preferredGarden", v)}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите сад" />
                </SelectTrigger>
                <SelectContent>
                  {gardens.map((g) => (
                    <SelectItem key={g} value={g}>
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>Информация о родителе</Label>
            <Input
              maxLength={100}
              placeholder="ФИО, должность"
              {...register("parentInfo")}
            />
          </div>

          <div>
            <Label>Контакты</Label>
            <Input
              maxLength={50}
              placeholder="+998..."
              {...register("contacts")}
            />
            {errors.contacts && (
              <p className="text-xs text-destructive">
                {errors.contacts.message}
              </p>
            )}
          </div>

          <div>
            <Label>Дополнительно</Label>
            <Textarea
              rows={3}
              maxLength={300}
              placeholder="Доп. информация"
              {...register("additionalInfo")}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Отмена
            </Button>

            <Button type="submit" disabled={isPending}>
              {isPending ? "Отправка..." : "Подать"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
