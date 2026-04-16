import { ChefHat, Utensils } from "lucide-react";

const lpp = [
    { name: "Первый завтрак", desc: "Каша, молоко, хлеб, масло", price: "12,000 сум" },
    { name: "Второй завтрак", desc: "Фрукты, сок", price: "8,000 сум" },
    { name: "Обед", desc: "Первое, второе, салат, компот", price: "18,000 сум" },
    { name: "Полдник", desc: "Молочные продукты, печенье", price: "6,000 сум" },
    { name: "Ужин", desc: "Горячее блюдо, гарнир, чай", price: "15,000 сум" },
];

const bp = [
    { name: "Выпечка", desc: "Булочки, пирожки, самса", price: "5,000 сум" },
    { name: "Напитки горячие", desc: "Чай, кофе, какао", price: "3,000 сум" },
    { name: "Напитки холодные", desc: "Соки, лимонады, вода", price: "4,000 сум" },
    { name: "Кондитерские изделия", desc: "Торты, пирожные, конфеты", price: "7,000 сум" },
    { name: "Бутерброды", desc: "С мясом, сыром, овощами", price: "8,000 сум" },
    { name: "Салаты", desc: "Овощные, мясные салаты", price: "6,000 сум" },
];

function PriceList({ items, priceCls }: { items: typeof lpp; priceCls: string }) {
    return (
        <div className="space-y-4">
            {items.map((item, i) => (
                <div key={i} className="flex justify-between items-start p-3 border rounded-lg">
                    <div className="flex-1">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    <div className="text-right">
                        <p className={`font-bold ${priceCls}`}>{item.price}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export function FoodPricesTab() {
    return (
        <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
                <div className="px-6 pt-6">
                    <h4 className="leading-none font-semibold text-base flex items-center space-x-2">
                        <ChefHat className="h-5 w-5 text-blue-600" aria-hidden />
                        <span>Прайс-лист ЛПП</span>
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">Лечебно-профилактическое питание</p>
                </div>
                <div className="px-6 pb-6 -mt-2">
                    <PriceList items={lpp} priceCls="text-blue-600" />
                </div>
            </div>

            <div className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border">
                <div className="px-6 pt-6">
                    <h4 className="leading-none font-semibold text-base flex items-center space-x-2">
                        <Utensils className="h-5 w-5 text-green-600" aria-hidden />
                        <span>Прайс-лист БП</span>
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">Буфетное питание</p>
                </div>
                <div className="px-6 pb-6 -mt-2">
                    <PriceList items={bp} priceCls="text-green-600" />
                </div>
            </div>
        </div>
    );
}
