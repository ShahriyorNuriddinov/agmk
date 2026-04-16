import type { Metadata } from "next";
import Header from "@/components/Header/header";
import AppSidebar from "@/components/Sidebar/Sidebar";

export const metadata: Metadata = {
  title: "AGMK Corporate Portal",
  description: "Dashboard layout",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
