import express from "express"
import AuthRouter from "./auth.js";
import HabitRouter from "./habit.js";
import HabitLogsRouter from "./habit-log.js";

const ApiRouter = express.Router();

ApiRouter.use("/auth", AuthRouter);
ApiRouter.use("/habit", HabitRouter);
ApiRouter.use("/habit-log", HabitLogsRouter);

export default ApiRouter;
