import { env } from '@/configs/env.config.js';
import type { AlbumEntity } from '../../domain/entities/album.entity.js';

export class AlbumResponse {
  id: string;
  name: string;
  year: number;
  coverUrl?: string | null | undefined;

  constructor({ id, name, year, cover }: AlbumEntity) {
    this.id = id;
    this.name = name;
    this.year = year;
    this.coverUrl = cover ? `${env.app.baseUrl}/${cover}` : null;
  }
}
