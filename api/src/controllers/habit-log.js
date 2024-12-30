import HabitService from "../services/habit.js";
import HabitLogService from "../services/habit-log.js";

const HabitLogController = {
    post: async (req, res) => {
        const userId = Number(req.userPayload.id);
        const habitId = Number(req.body.id);
        const date = new Date(req.body.date);

        try {
            const habit = await HabitService.findById(habitId);

            if (habit === null || habit.userId !== userId)
                return res.status(401).send();

            if ((await HabitLogService.findByDate(habitId, date)) !== null)
                return res.status(409).send();

            const habitLog = await HabitLogService.save(habitId, date);

            return res.status(201).send(habitLog);
        } catch (e) {
            console.log(e);
            return res.status(500).send();
        }
    },
    delete: async (req, res) => {
        try {
            return res.status(204).send();
        } catch (e) {
            return res.status(500).send();
        }
    }
};

export default HabitLogController;
