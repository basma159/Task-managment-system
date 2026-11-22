import validator from "validator";
import UserModel from "../models/User.model.js";

async function register(req, res) {
    try {
        const { name, email, password } = req.body;

        // handle name errors
        if (!name) {
            return res.status(400).json({
                field: "name",
                message: "Name Field is Required!",
            });
        }
        if (typeof name !== "string") {
            return res.status(400).json({
                field: "name",
                message: "Name must be string",
            });
        }
        if (name.trim() === "") {
            return res.status(400).json({
                field: "name",
                message: "Name Field is Required!",
            });
        }
        // handle email errors
        if (!email) {
            return res.status(400).json({
                field: "email",
                message: "Email Field is Required!",
            });
        }
        if (typeof email !== "string") {
            return res.status(400).json({
                field: "email",
                message: "Email must be string",
            });
        }
        const validEmail = email.trim();
        if (validEmail === "") {
            return res.status(400).json({
                field: "email",
                message: "Email Field is Required!",
            });
        }

        if (!validator.isEmail(validEmail)) {
            return res.status(400).json({
                field: "email",
                message: "Invalid Email Format",
            });
        }
        // handle password errors
        if (!password) {
            return res.status(400).json({
                field: "password",
                message: "Password Field is Required!",
            });
        }
        if (typeof password !== "string") {
            return res.status(400).json({
                field: "password",
                message: "Password must be string",
            });
        }
        if (password.trim() === "") {
            return res.status(400).json({
                field: "password",
                message: "Password Field is Required!",
            });
        }
        if (password.length < 8) {
            return res.status(400).json({
                field: "password",
                message: "Password must be at least 8 characters!",
            });
        }
        const user = new UserModel({ name, email: validEmail, password }); // validEmail is email after valildation
        await user.save();
        res.status(201).json({
            message: "User created successfully",
        });
    }
    catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                field: "email",
                message: "Email already exists",
            });
        }
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
}

export { register };