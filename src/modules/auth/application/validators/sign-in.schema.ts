import Joi from 'joi';
import type { SignInDto } from '../dtos/sign-in.dto.js';

export const signInSchema = Joi.object<SignInDto>({
  username: Joi.string().required(),
  password: Joi.string().required(),
});
