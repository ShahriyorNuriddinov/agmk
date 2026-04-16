import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { supportApi, SupportTicketInput } from "@/api/support";

export function useSupportTickets() {
    return useQuery({
        queryKey: ["support"],
        queryFn: supportApi.getMy,
    });
}

export function useCreateTicket(onSuccess?: () => void) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: SupportTicketInput) => supportApi.create(data),
        onSuccess: () => {
            toast.success("Заявка успешно создана!");
            queryClient.invalidateQueries({ queryKey: ["support"] });
            onSuccess?.();
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Ошибка при создании заявки");
        },
    });
}
