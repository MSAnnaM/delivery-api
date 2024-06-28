import Joi from 'joi';
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const clientRegistrationSchema = Joi.object({
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
});

export const loginClientSchema = Joi.object({
  email: Joi.string().pattern(emailRegex).messages({
    "string.pattern.base": "Incorrect email format",
    "string.empty": '"email" cannot be an empty field',
  }),
  password: Joi.string().min(6).messages({
    "string.empty": '"password" cannot be an empty field',
    "string.min": '"password" should have a minimum length of 6',
  }),
});

export const clientUpdateSchema = Joi.object({
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
  theme: Joi.string().valid("light", "dark").messages({
    "string.empty": '"theme" cannot be an empty field',
    "any.only": '"theme" must be one of [light, dark]',
  }),
});
