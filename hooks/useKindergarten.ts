import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { kindergartensApi, KindergartenApplicationInput } from "@/api/kindergartens";

export function useKindergartenApplications() {
    return useQuery({
        queryKey: ["kindergartens"],
        queryFn: kindergartensApi.getMy,
    });
}

export function useCreateKindergarten(onSuccess?: () => void) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: KindergartenApplicationInput) => kindergartensApi.create(data),
        onSuccess: () => {
            toast.success("Заявление успешно подано!");
            queryClient.invalidateQueries({ queryKey: ["kindergartens"] });
            onSuccess?.();
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Ошибка при подаче заявления");
        },
    });
}

export function useCancelKindergarten() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => kindergartensApi.cancel(id),
        onSuccess: () => {
            toast.success("Заявление отменено");
            queryClient.invalidateQueries({ queryKey: ["kindergartens"] });
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Ошибка");
        },
    });
}
