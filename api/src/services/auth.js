import jwt from "jsonwebtoken"
import prisma from "../../prisma/client.js"
import bcrypt from "bcrypt"
import { App } from "../config.js";

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
    findUserById: async (id) => {
        return await prisma.user.findFirst({
            where: { id: id}
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
                id: true,
                email: true,
                username: true
            }
        });
    },
    isPasswordValid: async (user, password) => {
        return await bcrypt.compare(password, user.password);
    },
    generateToken: (payload) => {
        return jwt.sign(payload, App.jwt_secret);
    },
    verifyToken: (token) => {
        return jwt.verify(token, App.jwt_secret);
    }
};

export default AuthService;
