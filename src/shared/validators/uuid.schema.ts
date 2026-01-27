import Joi from 'joi';

export const uuidSchema = (uuid: string) =>
  Joi.object({
    [uuid]: Joi.string().uuid().required(),
  });
