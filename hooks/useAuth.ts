"use client";
import { useEffect, useState } from "react";

interface User {
    id: string;
    email: string;
    role: string;
    employee: {
        firstName: string;
        lastName: string;
        middleName?: string;
        position: string;
        department: string;
    };
}

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem("user");
        if (saved) {
            try { setUser(JSON.parse(saved)); } catch { }
        }
    }, []);

    function logout() {
        localStorage.clear();
        window.location.href = "/about";
    }

    const emp = user?.employee;

    const shortName = emp
        ? `${emp.lastName} ${emp.firstName?.[0] ?? ""}.${emp.middleName?.[0] ?? ""}.`
        : "";

    const displayName = emp
        ? `${emp.firstName?.[0] ?? ""}. ${emp.lastName}`
        : "";

    const initials = emp
        ? `${emp.lastName?.[0] ?? ""}${emp.firstName?.[0] ?? ""}`
        : "";

    return { user, shortName, displayName, initials, logout };
}
