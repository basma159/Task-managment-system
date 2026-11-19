import { Router } from "express";
import UserModel from "../models/User.model.js";

const UserRouter = Router();

UserRouter.post("/register", (req, res) => {
    const user = new UserModel (req.body);
    user.save()
    res.status(201).send("User created sucessfully");
})

export default UserRouter;