import express from "express"
import { auth } from "../middlewares/auth.js"

const HabitRouter = express.Router();

HabitRouter.get("/", auth, (req, res) => {
    // TODO: handle habit get
    res.status(200).send();
});

HabitRouter.post("/", (req, res) => {
    // TODO: handle habit post
    res.status(200).send();
});

HabitRouter.delete("/:id", (req, res) => {
    // TODO: handle habit delete
    res.status(200).send();
});

export default HabitRouter;
