"use client";
import { useEffect, useState } from "react";

interface User {
    id: string;
    email: string;
    role: string;
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
        window.location.href = "/login";
    }

    return { user, logout };
}
