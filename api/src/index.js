import express from "express"
import { App } from "./config"

const app = express();

app.listen(App.port, () => console.log(`UP & RUNNING ON PORT ${App.port}`));
