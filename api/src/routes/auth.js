import express from "express"

const AuthRouter = express.Router();

AuthRouter.post("/register", (req, res) => {
    // TODO: handle auth register
    res.status(200).send();
});

AuthRouter.post("/login", (req, res) => {
    // TODO: handle auth login
    res.status(200).send();
});

export default AuthRouter;

