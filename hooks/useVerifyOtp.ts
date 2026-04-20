import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/api/auth";

export function useVerifyOtp() {
    return useMutation({
        mutationFn: ({ email, code }: { email: string; code: string }) =>
            authApi.verifyOtp(email, code),
    });
}
