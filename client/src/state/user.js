import { create } from "zustand";
import api from "../utils/api";

const useUser = create((set) => ({
    user: null,
    
    fetchUser: async () => {
        try {
            const response = await api.get("/auth/me");

            set({
                user: response.user
            });
        } catch (e) {
            console.error(e);
        }
    }
}));

export default useUser;
