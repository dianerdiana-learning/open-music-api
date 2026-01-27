import Joi from 'joi';

const currentYear = new Date().getFullYear();

export const yearSchema = Joi.number().integer().positive().min(1900).max(currentYear).required();
