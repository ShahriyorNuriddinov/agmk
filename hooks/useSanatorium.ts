import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { sanatoriumsApi, SanatoriumApplicationInput } from "@/api/sanatoriums";

export function useSanatoriumApplications() {
    return useQuery({
        queryKey: ["sanatoriums"],
        queryFn: sanatoriumsApi.getMy,
    });
}

export function useCreateSanatorium(onSuccess?: () => void) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: SanatoriumApplicationInput) => sanatoriumsApi.create(data),
        onSuccess: () => {
            toast.success("Заявление успешно подано!");
            queryClient.invalidateQueries({ queryKey: ["sanatoriums"] });
            onSuccess?.();
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Ошибка при подаче заявления");
        },
    });
}

export function useCancelSanatorium() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => sanatoriumsApi.cancel(id),
        onSuccess: () => {
            toast.success("Заявление отменено");
            queryClient.invalidateQueries({ queryKey: ["sanatoriums"] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Ошибка");
        },
    });
}
