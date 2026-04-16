import { Baby, MapPin, Users, AlertCircle, Clock, Eye } from "lucide-react";

type Garden = {
    name: string;
    address: string;
    capacity: string;
    capacityColor: string;
    queue: string;
    hours: string;
    director: string;
    ageGroups: string[];
    specializations: string[];
};

export function KindergartenCard({ g }: { g: Garden }) {
    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
            <div className="px-6 pt-6">
                <div className="flex items-start justify-between">
                    <div>
                        <h4 className="text-lg font-semibold">{g.name}</h4>
                        <p className="text-muted-foreground flex items-center space-x-1 text-sm mt-0.5">
                            <MapPin className="h-4 w-4" />
                            <span>{g.address}</span>
                        </p>
                    </div>
                    <Baby className="h-8 w-8 text-blue-600 shrink-0" />
                </div>
            </div>

            <div className="px-6 pb-6 -mt-2 space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Вместимость:</span>
                        </div>
                        <p className={`ml-6 ${g.capacityColor}`}>{g.capacity}</p>
                    </div>
                    <div>
                        <div className="flex items-center space-x-2">
                            <AlertCircle className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">В очереди:</span>
                        </div>
                        <p className="ml-6 text-yellow-600">{g.queue}</p>
                    </div>
                    <div>
                        <div className="flex items-center space-x-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Режим работы:</span>
                        </div>
                        <p className="ml-6">{g.hours}</p>
                    </div>
                    <div>
                        <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium">Директор:</span>
                        </div>
                        <p className="ml-6">{g.director}</p>
                    </div>
                </div>

                <div>
                    <h4 className="font-medium text-sm mb-2">Возрастные группы:</h4>
                    <div className="flex flex-wrap gap-1">
                        {g.ageGroups.map((a) => (
                            <span key={a} className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium">
                                {a}
                            </span>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="font-medium text-sm mb-2">Специализация:</h4>
                    <div className="flex flex-wrap gap-1">
                        {g.specializations.map((s) => (
                            <span key={s} className="inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground border-transparent">
                                {s}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex space-x-2">
                    <button className="inline-flex items-center justify-center text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white h-8 rounded-md px-3 flex-1 transition-colors">
                        Подать заявление
                    </button>
                    <button className="inline-flex items-center justify-center h-8 w-8 rounded-md border bg-background hover:bg-accent transition-colors shrink-0">
                        <Eye className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
