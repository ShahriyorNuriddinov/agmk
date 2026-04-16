"use client";
import Link from "next/link";
import {
    Building2, LogIn, Menu, Users, Award, TrendingUp,
    Building, Leaf, Factory, ArrowRight, Calendar,
    MapPin, Phone, Mail, Milk,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
    { label: "О компании", href: "#about" },
    { label: "Продукция", href: "#products" },
    { label: "Новости", href: "#news" },
    { label: "Вакансии", href: "#careers" },
    { label: "Контакты", href: "#contacts" },
];

export default function PublicPortal() {
    return (
        <div className="min-h-screen bg-background">
            <header className="border-b bg-white sticky top-0 z-50">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-3">
                            <Building2 className="h-8 w-8 text-primary" aria-hidden />
                            <div>
                                <h1 className="text-xl font-bold text-primary">АГМК</h1>
                                <p className="text-xs text-muted-foreground">Корпоративный портал</p>
                            </div>
                        </div>
                        <nav className="hidden lg:flex items-center space-x-6">
                            {navLinks.map(({ label, href }) => (
                                <a key={label} href={href} className="text-sm hover:text-primary transition-colors">
                                    {label}
                                </a>
                            ))}
                        </nav>
                        <div className="hidden lg:flex items-center space-x-3">
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                <Phone className="h-4 w-4" aria-hidden />
                                <span>+998 (69) 233-XX-XX</span>
                            </div>
                            <Button variant="outline" size="sm" asChild>
                                <Link href="/login" className="flex items-center space-x-2">
                                    <LogIn className="h-4 w-4" aria-hidden />
                                    <span>Вход для сотрудников</span>
                                </Link>
                            </Button>
                        </div>
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="lg:hidden">
                                    <Menu className="h-5 w-5" aria-hidden />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-64">
                                <div className="flex flex-col gap-4 mt-8">
                                    {navLinks.map(({ label, href }) => (
                                        <a key={label} href={href} className="text-sm font-medium hover:text-primary transition-colors py-1">
                                            {label}
                                        </a>
                                    ))}
                                    <Button asChild className="mt-4">
                                        <Link href="/login">
                                            <LogIn className="h-4 w-4 mr-2" aria-hidden />
                                            Вход для сотрудников
                                        </Link>
                                    </Button>
                                </div>
                            </SheetContent>
                        </Sheet>

                    </div>
                </div>
            </header>
            <section className="relative bg-gradient-to-r from-primary to-primary/80 text-white py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Алмалыкский горно-металлургический комбинат
                        </h1>
                        <p className="text-xl md:text-2xl mb-8 opacity-90">
                            Ведущее предприятие цветной металлургии Узбекистана с 60-летней историей
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 mb-8">
                            {[
                                { icon: Users, text: "36,000 сотрудников" },
                                { icon: Award, text: "60+ лет опыта" },
                                { icon: TrendingUp, text: "Лидер отрасли" },
                            ].map(({ icon: Icon, text }) => (
                                <span key={text} className="inline-flex items-center bg-secondary text-secondary-foreground rounded-md px-4 py-2 text-lg font-medium">
                                    <Icon className="h-5 w-5 mr-2" aria-hidden />
                                    {text}
                                </span>
                            ))}
                        </div>
                        <Link
                            href="/login"
                            className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 font-medium rounded-lg px-6 py-3 text-base transition-colors"
                        >
                            <LogIn className="h-5 w-5" aria-hidden />
                            Войти в корпоративный портал
                        </Link>
                    </div>
                </div>
            </section>
            <section id="about" className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">О компании</h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            АГМК — крупнейший производитель цветных металлов в Центральной Азии, объединяющий добычу, переработку и производство готовой продукции
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Building, title: "Миссия", text: "Обеспечение устойчивого развития горно-металлургической отрасли Узбекистана через инновации и высокие стандарты качества" },
                            { icon: Leaf, title: "Экология", text: "Внедрение современных технологий для минимизации воздействия на окружающую среду и устойчивого развития" },
                            { icon: Users, title: "Социальная ответственность", text: "Инвестиции в развитие регионов, поддержка образования, здравоохранения и культуры" },
                        ].map(({ icon: Icon, title, text }) => (
                            <div key={title} className="rounded-xl border bg-card flex flex-col gap-6 p-6">
                                <Icon className="h-12 w-12 text-primary mb-4" aria-hidden />
                                <h4 className="font-semibold leading-none">{title}</h4>
                                <p className="text-muted-foreground text-sm">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section id="products" className="py-20 bg-accent/50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Наша продукция</h2>
                        <p className="text-xl text-muted-foreground">
                            Полный цикл производства от добычи сырья до готовой продукции
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        {[
                            {
                                icon: Factory,
                                title: "Металлургическая продукция",
                                img: "https://images.unsplash.com/photo-1757266705977-3a935db2a99d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
                                alt: "Металлургическая продукция",
                                tags: ["Медь катодная", "Цинк в чушках", "Золото", "Серебро", "Свинец", "Кадмий"],
                            },
                            {
                                icon: Milk,
                                title: "Потребительские товары (УППТ)",
                                img: "https://images.unsplash.com/photo-1635714293982-65445548ac42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
                                alt: "Потребительские товары (УППТ)",
                                tags: ["Молоко", "Молочные продукты", "Картофель", "Лук", "Овощи", "Мясные изделия"],
                            },
                        ].map(({ icon: Icon, title, img, alt, tags }) => (
                            <div key={title} className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border overflow-hidden">
                                {/* Image */}
                                <div className="h-48 overflow-hidden">
                                    <img src={img} alt={alt} className="w-full h-full object-cover" />
                                </div>
                                {/* Card Header */}
                                <div className="px-6 pt-0">
                                    <div className="flex items-center space-x-3">
                                        <Icon className="h-6 w-6" aria-hidden />
                                        <h4 className="font-semibold leading-none">{title}</h4>
                                    </div>
                                </div>
                                <div className="px-6 pb-6 flex flex-col gap-4">
                                    <div className="flex flex-wrap gap-2">
                                        {tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium text-foreground whitespace-nowrap"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <Button className="w-full mt-4">
                                        Подробнее о продукции
                                        <ArrowRight className="h-4 w-4 ml-2" aria-hidden />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section id="news" className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Новости и события</h2>
                        <p className="text-xl text-muted-foreground">Последние новости о деятельности компании</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            { date: "25 сентября 2025", title: "АГМК увеличивает производство меди на 15%", desc: "В рамках модернизации производства планируется увеличение мощностей..." },
                            { date: "20 сентября 2025", title: "Новые экологические инициативы компании", desc: "АГМК запускает программу по снижению углеродного следа..." },
                            { date: "15 сентября 2025", title: "Открытие нового учебного центра для сотрудников", desc: "Современный образовательный комплекс оснащен новейшим оборудованием..." },
                        ].map(({ date, title, desc }) => (
                            <div key={title} className="rounded-xl border bg-card flex flex-col gap-6 p-6">
                                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                                    <Calendar className="h-4 w-4" aria-hidden />
                                    <span>{date}</span>
                                </div>
                                <h4 className="font-semibold leading-none line-clamp-2">{title}</h4>
                                <p className="text-muted-foreground text-sm flex-1">{desc}</p>
                                <Button variant="outline" size="sm" className="self-start">
                                    Читать полностью
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section id="careers" className="py-20 bg-accent/50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Карьера в АГМК</h2>
                        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                            Присоединяйтесь к команде профессионалов и развивайтесь вместе с нами
                        </p>
                    </div>
                    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
                        <div className="rounded-xl border bg-card flex flex-col gap-6 p-6">
                            <h4 className="font-semibold leading-none">Почему выбирают АГМК?</h4>
                            <div className="space-y-3">
                                {["Стабильная заработная плата", "Социальный пакет", "Корпоративное обучение", "Карьерный рост", "Санаторно-курортное лечение"].map((item) => (
                                    <div key={item} className="flex items-center space-x-3">
                                        <span className="bg-primary text-primary-foreground rounded-md px-2 py-0.5 text-xs font-medium shrink-0">✓</span>
                                        <span className="text-sm">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="rounded-xl border bg-card flex flex-col gap-6 p-6">
                            <h4 className="font-semibold leading-none">Актуальные вакансии</h4>
                            <div className="space-y-3">
                                {[
                                    { title: "Инженер-металлург", dept: "Производственный отдел" },
                                    { title: "Специалист по качеству", dept: "Лаборатория" },
                                    { title: "IT-специалист", dept: "Информационные технологии" },
                                ].map(({ title, dept }) => (
                                    <div key={title} className="border-l-4 border-primary pl-4">
                                        <p className="font-medium text-sm">{title}</p>
                                        <p className="text-xs text-muted-foreground">{dept}</p>
                                    </div>
                                ))}
                            </div>
                            <Button className="w-full mt-4">Все вакансии</Button>
                        </div>
                    </div>
                </div>
            </section>
            <section id="contacts" className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">Контакты</h2>
                        <p className="text-xl text-muted-foreground">
                            Свяжитесь с нами для получения дополнительной информации
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                        {[
                            { icon: MapPin, title: "Адрес", lines: ["г. Алмалык, Ташкентская область", "Республика Узбекистан", "111117"] },
                            { icon: Phone, title: "Телефон", lines: ["Приемная: +998 (69) 233-XX-XX", "Отдел кадров: +998 (69) 233-XX-XX", "Справочная: +998 (69) 233-XX-XX"] },
                            { icon: Mail, title: "Email", lines: ["info@agmk.uz", "hr@agmk.uz", "sales@agmk.uz"] },
                        ].map(({ icon: Icon, title, lines }) => (
                            <div key={title} className="rounded-xl border bg-card flex flex-col gap-6 p-6">
                                <Icon className="h-8 w-8 text-primary mb-2" aria-hidden />
                                <h4 className="font-semibold leading-none">{title}</h4>
                                {lines.map((line) => (
                                    <p key={line} className="text-sm text-muted-foreground">{line}</p>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
