import prisma from "../../prisma/client.js"
import bcrypt from "bcrypt"

const AuthService = {
    findUserByEmail: async (email) => {
        return await prisma.user.findFirst({
            where: { email: email }
        });
    },
    findUserByUsername: async (username) => {
        return await prisma.user.findFirst({
            where: { username: username }
        });
    },
    hashPassword: async (password, saltRounds = 10) => {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);

        return hash;
    },
    saveUser: async (email, username, hashedPassword) => {
        return await prisma.user.create({
            data: {
                email,
                username,
                password: hashedPassword
            },
            select: {
                email: true,
                username: true
            }
        });
    }
};

export default AuthService;
