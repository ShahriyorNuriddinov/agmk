import api from "@/lib/axios";

export interface AuthResponse {
    success: boolean;
    accessToken: string;
    refreshToken: string;
    user: {
        id: string;
        email: string;
        role: string;
        employee: {
            firstName: string;
            lastName: string;
            middleName?: string;
            position: string;
            department: string;
        };
    };
}

export const authApi = {
    login: async (email: string, password: string): Promise<AuthResponse> => {
        const res = await api.post("/auth/login", { email, password });
        return res.data;
    },

    sendOtp: async (email: string): Promise<{ success: boolean; message: string }> => {
        const res = await api.post("/auth/send-otp", { email });
        return res.data;
    },

    verifyOtp: async (email: string, code: string): Promise<AuthResponse> => {
        const res = await api.post("/auth/verify-otp", { email, code });
        return res.data;
    },

    logout: async () => {
        await api.post("/auth/logout");
        localStorage.clear();
    },

    me: async () => {
        const res = await api.get("/auth/me");
        return res.data;
    },
};
