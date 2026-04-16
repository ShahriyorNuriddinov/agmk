const skills = [
    { label: "Металлургические процессы", value: 95 },
    { label: "Контроль качества", value: 92 },
    { label: "Управление проектами", value: 85 },
    { label: "Анализ данных", value: 80 },
    { label: "Работа в команде", value: 90 },
    { label: "Автоматизация процессов", value: 75 },
];

export function SkillsTab() {
    return (
        <div className="bg-card text-card-foreground rounded-xl border p-6">
            <div className="mb-6">
                <h3 className="font-bold text-base">Профессиональные навыки</h3>
                <p className="text-sm text-blue-600">Оценка компетенций и экспертизы</p>
            </div>
            <div className="space-y-5">
                {skills.map((s) => (
                    <div key={s.label}>
                        <div className="flex items-center justify-between mb-1.5">
                            <span className="text-sm font-medium">{s.label}</span>
                            <span className="text-sm text-muted-foreground">{s.value}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                            <div
                                className="bg-blue-700 h-2 rounded-full transition-all"
                                style={{ width: `${s.value}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
