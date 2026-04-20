"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Building2, Mail, Send } from "lucide-react";
import { useState } from "react";
import { authApi } from "@/api/auth";
import toast from "react-hot-toast";

const schema = z.object({
    email: z.string().email("Некорректный email"),
});

type FormData = z.infer<typeof schema>;

export default function RequestAccessPage() {
    const [sent, setSent] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const { register, handleSubmit, formState: { errors }, getValues } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = async (data: FormData) => {
        setIsPending(true);
        try {
            await authApi.requestAccess(data.email);
            setSent(true);
        } catch {
            toast.error("Ошибка при отправке. Попробуйте позже.");
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="min-h-screen bg-accent/30 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center space-x-3">
                        <Building2 className="h-10 w-10 text-primary" aria-hidden />
                        <div className="text-left">
                            <p className="text-xl font-bold text-primary">АГМК</p>
                            <p className="text-xs text-muted-foreground">Корпоративный портал</p>
                        </div>
                    </Link>
                </div>

                <div className="bg-white rounded-xl border shadow-sm p-8">
                    {sent ? (
                        <div className="text-center py-4">
                            <div className="flex justify-center mb-4">
                                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Mail className="h-7 w-7 text-primary" />
                                </div>
                            </div>
                            <h2 className="text-xl font-bold mb-2">Проверьте почту</h2>
                            <p className="text-sm text-muted-foreground mb-1">
                                Если адрес <span className="font-medium text-foreground">{getValues("email")}</span> зарегистрирован в системе,
                            </p>
                            <p className="text-sm text-muted-foreground mb-6">
                                на него будет отправлена ссылка для входа.
                            </p>
                            <Link href="/login" className="text-sm text-primary font-medium hover:underline">
                                ← Вернуться к входу
                            </Link>
                        </div>
                    ) : (
                        <>
                            <h2 className="text-2xl font-bold mb-1">Запрос доступа</h2>
                            <p className="text-sm text-muted-foreground mb-6">
                                Введите ваш корпоративный email — мы отправим ссылку для входа
                            </p>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium block mb-1.5" htmlFor="email">
                                        Корпоративный email
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="i.ivanov@agmk.uz"
                                        {...register("email")}
                                        className="w-full border rounded-md px-3 h-10 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                                    />
                                    {errors.email && (
                                        <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full bg-primary text-primary-foreground rounded-md h-10 text-sm font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-60"
                                >
                                    {isPending
                                        ? <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                        : <Send className="h-4 w-4" aria-hidden />
                                    }
                                    {isPending ? "Отправляем..." : "Отправить ссылку"}
                                </button>
                            </form>

                            <p className="text-sm text-center text-muted-foreground mt-6">
                                Уже есть доступ?{" "}
                                <Link href="/login" className="text-primary font-medium hover:underline">Войти</Link>
                            </p>
                        </>
                    )}
                </div>

                <p className="text-center text-xs text-muted-foreground mt-4">
                    <Link href="/about" className="hover:underline">← Вернуться на главную</Link>
                </p>
            </div>
        </div>
    );
}
