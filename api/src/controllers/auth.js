import AuthService from "../services/auth.js";

const AuthController = {
    register: async (req, res) => {
        const { email, username, password } = req.body;

        try {
            if (await AuthService.findUserByEmail(email) !== null)
                return res.status(409).json({ error: "Email already exists." });

            if (await AuthService.findUserByUsername(username) !== null)
                return res.status(409).json({ error: "Username already exists." });

            const hashedPassword = await AuthService.hashPassword(password);
            const user = await AuthService.saveUser(email, username, hashedPassword);

            const payload = { id: user.id, email: user.email, username: user.username };
            const token = AuthService.generateToken(payload);

            return res.status(201).json({...payload, token});
        } catch (e) {
            return res.status(500).end();
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            const user = await AuthService.findUserByEmail(email);
            if (user === null)
                return res.status(401).json({ error: "Invalid credentials." });

            if (!(await AuthService.isPasswordValid(user, password)))
                return res.status(401).json({ error: "Invalid credentials." });

            const payload = { id: user.id, email: user.email, username: user.username };
            const token = AuthService.generateToken(payload);

            return res.status(200).json({...payload, token});
        } catch (e) {
            return res.status(500).end();
        }
    },

    me: async (req, res) => {
        return res.status(200).json({user: req.userPayload});
    }
};

export default AuthController;
