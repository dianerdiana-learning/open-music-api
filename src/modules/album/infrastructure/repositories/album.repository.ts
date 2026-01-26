import { db } from '@/database/index.js';

import { AlbumEntity } from '../../domain/entities/album.entity.js';
import { type AlbumRow, mapAlbumRowToEntity } from '../mappers/album.mapper.js';

const tableName = 'albums';

export const albumRepository = {
  save: async (album: AlbumEntity): Promise<void> => {
    await db.query<AlbumRow>(
      `INSERT INTO albums (id, name, year, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (id) DO UPDATE
       SET
        name = EXCLUDED.name,
        year = EXCLUDED.year,
        updated_at = EXCLUDED.updated_at
       RETURNING *
       `,
      [album.id, album.name, album.year, album.createdAt, album.updatedAt],
    );
  },

  findById: async (id: string): Promise<AlbumEntity | null> => {
    const result = await db.query<AlbumRow>(`SELECT * FROM ${tableName} WHERE id=$1`, [id]);

    const existingAlbum = result.rows[0];
    if (!existingAlbum) return null;

    return mapAlbumRowToEntity(existingAlbum);
  },

  delete: async (id: string): Promise<void> => {
    await db.query(`DELETE FROM ${tableName} WHERE id=$1`, [id]);
  },
};
