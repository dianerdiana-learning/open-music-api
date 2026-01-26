import { v7 as uuidv7 } from 'uuid';

export interface Album {
  id: string;
  name: string;
  year: number;
  createdAt: string;
  updatedAt: string;
}

export class AlbumEntity implements Album {
  id: string;
  name: string;
  year: number;
  createdAt: string;
  updatedAt: string;

  constructor({ id, name, year, createdAt, updatedAt }: Album) {
    this.id = id;
    this.name = name;
    this.year = year;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create(payload: Omit<Album, 'id' | 'createdAt' | 'updatedAt'>) {
    const timestamp = new Date().toISOString();
    const id = uuidv7();

    return new AlbumEntity({
      id,
      name: payload.name,
      year: Number(payload.year),
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  }
}
