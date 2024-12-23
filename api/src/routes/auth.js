import express from "express"
import { validateBody } from "../middlewares/validate.js";
import AuthSchema from "../schemas/auth.js";

const AuthRouter = express.Router();

AuthRouter.post("/register", validateBody(AuthSchema.register), (req, res) => {
    // TODO: handle auth register
    res.status(200).send();
});

AuthRouter.post("/login", validateBody(AuthSchema.login), (req, res) => {
    // TODO: handle auth login
    res.status(200).send();
});

export default AuthRouter;

