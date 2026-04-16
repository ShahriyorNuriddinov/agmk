import api from "@/lib/axios";

export interface SupportTicketInput {
    category: string;
    priority: "low" | "medium" | "high";
    title: string;
    description: string;
    location?: string;
    contactPhone?: string;
}

export const supportApi = {
    getMy: async () => {
        const res = await api.get("/support");
        return res.data;
    },

    create: async (data: SupportTicketInput) => {
        const res = await api.post("/support", data);
        return res.data;
    },

    addComment: async (id: string, text: string) => {
        const res = await api.post(`/support/${id}/comment`, { text });
        return res.data;
    },
};
