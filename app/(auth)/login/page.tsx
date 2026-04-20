"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Building2, Eye, EyeOff, LogIn } from "lucide-react";
import { useState } from "react";
import { useLogin } from "@/hooks/useLogin";

const schema = z.object({
    email: z.string().email("Некорректный email"),
    password: z.string().min(1, "Введите пароль"),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
    const [showPass, setShowPass] = useState(false);
    const { mutate, isPending } = useLogin();

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

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
                    <h2 className="text-2xl font-bold mb-1">Вход</h2>
                    <p className="text-sm text-muted-foreground mb-6">Введите ваши корпоративные данные</p>

                    <form onSubmit={handleSubmit((data) => mutate(data))} className="space-y-4">
                        <div>
                            <label className="text-sm font-medium block mb-1.5" htmlFor="email">
                                Email
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

                        <div>
                            <label className="text-sm font-medium block mb-1.5" htmlFor="password">
                                Пароль
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPass ? "text" : "password"}
                                    placeholder="••••••••"
                                    {...register("password")}
                                    className="w-full border rounded-md px-3 pr-10 h-10 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    aria-label={showPass ? "Скрыть пароль" : "Показать пароль"}
                                >
                                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-xs text-destructive mt-1">{errors.password.message}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-primary text-primary-foreground rounded-md h-10 text-sm font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-60"
                        >
                            {isPending
                                ? <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                : <LogIn className="h-4 w-4" aria-hidden />
                            }
                            {isPending ? "Входим..." : "Войти"}
                        </button>
                    </form>

                    <p className="text-sm text-center text-muted-foreground mt-6">
                        Нет доступа?{" "}
                        <Link href="/request-access" className="text-primary font-medium hover:underline">
                            Запросить доступ
                        </Link>
                    </p>
                </div>

                <p className="text-center text-xs text-muted-foreground mt-4">
                    <Link href="/about" className="hover:underline">← Вернуться на главную</Link>
                </p>
            </div>
        </div>
    );
}
