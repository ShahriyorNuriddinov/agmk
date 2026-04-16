import api from "@/lib/axios";

export interface KindergartenApplicationInput {
    childFirstName: string;
    childLastName: string;
    childBirthDate: string;
    preferredGarden?: string;
    parentInfo?: string;
    contacts?: string;
    additionalInfo?: string;
}

export const kindergartensApi = {
    getMy: async () => {
        const res = await api.get("/kindergartens");
        return res.data;
    },

    create: async (data: KindergartenApplicationInput) => {
        const res = await api.post("/kindergartens", data);
        return res.data;
    },

    cancel: async (id: string) => {
        const res = await api.delete(`/kindergartens/${id}`);
        return res.data;
    },
};
