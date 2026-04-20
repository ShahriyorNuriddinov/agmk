"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Building2, Eye, EyeOff, LogIn, Mail, KeyRound } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/useLogin";
import { useSendOtp } from "@/hooks/useSendOtp";
import { useVerifyOtp } from "@/hooks/useVerifyOtp";
import { useSetPassword } from "@/hooks/useSetPassword";
import toast from "react-hot-toast";

const passSchema = z.object({
    email: z.string().email("Некорректный email"),
    password: z.string().min(1, "Введите пароль"),
});
type PassForm = z.infer<typeof passSchema>;

const emailSchema = z.object({
    email: z.string().email("Некорректный email"),
});
type EmailForm = z.infer<typeof emailSchema>;

const codeSchema = z.object({
    code: z.string().length(6, "Код должен быть 6 цифр"),
});
type CodeForm = z.infer<typeof codeSchema>;

const setPassSchema = z.object({
    password: z.string().min(6, "Минимум 6 символов"),
    confirm: z.string().min(6, "Минимум 6 символов"),
}).refine((d) => d.password === d.confirm, { message: "Пароли не совпадают", path: ["confirm"] });
type SetPassForm = z.infer<typeof setPassSchema>;

export default function LoginPage() {
    const [tab, setTab] = useState<"password" | "otp">("password");
    const [showPass, setShowPass] = useState(false);
    const [otpStep, setOtpStep] = useState<"email" | "code" | "setpass">("email");
    const [otpEmail, setOtpEmail] = useState("");
    const [otpAccessToken, setOtpAccessToken] = useState("");

    const router = useRouter();
    const { mutate: login, isPending: loginPending } = useLogin();
    const sendOtp = useSendOtp();
    const verifyOtp = useVerifyOtp();
    const setPassword = useSetPassword();

    const passForm = useForm<PassForm>({ resolver: zodResolver(passSchema) });
    const emailForm = useForm<EmailForm>({ resolver: zodResolver(emailSchema) });
    const codeForm = useForm<CodeForm>({ resolver: zodResolver(codeSchema) });
    const setPassForm = useForm<SetPassForm>({ resolver: zodResolver(setPassSchema) });

    function handleSendOtp(data: EmailForm) {
        sendOtp.mutate(data.email, {
            onSuccess: () => {
                setOtpEmail(data.email);
                setOtpStep("code");
            },
            onError: (e: any) => {
                toast.error(e?.response?.data?.message || "Ошибка при отправке кода");
            },
        });
    }

    function handleVerifyOtp(data: CodeForm) {
        verifyOtp.mutate({ email: otpEmail, code: data.code }, {
            onSuccess: (res) => {
                setOtpAccessToken(res.accessToken);
                localStorage.setItem("refreshToken", res.refreshToken);
                localStorage.setItem("user", JSON.stringify(res.user));
                setOtpStep("setpass");
            },
            onError: (e: any) => {
                toast.error(e?.response?.data?.message || "Неверный код");
            },
        });
    }

    function handleSetPassword(data: SetPassForm) {
        localStorage.setItem("accessToken", otpAccessToken);
        setPassword.mutate(data.password, {
            onSuccess: () => {
                toast.success("Пароль установлен");
                router.push("/");
            },
            onError: (e: any) => {
                toast.error(e?.response?.data?.message || "Ошибка при сохранении пароля");
            },
        });
    }

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
                    <p className="text-sm text-muted-foreground mb-5">Введите ваши корпоративные данные</p>

                    <div className="flex rounded-lg border overflow-hidden mb-6">
                        <button type="button" onClick={() => setTab("password")}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium transition-colors ${tab === "password" ? "bg-primary text-white" : "text-muted-foreground hover:bg-accent"}`}>
                            <KeyRound className="h-4 w-4" /> Пароль
                        </button>
                        <button type="button" onClick={() => { setTab("otp"); setOtpStep("email"); }}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium transition-colors ${tab === "otp" ? "bg-primary text-white" : "text-muted-foreground hover:bg-accent"}`}>
                            <Mail className="h-4 w-4" /> Код на email
                        </button>
                    </div>

                    {tab === "password" && (
                        <form onSubmit={passForm.handleSubmit((d) => login(d))} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium block mb-1.5" htmlFor="email">Email</label>
                                <input id="email" type="email" placeholder="i.ivanov@agmk.uz"
                                    {...passForm.register("email")}
                                    className="w-full border rounded-md px-3 h-10 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition" />
                                {passForm.formState.errors.email && <p className="text-xs text-destructive mt-1">{passForm.formState.errors.email.message}</p>}
                            </div>
                            <div>
                                <label className="text-sm font-medium block mb-1.5" htmlFor="password">Пароль</label>
                                <div className="relative">
                                    <input id="password" type={showPass ? "text" : "password"} placeholder="••••••••"
                                        {...passForm.register("password")}
                                        className="w-full border rounded-md px-3 pr-10 h-10 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition" />
                                    <button type="button" onClick={() => setShowPass(!showPass)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                                        {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                                {passForm.formState.errors.password && <p className="text-xs text-destructive mt-1">{passForm.formState.errors.password.message}</p>}
                            </div>
                            <button type="submit" disabled={loginPending}
                                className="w-full bg-primary text-primary-foreground rounded-md h-10 text-sm font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-60">
                                {loginPending ? <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <LogIn className="h-4 w-4" />}
                                {loginPending ? "Входим..." : "Войти"}
                            </button>
                        </form>
                    )}

                    {tab === "otp" && otpStep === "email" && (
                        <form onSubmit={emailForm.handleSubmit(handleSendOtp)} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium block mb-1.5" htmlFor="otp-email">Email</label>
                                <input id="otp-email" type="email" placeholder="i.ivanov@agmk.uz"
                                    {...emailForm.register("email")}
                                    className="w-full border rounded-md px-3 h-10 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition" />
                                {emailForm.formState.errors.email && <p className="text-xs text-destructive mt-1">{emailForm.formState.errors.email.message}</p>}
                            </div>
                            <button type="submit" disabled={sendOtp.isPending}
                                className="w-full bg-primary text-primary-foreground rounded-md h-10 text-sm font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-60">
                                {sendOtp.isPending ? <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <Mail className="h-4 w-4" />}
                                {sendOtp.isPending ? "Отправляем..." : "Получить код"}
                            </button>
                        </form>
                    )}

                    {tab === "otp" && otpStep === "code" && (
                        <form onSubmit={codeForm.handleSubmit(handleVerifyOtp)} className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Код отправлен на <span className="font-medium text-foreground">{otpEmail}</span>
                            </p>
                            <div>
                                <label className="text-sm font-medium block mb-1.5" htmlFor="otp-code">Код из письма</label>
                                <input id="otp-code" type="text" inputMode="numeric" maxLength={6} placeholder="123456"
                                    {...codeForm.register("code")}
                                    className="w-full border rounded-md px-3 h-10 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition tracking-widest text-center font-mono text-lg" />
                                {codeForm.formState.errors.code && <p className="text-xs text-destructive mt-1">{codeForm.formState.errors.code.message}</p>}
                            </div>
                            <button type="submit" disabled={verifyOtp.isPending}
                                className="w-full bg-primary text-primary-foreground rounded-md h-10 text-sm font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-60">
                                {verifyOtp.isPending ? <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <LogIn className="h-4 w-4" />}
                                {verifyOtp.isPending ? "Проверяем..." : "Далее"}
                            </button>
                            <button type="button" onClick={() => { setOtpStep("email"); codeForm.reset(); }}
                                className="w-full text-sm text-muted-foreground hover:text-foreground">
                                ← Изменить email
                            </button>
                        </form>
                    )}

                    {tab === "otp" && otpStep === "setpass" && (
                        <form onSubmit={setPassForm.handleSubmit(handleSetPassword)} className="space-y-4">
                            <p className="text-sm text-muted-foreground">Установите пароль для входа</p>
                            <div>
                                <label className="text-sm font-medium block mb-1.5" htmlFor="new-pass">Пароль</label>
                                <input id="new-pass" type="password" placeholder="Минимум 6 символов"
                                    {...setPassForm.register("password")}
                                    className="w-full border rounded-md px-3 h-10 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition" />
                                {setPassForm.formState.errors.password && <p className="text-xs text-destructive mt-1">{setPassForm.formState.errors.password.message}</p>}
                            </div>
                            <div>
                                <label className="text-sm font-medium block mb-1.5" htmlFor="confirm-pass">Повторите пароль</label>
                                <input id="confirm-pass" type="password" placeholder="••••••••"
                                    {...setPassForm.register("confirm")}
                                    className="w-full border rounded-md px-3 h-10 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition" />
                                {setPassForm.formState.errors.confirm && <p className="text-xs text-destructive mt-1">{setPassForm.formState.errors.confirm.message}</p>}
                            </div>
                            <button type="submit" disabled={setPassword.isPending}
                                className="w-full bg-primary text-primary-foreground rounded-md h-10 text-sm font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-60">
                                {setPassword.isPending ? <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> : <LogIn className="h-4 w-4" />}
                                {setPassword.isPending ? "Сохраняем..." : "Войти"}
                            </button>
                        </form>
                    )}
                </div>

                <p className="text-center text-xs text-muted-foreground mt-4">
                    <Link href="/about" className="hover:underline">← Вернуться на главную</Link>
                </p>
            </div>
        </div>
    );
}
