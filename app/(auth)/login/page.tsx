// ============================================
// LOGIN SAHIFASI - Kirish formasi
// ============================================
"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Building2, Eye, EyeOff, LogIn, Mail, KeyRound } from "lucide-react";
import { useState } from "react";
import { useLogin } from "@/hooks/useLogin";
import axios from "axios";
import { useRouter } from "next/navigation";

// Backend API manzili
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// ============================================
// VALIDATSIYA SXEMALARI (Zod)
// ============================================

// Parol bilan kirish uchun
const passSchema = z.object({
    email: z.string().email("Некорректный email"),
    password: z.string().min(1, "Введите пароль"),
});
type PassForm = z.infer<typeof passSchema>;

// OTP - email kiritish uchun
const emailSchema = z.object({
    email: z.string().email("Некорректный email"),
});
type EmailForm = z.infer<typeof emailSchema>;

// OTP - kod kiritish uchun
const codeSchema = z.object({
    code: z.string().length(6, "Код должен быть 6 цифр"),
});
type CodeForm = z.infer<typeof codeSchema>;

// ============================================
// ASOSIY KOMPONENT
// ============================================
export default function LoginPage() {
    // ============================================
    // STATE (Holat) - Ma'lumotlarni saqlash
    // ============================================
    const [tab, setTab] = useState<"password" | "otp">("password"); // Qaysi tab ochiq
    const [showPass, setShowPass] = useState(false); // Parolni ko'rsatish/yashirish
    const [otpStep, setOtpStep] = useState<"email" | "code">("email"); // OTP qadami (email yoki kod)
    const [otpEmail, setOtpEmail] = useState(""); // Kiritilgan email
    const [otpLoading, setOtpLoading] = useState(false); // Yuklanish holati
    const [otpError, setOtpError] = useState(""); // Xato xabari

    const { mutate, isPending } = useLogin(); // Parol bilan kirish hook
    const router = useRouter(); // Sahifalar o'rtasida o'tish

    // ============================================
    // FORMALAR - Har bir tab uchun alohida
    // ============================================
    const passForm = useForm<PassForm>({ resolver: zodResolver(passSchema) });
    const emailForm = useForm<EmailForm>({ resolver: zodResolver(emailSchema) });
    const codeForm = useForm<CodeForm>({ resolver: zodResolver(codeSchema) });

    // ============================================
    // FUNKSIYA 1: OTP kod yuborish
    // ============================================
    async function sendOtp(data: EmailForm) {
        setOtpLoading(true); // Yuklanish boshlanadi
        setOtpError(""); // Xatoni tozalash

        try {
            // Backend ga email yuborish
            await axios.post(`${API}/auth/send-otp`, { email: data.email });

            // Muvaffaqiyatli bo'lsa - kod kiritish qadamiga o'tish
            setOtpEmail(data.email);
            setOtpStep("code");
        } catch (e: unknown) {
            // Xato bo'lsa - xabarni ko'rsatish
            const msg = axios.isAxiosError(e) ? e.response?.data?.message : "Ошибка";
            setOtpError(msg || "Ошибка при отправке кода");
        } finally {
            setOtpLoading(false); // Yuklanish tugadi
        }
    }

    // ============================================
    // FUNKSIYA 2: OTP kodni tekshirish
    // ============================================
    async function verifyOtp(data: CodeForm) {
        setOtpLoading(true);
        setOtpError("");

        try {
            // Backend ga email va kodni yuborish
            const res = await axios.post(`${API}/auth/verify-otp`, {
                email: otpEmail,
                code: data.code
            });

            // Javobdan tokenlarni olish
            const { accessToken, refreshToken, user } = res.data;

            // Tokenlarni localStorage ga saqlash
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            localStorage.setItem("user", JSON.stringify(user));

            // Bosh sahifaga o'tish
            router.push("/");
        } catch (e: unknown) {
            // Xato bo'lsa - xabarni ko'rsatish
            const msg = axios.isAxiosError(e) ? e.response?.data?.message : "Ошибка";
            setOtpError(msg || "Неверный код");
        } finally {
            setOtpLoading(false);
        }
    }

    // ============================================
    // RENDER - Sahifani chizish
    // ============================================
    return (
        <div className="min-h-screen bg-accent/30 flex items-center justify-center p-4">
            <div className="w-full max-w-md">

                {/* Logo */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center space-x-3">
                        <Building2 className="h-10 w-10 text-primary" aria-hidden />
                        <div className="text-left">
                            <p className="text-xl font-bold text-primary">АГМК</p>
                            <p className="text-xs text-muted-foreground">Корпоративный портал</p>
                        </div>
                    </Link>
                </div>

                {/* Asosiy karta */}
                <div className="bg-white rounded-xl border shadow-sm p-8">
                    <h2 className="text-2xl font-bold mb-1">Вход</h2>
                    <p className="text-sm text-muted-foreground mb-5">Введите ваши корпоративные данные</p>

                    {/* ============================================ */}
                    {/* TABLAR - Parol yoki OTP tanlash */}
                    {/* ============================================ */}
                    <div className="flex rounded-lg border overflow-hidden mb-6">
                        {/* Parol tab */}
                        <button
                            type="button"
                            onClick={() => setTab("password")}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium transition-colors ${tab === "password"
                                    ? "bg-primary text-white"
                                    : "text-muted-foreground hover:bg-accent"
                                }`}
                        >
                            <KeyRound className="h-4 w-4" />
                            Пароль
                        </button>

                        {/* OTP tab */}
                        <button
                            type="button"
                            onClick={() => {
                                setTab("otp");
                                setOtpStep("email");
                                setOtpError("");
                            }}
                            className={`flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium transition-colors ${tab === "otp"
                                    ? "bg-primary text-white"
                                    : "text-muted-foreground hover:bg-accent"
                                }`}
                        >
                            <Mail className="h-4 w-4" />
                            Код на email
                        </button>
                    </div>

                    {/* ============================================ */}
                    {/* PAROL BILAN KIRISH FORMASI */}
                    {/* ============================================ */}
                    {tab === "password" && (
                        <form onSubmit={passForm.handleSubmit((d) => mutate(d))} className="space-y-4">
                            {/* Email input */}
                            <div>
                                <label className="text-sm font-medium block mb-1.5" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    placeholder="i.ivanov@agmk.uz"
                                    {...passForm.register("email")}
                                    className="w-full border rounded-md px-3 h-10 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                                />
                                {passForm.formState.errors.email && (
                                    <p className="text-xs text-destructive mt-1">
                                        {passForm.formState.errors.email.message}
                                    </p>
                                )}
                            </div>

                            {/* Parol input */}
                            <div>
                                <label className="text-sm font-medium block mb-1.5" htmlFor="password">
                                    Пароль
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPass ? "text" : "password"}
                                        placeholder="••••••••"
                                        {...passForm.register("password")}
                                        className="w-full border rounded-md px-3 pr-10 h-10 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                                    />
                                    {/* Ko'z tugmasi - parolni ko'rsatish/yashirish */}
                                    <button
                                        type="button"
                                        onClick={() => setShowPass(!showPass)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                                {passForm.formState.errors.password && (
                                    <p className="text-xs text-destructive mt-1">
                                        {passForm.formState.errors.password.message}
                                    </p>
                                )}
                            </div>

                            {/* Kirish tugmasi */}
                            <button
                                type="submit"
                                disabled={isPending}
                                className="w-full bg-primary text-primary-foreground rounded-md h-10 text-sm font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-60"
                            >
                                {isPending
                                    ? <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                    : <LogIn className="h-4 w-4" />
                                }
                                {isPending ? "Входим..." : "Войти"}
                            </button>
                        </form>
                    )}

                    {/* ============================================ */}
                    {/* OTP - EMAIL KIRITISH FORMASI */}
                    {/* ============================================ */}
                    {tab === "otp" && otpStep === "email" && (
                        <form onSubmit={emailForm.handleSubmit(sendOtp)} className="space-y-4">
                            <div>
                                <label className="text-sm font-medium block mb-1.5" htmlFor="otp-email">
                                    Email
                                </label>
                                <input
                                    id="otp-email"
                                    type="email"
                                    placeholder="i.ivanov@agmk.uz"
                                    {...emailForm.register("email")}
                                    className="w-full border rounded-md px-3 h-10 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
                                />
                                {emailForm.formState.errors.email && (
                                    <p className="text-xs text-destructive mt-1">
                                        {emailForm.formState.errors.email.message}
                                    </p>
                                )}
                            </div>

                            {/* Xato xabari */}
                            {otpError && <p className="text-xs text-destructive">{otpError}</p>}

                            {/* Kod olish tugmasi */}
                            <button
                                type="submit"
                                disabled={otpLoading}
                                className="w-full bg-primary text-primary-foreground rounded-md h-10 text-sm font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-60"
                            >
                                {otpLoading
                                    ? <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                    : <Mail className="h-4 w-4" />
                                }
                                {otpLoading ? "Отправляем..." : "Получить код"}
                            </button>
                        </form>
                    )}

                    {/* ============================================ */}
                    {/* OTP - KOD KIRITISH FORMASI */}
                    {/* ============================================ */}
                    {tab === "otp" && otpStep === "code" && (
                        <form onSubmit={codeForm.handleSubmit(verifyOtp)} className="space-y-4">
                            {/* Email ko'rsatish */}
                            <p className="text-sm text-muted-foreground">
                                Код отправлен на <span className="font-medium text-foreground">{otpEmail}</span>
                            </p>

                            {/* Kod input */}
                            <div>
                                <label className="text-sm font-medium block mb-1.5" htmlFor="otp-code">
                                    Код из письма
                                </label>
                                <input
                                    id="otp-code"
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={6}
                                    placeholder="123456"
                                    {...codeForm.register("code")}
                                    className="w-full border rounded-md px-3 h-10 text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition tracking-widest text-center font-mono text-lg"
                                />
                                {codeForm.formState.errors.code && (
                                    <p className="text-xs text-destructive mt-1">
                                        {codeForm.formState.errors.code.message}
                                    </p>
                                )}
                            </div>

                            {/* Xato xabari */}
                            {otpError && <p className="text-xs text-destructive">{otpError}</p>}

                            {/* Kirish tugmasi */}
                            <button
                                type="submit"
                                disabled={otpLoading}
                                className="w-full bg-primary text-primary-foreground rounded-md h-10 text-sm font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-60"
                            >
                                {otpLoading
                                    ? <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                    : <LogIn className="h-4 w-4" />
                                }
                                {otpLoading ? "Проверяем..." : "Войти"}
                            </button>

                            {/* Orqaga qaytish tugmasi */}
                            <button
                                type="button"
                                onClick={() => {
                                    setOtpStep("email");
                                    setOtpError("");
                                    codeForm.reset();
                                }}
                                className="w-full text-sm text-muted-foreground hover:text-foreground"
                            >
                                ← Изменить email
                            </button>
                        </form>
                    )}
                </div>

                {/* Bosh sahifaga qaytish */}
                <p className="text-center text-xs text-muted-foreground mt-4">
                    <Link href="/about" className="hover:underline">← Вернуться на главную</Link>
                </p>
            </div>
        </div>
    );
}
