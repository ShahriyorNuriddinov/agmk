"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Building2, Eye, EyeOff, UserPlus } from "lucide-react";
import { useState } from "react";
import { useRegister } from "@/hooks/useRegister";

const schema = z.object({
    firstName: z.string().min(1, "Введите имя"),
    lastName: z.string().min(1, "Введите фамилию"),
    email: z.string().email("Некорректный email"),
    password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
    confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
    const [showPass, setShowPass] = useState(false);
    const { mutate, isPending } = useRegister();

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = ({ confirmPassword, ...rest }: FormData) => mutate(rest);

    return (
        <div className="min-h-screen bg-accent/30 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <Link href="/about" className="inline-flex items-center space-x-3">
                        <Building2 className="h-10 w-10 text-primary" aria-hidden />
                        <div className="text-left">
                            <p className="text-xl font-bold text-primary">АГМК</p>
                            <p className="text-xs text-muted-foreground">Корпоративный портал</p>
                        </div>
                    </Link>
                </div>

                <div className="bg-white rounded-xl border shadow-sm p-8">
                    <h2 className="text-2xl font-bold mb-1">Регистрация</h2>
                    <p className="text-sm text-muted-foreground mb-6">Создайте аккаунт для доступа к порталу</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-sm font-medium block mb-1.5" htmlFor="lastName">Фамилия</label>
                                <input id="lastName" type="text" placeholder="Иванов" {...register("lastName")}
                                    className="w-full border rounded-md px-3 h-10 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition" />
                                {errors.lastName && <p className="text-xs text-destructive mt-1">{errors.lastName.message}</p>}
                            </div>
                            <div>
                                <label className="text-sm font-medium block mb-1.5" htmlFor="firstName">Имя</label>
                                <input id="firstName" type="text" placeholder="Иван" {...register("firstName")}
                                    className="w-full border rounded-md px-3 h-10 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition" />
                                {errors.firstName && <p className="text-xs text-destructive mt-1">{errors.firstName.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium block mb-1.5" htmlFor="email">Email</label>
                            <input id="email" type="email" placeholder="example@agmk.uz" {...register("email")}
                                className="w-full border rounded-md px-3 h-10 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition" />
                            {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-medium block mb-1.5" htmlFor="password">Пароль</label>
                            <div className="relative">
                                <input id="password" type={showPass ? "text" : "password"} placeholder="Минимум 6 символов"
                                    {...register("password")}
                                    className="w-full border rounded-md px-3 pr-10 h-10 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition" />
                                <button type="button" onClick={() => setShowPass(!showPass)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                                    {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </button>
                            </div>
                            {errors.password && <p className="text-xs text-destructive mt-1">{errors.password.message}</p>}
                        </div>

                        <div>
                            <label className="text-sm font-medium block mb-1.5" htmlFor="confirmPassword">Подтвердите пароль</label>
                            <input id="confirmPassword" type={showPass ? "text" : "password"} placeholder="Повторите пароль"
                                {...register("confirmPassword")}
                                className="w-full border rounded-md px-3 h-10 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition" />
                            {errors.confirmPassword && <p className="text-xs text-destructive mt-1">{errors.confirmPassword.message}</p>}
                        </div>

                        <button type="submit" disabled={isPending}
                            className="w-full bg-primary text-primary-foreground rounded-md h-10 text-sm font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-60">
                            {isPending
                                ? <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                : <UserPlus className="h-4 w-4" aria-hidden />}
                            {isPending ? "Регистрация..." : "Зарегистрироваться"}
                        </button>
                    </form>

                    <p className="text-sm text-center text-muted-foreground mt-6">
                        Уже есть аккаунт?{" "}
                        <Link href="/login" className="text-primary font-medium hover:underline">Войти</Link>
                    </p>
                </div>

                <p className="text-center text-xs text-muted-foreground mt-4">
                    <Link href="/about" className="hover:underline">← Вернуться на главную</Link>
                </p>
            </div>
        </div>
    );
}
