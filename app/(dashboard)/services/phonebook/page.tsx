import { memo } from "react";
import { PhoneDirectorySection } from "@/components/employee-sections/PhoneDirectorySection";

const PhonebookPage = () => (
    <div className="space-y-6">
        <div>
            <h2 className="text-2xl font-bold">Телефонный справочник</h2>
            <p className="text-muted-foreground">Контакты сотрудников предприятия</p>
        </div>
        <PhoneDirectorySection />
    </div>
);

export default memo(PhonebookPage);
