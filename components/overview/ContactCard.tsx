import { Phone, Mail, FileText, Clock } from "lucide-react";

export function ContactCard() {
    return (
        <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
            <div className="px-6 pt-6 pb-3">
                <h4 className="leading-none flex items-center space-x-2 text-base font-semibold">
                    <Phone className="h-5 w-5 text-green-600" />
                    <span>Контактная информация</span>
                </h4>
            </div>
            <div className="px-6 pb-6 pt-1">
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-3">
                        <div>
                            <div className="flex items-center space-x-2">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Рабочий телефон:</span>
                            </div>
                            <p className="ml-6 font-mono">+998 69 233-45-67 доб. 1543</p>
                        </div>
                        <div>
                            <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Email:</span>
                            </div>
                            <p className="ml-6 font-mono">i.ivanov@agmk.uz</p>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div>
                            <div className="flex items-center space-x-2">
                                <FileText className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Табельный номер:</span>
                            </div>
                            <p className="ml-6 font-mono">АГМК-15847</p>
                        </div>
                        <div>
                            <div className="flex items-center space-x-2">
                                <Clock className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">График работы:</span>
                            </div>
                            <p className="ml-6">Полный рабочий день (Дневная смена)</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
