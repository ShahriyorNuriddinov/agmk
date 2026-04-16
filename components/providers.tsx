"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { queryClient } from "@/lib/queryClient";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 4000,
                    style: { fontSize: "14px" },
                    success: { iconTheme: { primary: "#16a34a", secondary: "#fff" } },
                    error: { iconTheme: { primary: "#dc2626", secondary: "#fff" } },
                }}
            />
        </QueryClientProvider>
    );
}
