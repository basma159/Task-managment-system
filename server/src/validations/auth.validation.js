import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().required().trim(),
  email: Joi.string().required().trim().email(),
  password: Joi.string().required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().required().trim().email(),
  password: Joi.string().required(),
});
