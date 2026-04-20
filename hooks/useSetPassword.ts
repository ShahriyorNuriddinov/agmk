import { useMutation } from "@tanstack/react-query";
import api from "@/lib/axios";

export function useSetPassword() {
    return useMutation({
        mutationFn: (password: string) => api.post("/auth/set-password", { password }),
    });
}
