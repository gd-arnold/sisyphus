import express from "express"
import { validateBody } from "../middlewares/validate.js";
import AuthSchema from "../schemas/auth.js";
import AuthController from "../controllers/auth.js";

const AuthRouter = express.Router();

AuthRouter.post("/register", validateBody(AuthSchema.register), AuthController.register);
AuthRouter.post("/login", validateBody(AuthSchema.login), AuthController.login);

export default AuthRouter;
