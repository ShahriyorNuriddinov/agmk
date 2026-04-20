import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api/auth";

export function useSendOtp() {
    return useMutation({
        mutationFn: (email: string) => authApi.sendOtp(email),
    });
}
