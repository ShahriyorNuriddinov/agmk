import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authApi, RegisterInput } from "@/api/auth";

export function useRegister() {
    const router = useRouter();

    return useMutation({
        mutationFn: (data: RegisterInput) => authApi.register(data),
        onSuccess: (data) => {
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("refreshToken", data.refreshToken);
            localStorage.setItem("user", JSON.stringify(data.user));
            toast.success("Регистрация прошла успешно!");
            router.push("/");
        },
        onError: (error: any) => {
            const resData = error?.response?.data;
            if (resData?.errors?.length) {
                resData.errors.forEach((e: { msg: string }) => toast.error(e.msg));
            } else {
                toast.error(resData?.message || "Ошибка регистрации");
            }
        },
    });
}
