import express from "express"
import { config } from "dotenv"
import cors from "cors"
config()
import connectedDB from "./src/DB/connection.js"

const app = express()
const port = process.env.PORT || 3000
app.use(cors())

app.use(express.json())


async function connect() {
    try {
        await connectedDB()
        app.listen(port, () => {
            console.log(`server is listening on port ${port}`)
        })
    }
    catch (error) {
        console.log("ERROR : ", error)
    }
}
connect()