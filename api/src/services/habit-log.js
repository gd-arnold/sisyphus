import prisma from "../../prisma/client.js";

const HabitLogService = {
    save: async (habitId, date) => {
        await prisma.habitLog.create({
            data: {
                habitId: habitId,
                date: date
            },
            select: {
                id: true,
                date: true,
                habitId: true
            }
        });
    }
};

export default HabitLogService;
