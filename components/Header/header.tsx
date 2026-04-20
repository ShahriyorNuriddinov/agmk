"use client";
import { memo } from "react";
import Link from "next/link";
import { Building2, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/hooks/useAuth";

const links = [
  { name: "Главная", href: "/" },
  { name: "Мой профиль", href: "/profile/personal" },
  { name: "HR центр", href: "/hr/kindergartens" },
  { name: "Отчеты", href: "/reports/production" },
  { name: "Чаты", href: "/chats" },
];

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="w-full h-14 bg-white border-b border-slate-200 shrink-0 z-50 px-5 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Building2 className="h-8 w-8 text-primary" aria-hidden />
        <div>
          <h1 className="text-xl font-bold text-primary">АГМК</h1>
          <p className="text-xs text-muted-foreground">Корпоративный портал</p>
        </div>
      </div>
      <nav className="hidden lg:flex items-center space-x-6">
        {links.map(({ name, href }) => (
          <Link key={name} href={href} className="text-sm hover:text-primary transition-colors">
            {name}
          </Link>
        ))}
      </nav>
      <div className="hidden lg:flex items-center space-x-3">
        <div className="flex items-center space-x-2">
          <User className="h-4 w-4" aria-hidden />
          <span className="text-sm">{user?.email || "—"}</span>
        </div>
        <Button variant="outline" size="sm" onClick={logout}>
          Выход
        </Button>
      </div>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-5 w-5" aria-hidden />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-64">
          <div className="flex flex-col gap-4 mt-8">
            {links.map(({ name, href }) => (
              <Link key={name} href={href} className="text-sm font-medium hover:text-primary py-1">
                {name}
              </Link>
            ))}
            <div className="flex items-center space-x-2 pt-2 border-t">
              <User className="h-4 w-4" aria-hidden />
              <span className="text-sm">{user?.email || "—"}</span>
            </div>
            <Button variant="outline" size="sm" onClick={logout}>
              Выход
            </Button>
          </div>
        </SheetContent>
      </Sheet>

    </header>
  );
};

export default memo(Header);
