import api from "@/lib/axios";

export interface LoginInput {
    email: string;
    password: string;
}

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
    login: async (data: LoginInput): Promise<AuthResponse> => {
        const res = await api.post("/auth/login", data);
        return res.data;
    },

    requestAccess: async (email: string): Promise<{ success: boolean; message: string }> => {
        const res = await api.post("/auth/request-access", { email });
        return res.data;
    },

    verifyToken: async (token: string): Promise<{ success: boolean; email: string }> => {
        const res = await api.get(`/auth/verify-token?token=${token}`);
        return res.data;
    },

    setPassword: async (token: string, password: string): Promise<AuthResponse> => {
        const res = await api.post("/auth/set-password", { token, password });
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
