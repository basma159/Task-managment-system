import { Router } from "express";
import { register } from "../controllers/register.controller.js";
import { login } from "../controllers/login.controller.js";

const UserRouter = Router();

// register route
UserRouter.post("/register", register);
UserRouter.post("/login", login);

export default UserRouter;
