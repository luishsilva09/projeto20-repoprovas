import joi from "joi";

export const newUserSchema = joi.object({
  email: joi.string().email().trim().required(),
  password: joi.string().trim().min(8).required(),
  repeatPassword: joi.string().trim().valid(joi.ref("password")).required(),
});

export const signinSchema = joi.object({
  email: joi.string().email().trim().required(),
  password: joi.string().trim().min(8).required(),
});
