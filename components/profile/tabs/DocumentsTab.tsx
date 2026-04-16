import { FileText } from "lucide-react";

const docs = [
    {
        title: "Сертификат по промышленной безопасности",
        org: "Госгортехнадзор РУз",
        date: "Действителен до: 15.03.2026",
        badge: "Активен",
        badgeCls: "bg-blue-600 text-white",
    },
    {
        title: "Специалист по качеству металлургической продукции",
        org: "АГМК",
        date: "Получен: 10.07.2025",
        badge: "Активен",
        badgeCls: "bg-blue-600 text-white",
    },
    {
        title: 'Курс повышения квалификации "Современные технологии"',
        org: "Корпоративный университет АГМК",
        date: "Завершен: 20.07.2025",
        badge: "Завершен",
        badgeCls: "bg-slate-100 text-slate-600 border border-slate-200",
    },
];

export function DocumentsTab() {
    return (
        <div className="bg-card text-card-foreground rounded-xl border p-6">
            <div className="flex items-center gap-2 mb-6">
                <FileText className="h-5 w-5 text-slate-500" />
                <h3 className="font-semibold text-base">Сертификаты и документы</h3>
            </div>
            <div className="space-y-3">
                {docs.map((d, i) => (
                    <div key={i} className="border rounded-xl p-4 flex items-start justify-between gap-4">
                        <div>
                            <p className="font-semibold text-sm">{d.title}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{d.org}</p>
                            <p className="text-xs text-muted-foreground">{d.date}</p>
                        </div>
                        <span className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold shrink-0 ${d.badgeCls}`}>
                            {d.badge}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
