import { Save } from "lucide-react";

export function ProfileHeader() {
    return (
        <div className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold">Мой профиль</h1>
                <p className="text-muted-foreground text-sm">Персональная информация и достижения</p>
            </div>
            <button className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white h-9 px-4 py-2 transition-colors">
                <Save className="h-4 w-4 mr-2" />
                Сохранить
            </button>
        </div>
    );
}
