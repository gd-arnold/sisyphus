import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// logging for dev environment
if (process.env.NODE_ENV === 'development') {
    prisma.$use(async (params, next) => {
        const before = Date.now();
        const result = await next(params);
        const after = Date.now();
        console.log(`Query ${params.model}.${params.action} took ${after - before}ms`);

        return result;
    });
}

export default prisma;
