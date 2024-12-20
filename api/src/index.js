import express from "express"
import cors from "cors"
import { App } from "./config"

const app = express();

app.use(cors());
app.use(express.json());

app.listen(App.port, () => console.log(`UP & RUNNING ON PORT ${App.port}`));
