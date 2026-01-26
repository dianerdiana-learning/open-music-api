import type { SongEntity } from '../../domain/entities/song.entity.js';

export class SongResponse {
  id: string;
  title: string;
  year: number;
  performer: string;
  genre: string;
  duration?: number | null | undefined;
  albumId?: string | null | undefined;

  constructor({ id, title, year, performer, genre, duration, albumId }: SongEntity) {
    this.id = id;
    this.title = title;
    this.year = year;
    this.performer = performer;
    this.genre = genre;
    this.duration = duration;
    this.albumId = albumId;
  }
}

export class SongListResponse {
  id: string;
  title: string;
  performer: string;

  constructor({ id, title, performer }: SongEntity) {
    this.id = id;
    this.title = title;
    this.performer = performer;
  }
}
