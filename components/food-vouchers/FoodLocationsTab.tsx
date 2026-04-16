import { Building, Clock, CreditCard } from "lucide-react";

type Location = {
    name: string;
    rating: number;
    address: string;
    hours: string;
    capacity: string;
    services: string[];
};

const locations: Location[] = [
    { name: "Столовая №1", rating: 4.5, address: "Корпус А, 1 этаж", hours: "07:00 - 19:00", capacity: "200 мест", services: ["ЛПП", "Обеды"] },
    { name: "Столовая №2", rating: 4.3, address: "Корпус Б, 2 этаж", hours: "07:30 - 18:30", capacity: "150 мест", services: ["ЛПП", "Банкеты"] },
    { name: "Буфет", rating: 4.2, address: "Корпус В, 1 этаж", hours: "08:00 - 17:00", capacity: "50 мест", services: ["БП", "Кофе-брейк"] },
    { name: 'Кафе "Металлург"', rating: 4.6, address: "Административное здание", hours: "08:30 - 17:30", capacity: "80 мест", services: ["БП", "Бизнес-ланч"] },
];

function Stars({ rating }: { rating: number }) {
    const full = Math.floor(rating);
    return (
        <div className="flex items-center space-x-1">
            <div className="flex">
                {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className={`w-4 h-4 ${i <= full ? "text-yellow-400" : "text-gray-300"}`}>★</div>
                ))}
            </div>
            <span className="text-sm text-muted-foreground">{rating}</span>
        </div>
    );
}

export function FoodLocationsTab() {
    return (
        <div className="grid md:grid-cols-2 gap-6">
            {locations.map((loc, i) => (
                <div key={i} className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
                    <div className="px-6 pt-6">
                        <h4 className="leading-none font-semibold text-base flex items-center justify-between">
                            <span>{loc.name}</span>
                            <Stars rating={loc.rating} />
                        </h4>
                        <p className="text-muted-foreground flex items-center space-x-1 text-sm mt-1">
                            <Building className="h-4 w-4" aria-hidden />
                            <span>{loc.address}</span>
                        </p>
                    </div>
                    <div className="px-6 pb-6 -mt-2 space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <div className="flex items-center space-x-2">
                                    <Clock className="h-4 w-4 text-muted-foreground" aria-hidden />
                                    <span className="font-medium">Режим работы:</span>
                                </div>
                                <p className="ml-6">{loc.hours}</p>
                            </div>
                            <div>
                                <div className="flex items-center space-x-2">
                                    <CreditCard className="h-4 w-4 text-muted-foreground" aria-hidden />
                                    <span className="font-medium">Вместимость:</span>
                                </div>
                                <p className="ml-6">{loc.capacity}</p>
                            </div>
                        </div>
                        <div>
                            <h4 className="font-medium text-sm mb-2">Услуги:</h4>
                            <div className="flex flex-wrap gap-2">
                                {loc.services.map(s => (
                                    <span key={s} className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground border-transparent">
                                        {s}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
