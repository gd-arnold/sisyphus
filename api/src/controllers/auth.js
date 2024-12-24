import AuthService from "../services/auth.js";

const AuthController = {
    register: async (req, res) => {
        const { email, username, password } = req.body;

        try {
            if (await AuthService.findUserByEmail(email) !== null)
                return res.status(409).send({ error: "Email already exists." });

            if (await AuthService.findUserByUsername(username) !== null)
                return res.status(409).send({ error: "Username already exists." });

            const hashedPassword = await AuthService.hashPassword(password);
            const user = await AuthService.saveUser(email, username, hashedPassword);

            const payload = { id: user.id, email: user.email, username: user.username };
            const token = AuthService.generateToken(payload);
            console.log(token);

            return res.status(201).send({...payload, token});
        } catch (e) {
            return res.status(500).send();
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;

        return res.status(200).send();
    }
};

export default AuthController;
