import { Router } from "express";
import { register } from "../controllers/user.controller.js";

const UserRouter = Router();

// register route
UserRouter.post("/register", register)

export default UserRouter;