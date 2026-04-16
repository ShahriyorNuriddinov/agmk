"use client";

import { useState } from "react";
import { Star, Search } from "lucide-react";

type AvailableCourse = {
    title: string;
    category: string;
    description: string;
    teacher: string;
    hours: string;
    difficulty: "Начальный" | "Средний" | "Продвинутый";
    students: number;
    rating: number;
};

const courses: AvailableCourse[] = [
    {
        title: "Цифровые технологии в металлургии",
        category: "Инновации",
        description: "Изучение современных цифровых решений для оптимизации производственных процессов",
        teacher: "Козлов Д.В.", hours: "18 часов",
        difficulty: "Средний", students: 45, rating: 4.7,
    },
    {
        title: "Лидерство и управление командой",
        category: "Менеджмент",
        description: "Развитие лидерских навыков и эффективного управления производственными командами",
        teacher: "Новикова А.М.", hours: "16 часов",
        difficulty: "Продвинутый", students: 32, rating: 4.8,
    },
    {
        title: "Анализ больших данных в производстве",
        category: "IT и аналитика",
        description: "Методы сбора, обработки и анализа производственных данных для принятия решений",
        teacher: "Волков С.Р.", hours: "22 часа",
        difficulty: "Продвинутый", students: 28, rating: 4.6,
    },
    {
        title: "Основы проектного управления",
        category: "Менеджмент",
        description: "Принципы и инструменты управления проектами в промышленной среде",
        teacher: "Захарова Е.В.", hours: "20 часов",
        difficulty: "Начальный", students: 61, rating: 4.5,
    },
    {
        title: "Энергоэффективность на производстве",
        category: "Экология",
        description: "Методы снижения энергопотребления и повышения эффективности производства",
        teacher: "Тимофеев А.Н.", hours: "14 часов",
        difficulty: "Средний", students: 39, rating: 4.7,
    },
    {
        title: "Коммуникации и переговоры",
        category: "Soft Skills",
        description: "Развитие навыков деловой коммуникации и проведения переговоров",
        teacher: "Белова И.С.", hours: "12 часов",
        difficulty: "Начальный", students: 54, rating: 4.4,
    },
];

const difficultyColor: Record<string, string> = {
    "Начальный": "text-green-600",
    "Средний": "text-yellow-600",
    "Продвинутый": "text-red-500",
};

export function AvailableCoursesTab() {
    const [search, setSearch] = useState("");

    const filtered = courses.filter(c =>
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.category.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h4 className="font-semibold text-base">Доступные курсы</h4>
                    <p className="text-sm text-muted-foreground">Каталог курсов для профессионального развития</p>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Поиск курсов..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="pl-9 pr-4 h-9 rounded-md border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring w-56"
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
                {filtered.map((c, i) => (
                    <div key={i} className="bg-card border rounded-xl p-5 flex flex-col gap-3">
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">{c.category}</p>
                            <h4 className="font-semibold leading-snug">{c.title}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{c.description}</p>
                        </div>
                        <div className="text-sm space-y-1">
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Преподаватель:</span>
                                <span className="font-medium">{c.teacher}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Продолжительность:</span>
                                <span className="font-medium">{c.hours}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Сложность:</span>
                                <span className={`font-medium ${difficultyColor[c.difficulty]}`}>{c.difficulty}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-muted-foreground">Студентов:</span>
                                <span className="font-medium">{c.students}</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-auto pt-1">
                            <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="text-sm font-medium">{c.rating}</span>
                            </div>
                            <button className="inline-flex items-center justify-center text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white h-8 rounded-md px-4 transition-colors">
                                Записаться
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
