import { Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const emergencyNumbers = [
    { name: "Единая служба экстренного реагирования", desc: "Пожарная служба, спасательная служба", phone: "101" },
    { name: "Полиция", desc: "Служба общественной безопасности", phone: "102" },
    { name: "Скорая медицинская помощь", desc: "Экстренная медицинская помощь", phone: "103" },
    { name: "Аварийная газовая служба", desc: "Утечка газа, аварии газопровода", phone: "104" },
    { name: "Медсанчасть АГМК", desc: "Корпоративная медицинская служба", phone: "+998 69 233-91-03" },
    { name: "Служба безопасности АГМК", desc: "Внутренняя служба безопасности", phone: "+998 69 233-70-01" },
    { name: "Диспетчерская АГМК", desc: "Координация производственных процессов", phone: "+998 69 233-10-99" },
];

const internalNumbers = {
    "Производство": [
        { label: "Диспетчерская", ext: "1099" },
        { label: "Завод ТЦМ", ext: "2001" },
        { label: "Кальмакир", ext: "3001" },
    ],
    "Администрация": [
        { label: "Приемная", ext: "1000" },
        { label: "HR департамент", ext: "5001" },
        { label: "Финансы", ext: "4001" },
    ],
    "Службы": [
        { label: "IT поддержка", ext: "6001" },
        { label: "Безопасность", ext: "7001" },
        { label: "Медсанчасть", ext: "9103" },
    ],
};

export function EmergencyTab() {
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <Phone className="h-5 w-5 text-red-600" aria-hidden />
                        <span>Экстренные и важные номера</span>
                    </CardTitle>
                    <CardDescription>Телефоны служб экстренного реагирования и важных служб АГМК</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                        {emergencyNumbers.map((c) => (
                            <Card key={c.name} className="transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
                                <CardContent className="p-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h4 className="font-semibold">{c.name}</h4>
                                            <p className="text-sm text-muted-foreground mt-1">{c.desc}</p>
                                        </div>
                                        <div className="flex items-center space-x-2 ml-4">
                                            <Phone className="h-4 w-4 text-red-600" aria-hidden />
                                            <span className="font-mono font-bold text-lg">{c.phone}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Важные внутренние номера</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                        {Object.entries(internalNumbers).map(([group, items]) => (
                            <div key={group} className="space-y-2">
                                <h4 className="font-medium">{group}</h4>
                                <div className="space-y-1 text-sm">
                                    {items.map((item) => (
                                        <div key={item.label} className="flex justify-between">
                                            <span>{item.label}</span>
                                            <span className="font-mono">{item.ext}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
