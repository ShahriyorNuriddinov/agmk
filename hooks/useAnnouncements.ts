import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { announcementsApi } from "@/api/announcements";

export function useAnnouncements() {
    const hasToken = typeof window !== "undefined" && !!localStorage.getItem("accessToken");
    return useQuery({
        queryKey: ["announcements"],
        queryFn: announcementsApi.getAll,
        enabled: hasToken,
    });
}

export function useMarkRead() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => announcementsApi.markRead(id),
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["announcements"] }),
    });
}
