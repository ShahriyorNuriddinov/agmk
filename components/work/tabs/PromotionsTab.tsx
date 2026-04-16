import { TrendingUp } from "lucide-react";

const promotions = [
    {
        date: "15.03.2018",
        from: "Инженер-металлург II категории",
        to: "Ведущий инженер-металлург",
        reason: "За высокие производственные показатели",
        approved: "Директор завода Раимов А.К.",
        salary: "+3,300,000 сум",
    },
    {
        date: "20.08.2014",
        from: "Инженер-металлург",
        to: "Инженер-металлург II категории",
        reason: "За профессиональный рост",
        approved: "Зам. директора Петров П.П.",
        salary: "+1,400,000 сум",
    },
    {
        date: "10.06.2012",
        from: "Стажер-металлург",
        to: "Инженер-металлург",
        reason: "Успешное завершение стажировки",
        approved: "Начальник отдела кадров Сидорова А.И.",
        salary: "+1,700,000 сум",
    },
];

export function PromotionsTab() {
    return (
        <div className="bg-card text-card-foreground rounded-xl border p-6">
            <div className="mb-6">
                <h4 className="font-semibold text-base">История повышений</h4>
                <p className="text-sm text-muted-foreground">Карьерный рост и повышение в должности</p>
            </div>
            <div className="space-y-4">
                {promotions.map((p, i) => (
                    <div key={i} className="border rounded-xl p-4">
                        <div className="flex items-start justify-between gap-4 mb-3">
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <TrendingUp className="h-4 w-4 text-green-500" />
                                    <span className="font-semibold text-sm">Повышение от {p.date}</span>
                                </div>
                                <p className="text-sm text-blue-600">{p.from} — {p.to}</p>
                            </div>
                            <span className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium text-green-600 border-green-200 bg-green-50 shrink-0">
                                {p.salary}
                            </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="font-semibold text-xs mb-0.5">Основание:</p>
                                <p className="text-muted-foreground">{p.reason}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-xs mb-0.5">Утверждено:</p>
                                <p className="text-muted-foreground">{p.approved}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
