"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DirectoryTab } from "./DirectoryTab";
import { LeadersTab } from "./LeadersTab";
import { BirthdaysTab } from "./BirthdaysTab";
import { EmergencyTab } from "./EmergencyTab";

export function PhoneDirectorySection() {
    return (
        <div className="space-y-6">
            <Tabs defaultValue="directory">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="directory">Справочник</TabsTrigger>
                    <TabsTrigger value="leaders">Руководители</TabsTrigger>
                    <TabsTrigger value="birthdays">Дни рождения</TabsTrigger>
                    <TabsTrigger value="emergency">Экстренные службы</TabsTrigger>
                </TabsList>

                <TabsContent value="directory" className="flex-1 outline-none space-y-6">
                    <DirectoryTab />
                </TabsContent>

                <TabsContent value="leaders" className="flex-1 outline-none space-y-6">
                    <LeadersTab />
                </TabsContent>

                <TabsContent value="birthdays" className="flex-1 outline-none space-y-6">
                    <BirthdaysTab />
                </TabsContent>

                <TabsContent value="emergency" className="flex-1 outline-none space-y-6">
                    <EmergencyTab />
                </TabsContent>
            </Tabs>
        </div>
    );
}
