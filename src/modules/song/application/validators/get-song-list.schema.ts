import Joi from 'joi';
import type { GetSongListDto } from '../dtos/get-song-list.dto.js';

export const getSongListSchema = Joi.object<GetSongListDto>({
  title: Joi.string().max(50).optional().empty(),
  performer: Joi.string().max(50).optional().empty(),
  filters: Joi.array()
    .items(
      Joi.object({
        field: Joi.string(),
        value: Joi.alternatives().try(Joi.string(), Joi.number()),
      }),
    )
    .optional()
    .empty(),
});
