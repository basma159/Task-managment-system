import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/User.model.js";
import { loginSchema } from "../validations/auth.validation.js";

async function login(req, res, next) {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res
        .status(400)
        .json({ field: "email", message: error.details[0].message });
    }
    const userSearch = await UserModel.findOne({ email: value.email }).select(
      "+password",
    );
    if (!userSearch) {
      return res
        .status(401)
        .json({ field: "general", message: "Email OR Password is Incorrect" });
    }
    const comparePassword = await bcrypt.compare(
      value.password,
      userSearch.password,
    );
    if (!comparePassword) {
      return res
        .status(401)
        .json({ field: "password", message: "Email OR Password is Incorrect" });
    }
    const token = jwt.sign({ sub: userSearch._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXP || "7d",
    });
    return res.status(200).json({
      token,
      message: "Login Successfully",
      user: {
        id: userSearch._id,
        name: userSearch.name,
        email: userSearch.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ field: "general", message: "Internal Server Error" });
  }
}

export { login };
