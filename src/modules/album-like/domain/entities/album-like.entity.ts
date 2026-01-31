import { v7 as uuidv7 } from 'uuid';

export interface AlbumLike {
  id: string;
  albumId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export class AlbumLikeEntity implements AlbumLike {
  id: string;
  albumId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;

  constructor(playlistSong: AlbumLike) {
    const { id, albumId, userId, createdAt, updatedAt } = playlistSong;

    this.id = id;
    this.albumId = albumId;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create({ albumId, userId }: Omit<AlbumLike, 'id' | 'createdAt' | 'updatedAt'>) {
    const timestamp = new Date().toISOString();
    return new AlbumLikeEntity({
      id: uuidv7(),
      albumId,
      userId,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  }
}
