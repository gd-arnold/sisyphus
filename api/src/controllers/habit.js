import HabitService from "../services/habit.js";

const HabitController = {
    get: async (req, res) => {
        const userId = Number(req.userPayload.id);

        try {
            const habits = await HabitService.findAllByUserId(userId);

            return res.status(200).send(habits);
        } catch (e) {
            return res.status(500).send();
        }
    },
    post: async (req, res) => {
        const { title } = req.body;
        const userId = Number(req.userPayload.id);

        try {
            const habit = await HabitService.save(title, userId);

            return res.status(201).send(habit);
        } catch (e) {
            return res.status(500).send();
        }
    },
    delete: async (req, res) => {
        const id = Number(req.params.id);
        const userId = Number(req.userPayload.id);

        try {
            const habit = await HabitService.findById(id);

            if (habit === null || habit.userId !== userId)
                return res.status(401).send();

            await HabitService.deleteById(id);

            return res.status(204).send();
        } catch (e) {
            return res.status(500).send();
        }
    },
};

export default HabitController;
