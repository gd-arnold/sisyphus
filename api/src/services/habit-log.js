import prisma from "../../prisma/client.js";

const HabitLogService = {
    findByDate: async (habitId, date) => {
        return await prisma.habitLog.findFirst({
            where: {
                habitId: habitId,
                date: date
            }
        });
    },
    findById: async (id) => {
        return await prisma.habitLog.findFirst({
            where: { id: id },
        });
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
    },
    deleteById: async (id) => {
        return await prisma.habitLog.delete({
            where: { id: id }
        });
    }
};

export default HabitLogService;
