import { create } from "zustand";
import api from "../utils/api";

const useAuth = create((set) => ({
    user: null,
    token: localStorage.getItem("token"),
    isAuthenticated: !!localStorage.getItem("token"),
    error: null,

    login: async (email, password) => {
        try {
            const response = await api.post("/auth/login", { email, password });
            
            if (response.token) {
                localStorage.setItem("token", response.token);

                set({
                    user: response.user,
                    token: response.token,
                    isAuthenticated: true,
                });
                return true;
            }
            set({
                error: response.error,
                isAuthenticated: false
            });
            return false;

        } catch (e) {
            console.error(e);
        }
    }
}));

export default useAuth;
