import prisma from "../../prisma/client.js";

const HabitService = {
    getAll: async (userId) => {
        return await prisma.habit.findMany({
            where: { userId: userId } ,
            select: {
                id: true,
                title: true,
                HabitLog: {
                    select: {
                        date: true
                    }
                }
            }
        });
    },
    save: async (title, userId) => {
        return await prisma.habit.create({
            data: {
                title,
                userId: userId
            },
            select: {
                id: true,
                title: true,
                HabitLog: {
                    select: {
                        date: true
                    }
                }
            }
        });
    }
}

export default HabitService;
