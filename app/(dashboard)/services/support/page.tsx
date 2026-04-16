import { memo } from "react";
import { TechnicalSupportSection } from "@/components/employee-sections/TechnicalSupportSection";

const SupportPage = () => (
    <div className="space-y-6">
        <TechnicalSupportSection />
    </div>
);

export default memo(SupportPage);
