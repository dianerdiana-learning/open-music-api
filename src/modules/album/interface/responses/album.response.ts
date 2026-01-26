import type { AlbumEntity } from '../../domain/entities/album.entity.js';

export class AlbumResponse {
  id: string;
  name: string;
  year: number;

  constructor({ id, name, year }: AlbumEntity) {
    this.id = id;
    this.name = name;
    this.year = year;
  }
}
