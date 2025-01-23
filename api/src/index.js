import express from "express"
import cors from "cors"
import { App } from "./config.js"
import ApiRouter from "./routes/api.js";
import os from "os"

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    const message = `hello from host ${os.hostname()}`;

    res.status(200).send({ message });
});

app.use("/api", ApiRouter);

app.listen(App.port, () => console.log(`UP & RUNNING ON PORT ${App.port}`));
