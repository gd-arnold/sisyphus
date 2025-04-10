import { create } from "zustand";
import api from "../utils/api";

const useUser = create((set, get) => ({
    user: null,
    habits: null,
    
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
            throw e;
        }
    },

    fetchHabits: async () => {
        try {
            const response = await api.get("/habit");
            console.log(response);

            if (response.habits) {
                set({
                    habits: response.habits
                });
            } else {
                throw new Error("Failed fetching habits");
            }
        } catch (e) {
            throw e;
        }
    },

    addHabit: async (title) => {
        try {
            const response = await api.post("/habit", { title });

            if (response.habit) {
                set({
                    habits: [...(get().habits || []), response.habit]
                });
            } else {
                throw new Error("Failed adding habbit");
            }
        } catch (e) {
            throw e;
        }
    },

    deleteHabit: async (id) => {
        try {
            console.log(id);
            await api.delete(`/habit/${id}`);

            set({
                habits: get().habits.filter(habit => habit.id !== id)
            });
        } catch (e) {
            throw e;
        }
    },

    logHabit: async (id, date) => {
        try {
            const response = await api.post("/habit-log", { id, date });

            if (response.log) {
                set({
                    habits: get().habits.map(habit => {
                        if (habit.id === id)
                            habit.HabitLog.push(response.log);

                        return habit;
                    })
                });
            } else {
                throw new Error(`Failed adding log (date: ${date} for habit (id: ${id})`);
            }
        } catch (e) {
            throw e;
        }
    },

    unlogHabit: async (habitId, logId) => {
        try {
            await api.delete(`/habit-log/${logId}`);

            set({
                habits: get().habits.map(habit => {
                    if (habit.id === habitId)
                        habit.HabitLog = habit.HabitLog.filter(log => log.id !== logId);

                    return habit;
                })
            });
        } catch (e) {
            throw e;
        }
    }
}));

export default useUser;
