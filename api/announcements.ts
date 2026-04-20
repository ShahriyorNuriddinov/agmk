import api from "@/lib/axios";

export const announcementsApi = {
  getAll: async () => {
    const res = await api.get("/announcements");
    return res.data;
  },
  markRead: async (id: string) => {
    const res = await api.put(`/announcements/${id}/read`);
    return res.data;
  },
};
