import prisma from "../../prisma/client.js";

const HabitService = {
    findAllByUserId: async (userId) => {
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
    findById: async (id) => {
        return await prisma.habit.findFirst({
            where: { id: id } 
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
    },
    deleteById: async (id) => {
        return await prisma.habit.delete({
            where: { id: id }
        });
    }
};

export default HabitService;
