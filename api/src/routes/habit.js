import express from "express"
import { auth } from "../middlewares/auth.js"
import { validateBody, validateParams } from "../middlewares/validate.js";
import HabitSchema from "../schemas/habit.js";
import HabitController from "../controllers/habit.js";
import IdParamSchema from "../schemas/id.js";

const HabitRouter = express.Router();

HabitRouter.use(auth);

HabitRouter.get("/", HabitController.get);

HabitRouter.post("/", validateBody(HabitSchema), HabitController.post);

HabitRouter.delete("/:id", validateParams(IdParamSchema), HabitController.delete);

export default HabitRouter;
