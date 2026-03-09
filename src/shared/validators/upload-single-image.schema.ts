import Joi from 'joi';
import { ACCEPTED_IMAGE_TYPES } from '../constants/accepted-image-types.constant.js';
import { MAX_FILE_SIZE } from '../constants/max-file-size.constant.js';

export const uploadSingleImageSchema = Joi.object({
  mimetype: Joi.string()
    .valid(...ACCEPTED_IMAGE_TYPES)
    .required()
    .messages({
      'any.only': 'File type is not allowed',
      'any.required': 'Cover image is required',
    }),
  size: Joi.number()
    .max(MAX_FILE_SIZE) // Contoh: Limit 5MB
    .messages({
      'number.max': 'File size is too large',
    }),
  originalname: Joi.string().required(),
  fieldname: Joi.string(),
  encoding: Joi.string(),
  buffer: Joi.any(),
})
  .required()
  .messages({
    'object.base': 'Structure file is not valid',
  });
