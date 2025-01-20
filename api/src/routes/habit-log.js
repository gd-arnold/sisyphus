import express from "express"
import { auth } from "../middlewares/auth.js";
import HabitLogSchema from "../schemas/habit-log.js";
import { validateBody, validateParams } from "../middlewares/validate.js";
import HabitLogController from "../controllers/habit-log.js";
import IdParamSchema from "../schemas/id.js";

const HabitLogRouter = express.Router();

HabitLogRouter.use(auth);

HabitLogRouter.post("/", validateBody(HabitLogSchema), HabitLogController.post);
HabitLogRouter.delete("/:id", validateParams(IdParamSchema), HabitLogController.delete);

export default HabitLogRouter;
