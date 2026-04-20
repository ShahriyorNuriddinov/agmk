import api from "@/lib/axios";

export const foodVouchersApi = {
    getCurrent: async () => {
        const res = await api.get("/food-vouchers");
        return res.data;
    },
    getHistory: async () => {
        const res = await api.get("/food-vouchers/history");
        return res.data;
    },
    addVoucher: async (data: { type: string; allocated: number; month: number; year: number }) => {
        const res = await api.post("/food-vouchers", data);
        return res.data;
    },
};