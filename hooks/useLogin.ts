import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authApi, LoginInput } from "@/api/auth";

export function useLogin() {
    const router = useRouter();

    return useMutation({
        mutationFn: (data: LoginInput) => authApi.login(data),
        onSuccess: (data) => {
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            localStorage.setItem("user", JSON.stringify(data.user));
            toast.success("Вы успешно вошли в систему");
            router.push("/");
        },
        onError: (error: any) => {
            const msg = error?.response?.data?.message || "Ошибка входа";
            toast.error(msg);
        },
    });
}
