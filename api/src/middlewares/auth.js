import AuthService from "../services/auth.js";

export const auth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader)
            return res.status(401).end();

        const token = authHeader.replace(/^Bearer\s/, '');

        try {
            const payload = AuthService.verifyToken(token);
            const user = await AuthService.findUserById(payload.id);
            if (user === null)
                return res.status(401).end();

            req.userPayload = payload;
            return next();
        } catch (e) {
            return res.status(401).end();
        }
    } catch (e) {
        return res.status(500).end();
    }
}
