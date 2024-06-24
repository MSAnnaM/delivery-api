import Joi from "joi";
const emailRegex = new RegExp("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$");

export const userRegistrationSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).messages({
    "string.pattern.base": "Incorrect email format",
    "string.empty": '"email" cannot be an empty field',
  }),
  password: Joi.string().min(6).messages({
    "string.empty": '"password" cannot be an empty field',
    "string.min": '"password" should have a minimum length of 6',
  }),
  name: Joi.string().messages({
      "string.empty": '"name" cannot be an empty field',
      "any.required": '"name" is a required field',
  }),
  role: Joi.string().messages({
    "string.empty": '"role" cannot be an empty field',
  }),

});

export const loginUserSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).messages({
    "string.pattern.base": "Incorrect email format",
    "string.empty": '"email" cannot be an empty field',
  }),
  password: Joi.string().min(6).messages({
    "string.empty": '"password" cannot be an empty field',
    "string.min": '"password" should have a minimum length of 6',
  }),
});

export const userUpdateSchema = Joi.object({
  name: Joi.string().messages({
    "string.empty": '"name" cannot be an empty field',
  }),
  email: Joi.string().pattern(emailRegex).messages({
    "string.pattern.base": "Incorrect email format",
    "string.empty": '"email" cannot be an empty field',
  }),
  password: Joi.string().min(6).messages({
    "string.empty": '"password" cannot be an empty field',
    "string.min": '"password" should have a minimum length of 6',
  }),
    role: Joi.string().messages({
    "string.empty": '"role" cannot be an empty field',
  }),
  rating: Joi.number().messages({
    "number.base": '"rating" must be a number',
  }),
  // orders: Joi.array().items(Joi.string().messages({
  //   "string.base": '"orders" items must be strings',
  // })).messages({
  //   "array.base": '"orders" must be an array',
  theme: Joi.string().valid("light", "dark").messages({
    "string.empty": '"theme" cannot be an empty field',
  }),
});