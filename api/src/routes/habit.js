import express from "express"
import { auth } from "../middlewares/auth.js"
import { validateBody } from "../middlewares/validate.js";
import HabitSchema from "../schemas/habit.js";
import HabitController from "../controllers/habit.js";

const HabitRouter = express.Router();

HabitRouter.use(auth);

HabitRouter.get("/", HabitController.get);

HabitRouter.post("/", validateBody(HabitSchema), HabitController.post);

HabitRouter.delete("/:id", HabitController.delete);

export default HabitRouter;
