import api from "@/lib/axios";

export interface LoginInput {
    email: string;
    password: string;
}

export interface RegisterInput {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    middleName?: string;
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

    register: async (data: RegisterInput): Promise<AuthResponse> => {
        const res = await api.post("/auth/register", data);
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
