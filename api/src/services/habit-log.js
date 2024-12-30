import prisma from "../../prisma/client.js";

const HabitLogService = {
    findByDate: async (habitId, date) => {
        return await prisma.habitLog.findFirst({
            where: {
                habitId: habitId,
                date: date
            }
        })
    },
    save: async (habitId, date) => {
        return await prisma.habitLog.create({
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
