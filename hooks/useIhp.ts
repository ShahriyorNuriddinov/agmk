import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ihpApi, IhpRequestInput } from "@/api/ihp";

export function useIhpRequests() {
    return useQuery({
        queryKey: ["ihp"],
        queryFn: ihpApi.getMy,
    });
}

export function useCreateIhp(onSuccess?: () => void) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: IhpRequestInput) => ihpApi.create(data),
        onSuccess: () => {
            toast.success("Заявка успешно отправлена!");
            queryClient.invalidateQueries({ queryKey: ["ihp"] });
            onSuccess?.();
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Ошибка при отправке заявки");
        },
    });
}
