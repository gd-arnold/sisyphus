import prisma from "../../prisma/client.js";

const HabitService = {
    save: async (title, userId) => {
        return await prisma.habit.create({
            data: {
                title,
                userId: userId
            },
            select: {
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
