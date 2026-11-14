import mongoose from "mongoose";

const connectedDB = async function () {
    try {
        await mongoose.connect(process.env.DATA_BASE_URL)
        console.log("DB Connection Sucessfully")

    } catch (error) {
        console.log("DB Connection Failed : ", error)
        throw error // to send error to server.js file
    }
}

export default connectedDB;
