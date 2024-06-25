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
  manager: Joi.string(),

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
  avatarUrl: Joi.string().uri().messages({
    "string.uri": '"avatarUrl" must be a valid URI',
  }),
  role: Joi.string().messages({
    "string.empty": '"role" cannot be an empty field',
  }),
  rating: Joi.any(),
  order: Joi.any(),
  averageRating: Joi.number().messages({
    "number.base": '"averageRating" must be a number',
  }),
  orders: Joi.array().items(Joi.string().messages({
    "string.base": '"orders" items must be strings',
  })).messages({
    "array.base": '"orders" must be an array',
  }),
  theme: Joi.string().valid("light", "dark").messages({
    "string.empty": '"theme" cannot be an empty field',
    "any.only": '"theme" must be one of [light, dark]',
  }),
  manager: Joi.string().messages({
    "string.base": '"manager" must be a string',
  }),
});