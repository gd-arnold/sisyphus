import express from "express"
import cors from "cors"
import { App } from "./config.js"
import AuthRouter from "./routes/auth.js";
import HabitRouter from "./routes/habit.js";
import HabitLogsRouter from "./routes/habit-logs.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", AuthRouter);
app.use("/habit", HabitRouter);
app.use("/habit-logs", HabitLogsRouter);

app.listen(App.port, () => console.log(`UP & RUNNING ON PORT ${App.port}`));
