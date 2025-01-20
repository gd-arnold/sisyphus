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
                return res.status(401).end();

            // check if log already exists
            if ((await HabitLogService.findByDate(habitId, date)) !== null)
                return res.status(409).end();

            const habitLog = await HabitLogService.save(habitId, date);

            return res.status(201).json(habitLog);
        } catch (e) {
            return res.status(500).end();
        }
    },
    delete: async (req, res) => {
        const userId = Number(req.userPayload.id);
        const logId = Number(req.params.id);

        try {
            const log = await HabitLogService.findById(logId);

            if (log === null)
                return res.status(401).end();

            const habit = await HabitService.findById(log.habitId);

            if (habit === null || habit.userId !== userId)
                return res.status(401).end();

            await HabitLogService.deleteById(logId);
            return res.status(204).end();
        } catch (e) {
            console.log(e);
            return res.status(500).end();
        }
    }
};

export default HabitLogController;
