import Joi from 'joi';
import type { UploadAlbumCoverDto } from '../dtos/upload-album-cover.dto.js';
import { uploadSingleImageSchema } from '@/shared/validators/upload-single-image.schema.js';

export const uploadAlbumCoverSchema = Joi.object<UploadAlbumCoverDto>({
  cover: uploadSingleImageSchema,
});
