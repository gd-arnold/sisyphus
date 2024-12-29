import express from "express"
import { auth } from "../middlewares/auth.js";
import HabitLogSchema from "../schemas/habit-log.js";
import { validateBody } from "../middlewares/validate.js";
import HabitLogController from "../controllers/habit-log.js";

const HabitLogRouter = express.Router();

HabitLogRouter.use(auth);

HabitLogRouter.post("/", validateBody(HabitLogSchema), HabitLogController.post);
HabitLogRouter.delete("/:id", HabitLogController.delete);

export default HabitLogRouter;
