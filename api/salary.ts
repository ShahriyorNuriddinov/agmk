import api from "@/lib/axios";

export const salaryApi = {
    getCurrent: async () => {
        const res = await api.get("/salary/me/current");
        return res.data;
    },
    getHistory: async () => {
        const res = await api.get("/salary/me");
        return res.data;
    },
};
