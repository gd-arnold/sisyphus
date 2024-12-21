import express from "express"

const HabitLogsRouter = express.Router();

HabitLogsRouter.post("/", (req, res) => {
    // TODO: handle habit post
    res.status(200).send();
});

HabitLogsRouter.delete("/:id", (req, res) => {
    // TODO: handle habit delete
    res.status(200).send();
});

export default HabitLogsRouter;
