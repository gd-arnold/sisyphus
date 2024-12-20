import express from "express"
import "dotenv/config"

const PORT = process.env.PORT || 8080;

const app = express();

app.listen(PORT, () => console.log(`UP & RUNNING ON PORT ${PORT}`));
