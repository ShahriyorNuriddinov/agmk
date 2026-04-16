import api from "@/lib/axios";

export interface SanatoriumApplicationInput {
    sanatorium: string;
    checkIn: string;
    checkOut: string;
    roomType?: string;
    treatment?: string;
    companions?: { name: string; relation: string }[];
    medicalNotes?: string;
    specialRequests?: string;
}

export const sanatoriumsApi = {
    getMy: async () => {
        const res = await api.get("/sanatoriums");
        return res.data;
    },

    create: async (data: SanatoriumApplicationInput) => {
        const res = await api.post("/sanatoriums", data);
        return res.data;
    },

    cancel: async (id: string) => {
        const res = await api.delete(`/sanatoriums/${id}`);
        return res.data;
    },
};
