import Joi from 'joi';

export const productCreateSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": '"name" cannot be an empty field',
    "any.required": '"name" is required',
  }),
  imgURL: Joi.string().uri().required().messages({
    "string.empty": '"imgURL" cannot be an empty field',
    "string.uri": '"imgURL" must be a valid URI',
  }),
  img2xURL: Joi.string().uri().messages({
    "string.uri": '"img2xURL" must be a valid URI',
  }),
  demoImgURL: Joi.string().uri().required().messages({
    "string.empty": '"demoImgURL" cannot be an empty field',
    "string.uri": '"demoImgURL" must be a valid URI',
  }),
  basicInfo: Joi.string().required().messages({
    "string.empty": '"basicInfo" cannot be an empty field',
    "any.required": '"basicInfo" is required',
  }),
  information: Joi.object().messages({
    "object.base": '"information" must be an object',
  }),
});

export const productUpdateSchema = Joi.object({
  name: Joi.string().messages({
    "string.empty": '"name" cannot be an empty field',
  }),
  imgURL: Joi.string().uri().messages({
    "string.empty": '"imgURL" cannot be an empty field',
    "string.uri": '"imgURL" must be a valid URI',
  }),
  img2xURL: Joi.string().uri().messages({
    "string.uri": '"img2xURL" must be a valid URI',
  }),
  demoImgURL: Joi.string().uri().messages({
    "string.empty": '"demoImgURL" cannot be an empty field',
    "string.uri": '"demoImgURL" must be a valid URI',
  }),
  basicInfo: Joi.string().messages({
    "string.empty": '"basicInfo" cannot be an empty field',
  }),
  information: Joi.object().messages({
    "object.base": '"information" must be an object',
  }),
});