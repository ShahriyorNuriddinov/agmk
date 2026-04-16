"use client";

import { memo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { GeneralTab } from "@/components/profile/tabs/GeneralTab";
import { CareerTab } from "@/components/profile/tabs/CareerTab";
import { SkillsTab } from "@/components/profile/tabs/SkillsTab";
import { AchievementsTab } from "@/components/profile/tabs/AchievementsTab";
import { DocumentsTab } from "@/components/profile/tabs/DocumentsTab";

const ProfilePage = () => (
    <div className="space-y-6">
        <ProfileHeader />
        <Tabs defaultValue="general" className="flex flex-col gap-2">
            <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="general">Общие данные</TabsTrigger>
                <TabsTrigger value="work-history">Карьера</TabsTrigger>
                <TabsTrigger value="skills">Навыки</TabsTrigger>
                <TabsTrigger value="achievements">Достижения</TabsTrigger>
                <TabsTrigger value="documents">Документы</TabsTrigger>
            </TabsList>
            <TabsContent value="general" className="space-y-6"><GeneralTab /></TabsContent>
            <TabsContent value="work-history" className="space-y-6"><CareerTab /></TabsContent>
            <TabsContent value="skills" className="space-y-6"><SkillsTab /></TabsContent>
            <TabsContent value="achievements" className="space-y-6"><AchievementsTab /></TabsContent>
            <TabsContent value="documents" className="space-y-6"><DocumentsTab /></TabsContent>
        </Tabs>
    </div>
);

export default memo(ProfilePage);
