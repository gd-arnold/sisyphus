import express from "express"
import cors from "cors"
import { App } from "./config.js"
import ApiRouter from "./routes/api.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", ApiRouter);

app.listen(App.port, () => console.log(`UP & RUNNING ON PORT ${App.port}`));
