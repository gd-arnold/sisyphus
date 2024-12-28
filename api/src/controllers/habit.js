import HabitService from "../services/habit.js";

const HabitController = {
    get: async (req, res) => {
        const userId = req.userPayload.id;

        try {
            const habits = await HabitService.getAll(userId);

            return res.status(200).send(habits);
        } catch (e) {
            return res.status(500).send();
        }
    },
    post: async (req, res) => {
        const { title } = req.body;
        const userId = req.userPayload.id;

        try {
            const habit = await HabitService.save(title, userId);

            return res.status(201).send(habit);
        } catch (e) {
            return res.status(500).send();
        }
    },
    delete: async (req, res) => {
        return res.status(200).send();
    },
};

export default HabitController;
