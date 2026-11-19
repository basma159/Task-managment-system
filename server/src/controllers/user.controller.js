import UserModel from "../models/User.model.js";

async function register(req, res) {
    try {
        const { name, email, password } = req.body;
        const user = new UserModel({ name, email, password });
        await user.save();
        res.status(201).json({
            message: "User created successfully",
        });
    }
    catch (error) {
        res.status(400).json({
            message: error.message,
        });
    }
}

export { register };