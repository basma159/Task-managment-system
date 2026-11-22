import express from "express";
import { config } from "dotenv";
import cors from "cors";
import UserRouter from "./src/routes/user.routes.js";
import connectedDB from "./src/config/db.js";

config();

const app = express();
const port = process.env.PORT || 3000;
const host = "0.0.0.0"

app.use(cors());
app.use(express.json());
app.use("/api/users", UserRouter);


async function connect() {
    try {
        await connectedDB()
        app.listen(port, host, () => {
            console.log(`server is listening on port ${port}`);
        })
    }
    catch (error) {
        console.log("ERROR : ", error);
        process.exit(1); // stop app if connection to DB is failed
    }
}
connect();