import HabitService from "../services/habit.js";

const HabitController = {
    get: async (req, res) => {
        return res.status(200).send();
    },
    post: async (req, res) => {
        const { title } = req.body;

        try {
            const habit = await HabitService.save(title, req.userPayload.id);

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
