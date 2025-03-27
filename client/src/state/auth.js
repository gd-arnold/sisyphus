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
            set({
                error: response.error,
                isAuthenticated: false
            });
            return false;

        } catch (e) {
            console.error(e);
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
            set({
                error: response.error,
                isAuthenticated: false
            });
            return false;
        } catch (e) {
            console.error(e);
        }
    },

    logout: () => {
        localStorage.removeItem("token");
        set({
            token: null,
            isAuthenticated: false
        });
    }
}));

export default useAuth;
