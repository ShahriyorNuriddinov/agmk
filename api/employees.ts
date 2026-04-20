import api from "@/lib/axios";

export const employeesApi = {
    getAll: async (params?: { search?: string; department?: string; page?: number; limit?: number }) => {
        const res = await api.get("/employees", { params });
        return res.data;
    },

    getById: async (id: string) => {
        const res = await api.get(`/employees/${id}`);
        return res.data;
    },
};

