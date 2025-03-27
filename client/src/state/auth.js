import { create } from "zustand";
import api from "../utils/api";

const useAuth = create((set) => ({
    token: localStorage.getItem("token"),
    isAuthenticated: !!localStorage.getItem("token"),
    error: null,

    login: async (email, password) => {
        try {
            const response = await api.post("/auth/login", { email, password });
            
            if (response.token) {
                localStorage.setItem("token", response.token);

                set({
                    token: response.token,
                    isAuthenticated: true,
                });
                return true;
            }

            throw new Error("API didn't send token");
        } catch (e) {
            set({
                error: (e.data && e.data.error) ? e.data.error : "Something went wrong. Please try again later.",
                isAuthenticated: false
            });

            return false;
        }
    },

    register: async (email, username, password) => {
        try {
            const response = await api.post("/auth/register", { email, username, password });

            if (response.token) {
                localStorage.setItem("token", response.token);

                set({
                    token: response.token,
                    isAuthenticated: true,
                });
                return true;
            }

            throw new Error("API didn't send token");
        } catch (e) {
            set({
                error: (e.data && e.data.error) ? e.data.error : "Something went wrong. Please try again later.",
                isAuthenticated: false
            });

            return false;
        }
    },

    logout: () => {
        localStorage.removeItem("token");
        set({
            token: null,
            isAuthenticated: false
        });
    },

    clearError: () => {
        set({ error: null });
    }
}));

export default useAuth;
