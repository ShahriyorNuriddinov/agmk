import { MapPin, Users, Calendar, Wifi, Car, Utensils, Hotel, Star, Waves, Sun, Mountain, Eye, Dumbbell, Droplets, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const amenityIcons: Record<string, React.ReactNode> = {
    "Wi-Fi": <Wifi className="h-4 w-4" />,
    "Парковка": <Car className="h-4 w-4" />,
    "Ресторан": <Utensils className="h-4 w-4" />,
    "Кафе": <Utensils className="h-4 w-4" />,
    "Столовая": <Utensils className="h-4 w-4" />,
    "Лыжная база": <Mountain className="h-4 w-4" />,
    "Минеральные ванны": <Waves className="h-4 w-4" />,
    "Канатная дорога": <Hotel className="h-4 w-4" />,
    "Бассейн": <Droplets className="h-4 w-4" />,
    "Медкабинет": <Building2 className="h-4 w-4" />,
    "Спортзал": <Dumbbell className="h-4 w-4" />,
};

const typeIcons: Record<string, React.ReactNode> = {
    waves: <Waves className="h-8 w-8" />,
    sun: <Sun className="h-8 w-8" />,
    mountain: <Mountain className="h-8 w-8" />,
    building: <Building2 className="h-8 w-8" />,
};

export type Sanatorium = {
    name: string;
    location: string;
    description: string;
    icon: "waves" | "sun" | "mountain" | "building";
    rating: number;
    freeSlots: string;
    season: string;
    specializations: string[];
    amenities: string[];
    price: string;
    priceNote: string;
};

export function SanatoriumCard({ s, onApply }: { s: Sanatorium; onApply: () => void }) {
    const visibleAmenities = s.amenities.slice(0, 4);
    const extraCount = s.amenities.length - 4;

    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border overflow-hidden">
            <div className="px-6 pt-6">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <h4 className="text-lg font-semibold">{s.name}</h4>
                        <p className="text-muted-foreground flex items-center space-x-1 text-sm mt-0.5">
                            <MapPin className="h-4 w-4" aria-hidden />
                            <span>{s.location}</span>
                        </p>
                    </div>
                    <div className="flex items-center space-x-2">
                        {typeIcons[s.icon]}
                        <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" aria-hidden />
                            <span className="text-sm font-medium">{s.rating}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-6 pb-6 -mt-2 space-y-4">
                <p className="text-sm">{s.description}</p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-muted-foreground" aria-hidden />
                            <span className="font-medium">Свободно мест:</span>
                        </div>
                        <p className="ml-6 text-yellow-600">{s.freeSlots}</p>
                    </div>
                    <div>
                        <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" aria-hidden />
                            <span className="font-medium">Сезон:</span>
                        </div>
                        <p className="ml-6">{s.season}</p>
                    </div>
                </div>

                <div>
                    <h4 className="font-medium text-sm mb-2">Специализация:</h4>
                    <div className="space-y-1">
                        {s.specializations.slice(0, 2).map(sp => (
                            <div key={sp} className="text-xs text-muted-foreground">• {sp}</div>
                        ))}
                        {s.specializations.length > 2 && (
                            <div className="text-xs text-muted-foreground">и еще {s.specializations.length - 2}...</div>
                        )}
                    </div>
                </div>

                <div>
                    <h4 className="font-medium text-sm mb-2">Удобства:</h4>
                    <div className="flex flex-wrap gap-2">
                        {visibleAmenities.map(a => (
                            <div key={a} className="flex items-center space-x-1 text-xs bg-accent px-2 py-1 rounded">
                                {amenityIcons[a] ?? <Hotel className="h-4 w-4" />}
                                <span>{a}</span>
                            </div>
                        ))}
                        {extraCount > 0 && (
                            <div className="text-xs bg-accent px-2 py-1 rounded">+{extraCount}</div>
                        )}
                    </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t">
                    <div>
                        <div className="font-bold text-lg">{s.price}</div>
                        <div className="text-xs text-muted-foreground">{s.priceNote}</div>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={onApply}
                            className="inline-flex items-center justify-center text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white h-8 rounded-md px-3 transition-colors"
                        >
                            Подать заявление
                        </button>
                        <button className="inline-flex items-center justify-center h-8 w-8 rounded-md border bg-background hover:bg-accent transition-colors">
                            <Eye className="h-4 w-4" aria-hidden />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
