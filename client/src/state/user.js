import { create } from "zustand";
import api from "../utils/api";

const useUser = create((set) => ({
    user: null,
    
    fetchUser: async () => {
        try {
            const response = await api.get("/auth/me");

            if (response.user) {
                set({
                    user: response.user
                });
            } else {
                throw new Error("Failed fetching user");
            }
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}));

export default useUser;
