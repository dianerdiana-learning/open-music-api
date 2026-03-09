import Joi from 'joi';
import type { CreateUserDto } from '../dtos/create-user.dto.js';

export const createUserSchema = Joi.object<CreateUserDto>({
  username: Joi.string().min(3).max(20).required(),
  password: Joi.string().min(6).max(255).required(),
  fullname: Joi.string().min(2).max(50).required(),
});
