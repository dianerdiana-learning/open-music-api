import path from 'path';
import type { Request, Response, NextFunction } from 'express';
import multer, { type FileFilterCallback } from 'multer';

import { getUploadDir } from '@/shared/utility/get-upload-dir.js';
import { MAX_FILE_SIZE } from '@/shared/constants/max-file-size.constant.js';
import { ACCEPTED_IMAGE_TYPES } from '@/shared/constants/accepted-image-types.constant.js';
import { BadRequestError, MaxFileSizeError } from '@/shared/errors/app-error.js';

const uploadDir = getUploadDir();

export const uploadMiddleware = (fieldName: string) => {
  // 1. Konfigurasi Penyimpanan ke Disk
  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, uploadDir);
    },
    filename: (_req, file, cb) => {
      // Membuat nama file unik: timestamp-namaasli.ext
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
    },
  });

  // 2. Filter Tipe File
  const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    // Mengecek apakah mimetype file ada di dalam array yang diizinkan
    if (ACCEPTED_IMAGE_TYPES.includes(file.mimetype)) {
      cb(null, true);
    } else {
      (req as any).fileValidationError =
        `Tipe file tidak valid. Hanya ${ACCEPTED_IMAGE_TYPES.join(', ')} yang diizinkan!`;
      cb(null, false);
    }
  };

  const sizeInMb = 5;
  const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: MAX_FILE_SIZE },
  }).single(fieldName);

  // 3. Middleware Function
  return (req: Request, res: Response, next: NextFunction) => {
    upload(req, res, (err: any) => {
      // Handle Error dari fileFilter manual
      if ((req as any).fileValidationError) {
        throw new BadRequestError((req as any).fileValidationError);
      }

      // Handle jika file tidak ada
      if (!req.file && !err) {
        throw new BadRequestError('Cover is not found');
      }

      // Handle Error dari Multer (termasuk Limit Size)
      if (err) {
        let message = err.message;
        if (err.code === 'LIMIT_FILE_SIZE') {
          message = `Maksimal ukuran gambar adalah ${sizeInMb}Mb`;
          throw new MaxFileSizeError(message);
        }

        throw new BadRequestError(message);
      }

      next();
    });
  };
};
