"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Building2, Eye, EyeOff, KeyRound } from "lucide-react";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { authApi } from "@/api/auth";
import toast from "react-hot-toast";

const schema = z.object({
    password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
    confirmPassword: z.string(),
}).refine((d) => d.password === d.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
});

type FormData = z.infer<typeof schema>;

function SetPasswordForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token") ?? "";

    const [showPass, setShowPass] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [email, setEmail] = useState<string | null>(null);
    const [tokenError, setTokenError] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema),
    });

    useEffect(() => {
        if (!token) { setTokenError(true); return; }
        authApi.verifyToken(token)
            .then((d) => setEmail(d.email))
            .catch(() => setTokenError(true));
    }, [token]);

    const onSubmit = async ({ password }: FormData) => {
        setIsPending(true);
        try {
            const data = await authApi.setPassword(token, password);
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            localStorage.setItem("user", JSON.stringify(data.user));
            toast.success("Пароль установлен. Добро пожаловать!");
            router.push("/");
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Ошибка. Попробуйте запросить новую ссылку.");
        } finally {
            setIsPending(false);
        }
    };

    if (tokenError) {
        return (
            <div className="text-center py-4">
                <h2 className="text-xl font-bold mb-2 text-destructive">Ссылка недействительна</h2>
                <p className="text-sm text-muted-foreground mb-6">
                    Ссылка истекла или уже была использована.
                </p>
                <Link href="/request-access" className="text-primary font-medium hover:underline text-sm">
                    Запросить новую ссылку
                </Link>
            </div>
        );
    }

    if (!email) {
        return (
            <div className="flex justify-center py-8">
                <span className="h-6 w-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <>
            <h2 className="text-2xl font-bold mb-1">Установите пароль</h2>
            <p className="text-sm text-muted-foreground mb-6">
                Аккаунт: <span className="font-medium text-foreground">{email}</span>
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="text-sm font-medium block mb-1.5" htmlFor="password">Пароль</label>
                    <div className="relative">
                        <input
                            id="password"
                            type={showPass ? "text" : "password"}
                            placeholder="Минимум 6 символов"
                            {...register("password")}
                            className="w-full border rounded-md px-3 pr-10 h-10 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                        />
                        <button type="button" onClick={() => setShowPass(!showPass)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            aria-label={showPass ? "Скрыть пароль" : "Показать пароль"}>
                            {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                    </div>
                    {errors.password && <p className="text-xs text-destructive mt-1">{errors.password.message}</p>}
                </div>

                <div>
                    <label className="text-sm font-medium block mb-1.5" htmlFor="confirmPassword">Подтвердите пароль</label>
                    <input
                        id="confirmPassword"
                        type={showPass ? "text" : "password"}
                        placeholder="Повторите пароль"
                        {...register("confirmPassword")}
                        className="w-full border rounded-md px-3 h-10 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                    />
                    {errors.confirmPassword && <p className="text-xs text-destructive mt-1">{errors.confirmPassword.message}</p>}
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-primary text-primary-foreground rounded-md h-10 text-sm font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-60"
                >
                    {isPending
                        ? <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        : <KeyRound className="h-4 w-4" aria-hidden />
                    }
                    {isPending ? "Сохраняем..." : "Сохранить и войти"}
                </button>
            </form>
        </>
    );
}

export default function SetPasswordPage() {
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
                    <Suspense fallback={
                        <div className="flex justify-center py-8">
                            <span className="h-6 w-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                        </div>
                    }>
                        <SetPasswordForm />
                    </Suspense>
                </div>

                <p className="text-center text-xs text-muted-foreground mt-4">
                    <Link href="/about" className="hover:underline">← Вернуться на главную</Link>
                </p>
            </div>
        </div>
    );
}
