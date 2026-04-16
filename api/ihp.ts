import api from "@/lib/axios";

export interface IhpRequestInput {
    category: string;
    itemName: string;
    quantity?: number;
    urgency?: "low" | "normal" | "high";
    purpose?: string;
    justification?: string;
}

export const ihpApi = {
    getMy: async () => {
        const res = await api.get("/ihp");
        return res.data;
    },

    create: async (data: IhpRequestInput) => {
        const res = await api.post("/ihp", data);
        return res.data;
    },
};
