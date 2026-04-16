const benefits = [
    { title: "Медицинская страховка", sub: "Включена", badge: "Активно", badgeCls: "bg-blue-600 text-white border-transparent" },
    { title: "Санаторно-курортное лечение", sub: "1 раз в год", badge: "Доступно", badgeCls: "bg-secondary text-secondary-foreground border-transparent" },
    { title: "Детские сады АГМК", sub: "2 места", badge: "Используется", badgeCls: "text-foreground border" },
    { title: "Корпоративное питание", sub: "Субсидируется 70%", badge: "Активно", badgeCls: "bg-blue-600 text-white border-transparent" },
    { title: "Транспортные расходы", sub: "50,000 сум/мес", badge: "Активно", badgeCls: "bg-blue-600 text-white border-transparent" },
];

export function SalaryBenefits() {
    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
            <div className="px-6 pt-6">
                <h4 className="leading-none font-semibold text-base">Социальные льготы и компенсации</h4>
                <p className="text-sm text-muted-foreground mt-1">Доступные льготы и их использование</p>
            </div>
            <div className="px-6 pb-6 -mt-2">
                <div className="grid gap-4">
                    {benefits.map((b, i) => (
                        <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                                <h4 className="font-medium">{b.title}</h4>
                                <p className="text-sm text-muted-foreground">{b.sub}</p>
                            </div>
                            <span className={`inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium shrink-0 ${b.badgeCls}`}>
                                {b.badge}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
