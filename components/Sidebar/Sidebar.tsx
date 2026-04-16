"use client";

import { memo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, Eye, Calendar, User, Users, BarChart3,
  Settings, ChevronDown, ChevronRight, Activity,
  Briefcase, Heart, DollarSign, Baby, Building2, Target, UtensilsCrossed, GraduationCap,
  TrendingUp, Clock, CreditCard, Scale, Phone, Headphones, Bell,
} from "lucide-react";
import { Collapsible as RadixCollapsible } from "radix-ui";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
type Child = { label: string; href: string; icon: React.ElementType; badge?: number };
type Item = { label: string; icon: React.ElementType; children: Child[] };
const navItems: Item[] = [
  {
    label: "Главная", icon: Home,
    children: [
      { label: "Дашборд", href: "/", icon: Activity },
      { label: "Обзор", href: "/overview", icon: Eye },
      { label: "Календарь", href: "/calendar", icon: Calendar },
    ],
  },
  {
    label: "Мой профиль", icon: User,
    children: [
      { label: "Персональные данные", href: "/profile/personal", icon: User },
      { label: "Трудовая деятельность", href: "/profile/work", icon: Briefcase },
      { label: "Больничные листы", href: "/profile/sick-leave", icon: Heart },
      { label: "Заработная плата", href: "/profile/salary", icon: DollarSign },
    ],
  },
  {
    label: "HR центр", icon: Users,
    children: [
      { label: "Детские сады", href: "/hr/kindergartens", icon: Baby },
      { label: "Санатории", href: "/hr/sanatoriums", icon: Building2 },
      { label: "ИХП", href: "/hr/ihp", icon: Target },
      { label: "Талоны питания", href: "/hr/food-vouchers", icon: UtensilsCrossed },
      { label: "Учебный центр", href: "/hr/training", icon: GraduationCap },
    ],
  },
  {
    label: "Отчеты", icon: BarChart3,
    children: [
      { label: "Отчеты руководителей", href: "/reports/production", icon: BarChart3 },
      { label: "Управление персоналом", href: "/reports/hr", icon: Users },
      { label: "План/факт анализ", href: "/reports/plan-fact", icon: TrendingUp },
      { label: "Суточная сводка", href: "/reports/daily", icon: Clock },
      { label: "Финансы", href: "/reports/finance", icon: CreditCard },
      { label: "Дисциплина", href: "/reports/discipline", icon: Scale },
    ],
  },
  {
    label: "Сервисы", icon: Settings,
    children: [
      { label: "Телефонный справочник", href: "/services/phonebook", icon: Phone },
      { label: "Техническая поддержка", href: "/services/support", icon: Headphones },
      { label: "Объявления", href: "/services/announcements", icon: Bell, badge: 3 },
      { label: "Настройки", href: "/services/settings", icon: Settings },
    ],
  },
];

const AppSidebar = () => {
  const pathname = usePathname();
  const { displayName, initials, user } = useAuth();

  const defaultOpen = navItems.reduce<Record<string, boolean>>((acc, item) => {
    if (item.children.some((c) => pathname.startsWith(c.href) && c.href !== "/")) acc[item.label] = true;
    return acc;
  }, { Главная: true });

  const [open, setOpen] = useState<Record<string, boolean>>(defaultOpen);
  const toggle = (label: string) => setOpen((p) => ({ ...p, [label]: !p[label] }));

  return (
    <div className="w-64 bg-card border-r flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 text-sm font-bold">
            {initials || <User className="h-5 w-5" />}
          </div>
          <div>
            <p className="font-medium text-sm">{displayName || "—"}</p>
            <p className="text-xs text-muted-foreground">{user?.employee?.position || "—"}</p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-2">
          {navItems.map((item) => {
            const isOpen = !!open[item.label];
            const hasActive = item.children.some((c) => pathname.startsWith(c.href) && c.href !== "/");
            return (
              <RadixCollapsible.Root
                key={item.label}
                open={isOpen}
                onOpenChange={() => toggle(item.label)}
              >
                <div>
                  <RadixCollapsible.Trigger asChild>
                    <button
                      className={cn(
                        "inline-flex items-center gap-2 rounded-md text-sm font-medium transition-all w-full justify-between p-2 h-auto hover:bg-accent hover:text-accent-foreground",
                        (isOpen || hasActive) && "bg-accent"
                      )}
                    >
                      <div className="flex items-center space-x-2">
                        <item.icon className="h-4 w-4 shrink-0" />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {isOpen
                        ? <ChevronDown className="h-4 w-4 shrink-0" />
                        : <ChevronRight className="h-4 w-4 shrink-0" />
                      }
                    </button>
                  </RadixCollapsible.Trigger>
                  <RadixCollapsible.Content>
                    <div className="ml-4 mt-2 space-y-1">
                      {item.children.map((child) => {
                        const isActive = pathname === child.href;
                        return (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={cn(
                              "inline-flex items-center gap-2 rounded-md font-medium transition-all w-full justify-start p-2 text-sm hover:bg-accent hover:text-accent-foreground",
                              (isActive || (pathname.startsWith(child.href) && child.href !== "/")) && "bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
                            )}
                          >
                            <child.icon className="h-4 w-4" />
                            <span>{child.label}</span>
                            {child.badge && (
                              <span className="ml-auto bg-red-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                                {child.badge}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  </RadixCollapsible.Content>
                </div>
              </RadixCollapsible.Root>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default memo(AppSidebar);
