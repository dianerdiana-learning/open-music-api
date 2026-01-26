import { db } from '@/database/index.js';
import { AlbumEntity } from '../../domain/entities/album.entity.js';
import { type AlbumRow, mapAlbumRowToEntity } from '../../interface/mappers/album.mapper.js';

const tableName = 'albums';

export const AlbumRepository = {
  save: async (album: AlbumEntity): Promise<AlbumEntity | null> => {
    const result = await db.query<AlbumRow>(
      `INSERT INTO ${tableName}(name, year) VALUES ($1, $2) RETURNING *`,
      [album.name, album.year],
    );

    const newAlbumRow = result.rows[0];
    if (!newAlbumRow) return null;

    return mapAlbumRowToEntity(newAlbumRow);
  },

  findById: async (id: string): Promise<AlbumEntity | null> => {
    const result = await db.query<AlbumRow>(`SELECT * FROM ${tableName} WHERE id=$1`, [id]);

    const existingAlbum = result.rows[0];
    if (!existingAlbum) return null;

    return mapAlbumRowToEntity(existingAlbum);
  },

  update: async (id: string, album: AlbumEntity): Promise<AlbumEntity | null> => {
    const result = await db.query<AlbumRow>(
      `UPDATE ${tableName} SET name=$1,year=$2 WHERE id=$3 RETURNING *`,
      [album.name, album.year, id],
    );

    const existingAlbum = result.rows[0];
    if (!existingAlbum) return null;

    return mapAlbumRowToEntity(existingAlbum);
  },

  delete: async (id: string): Promise<void> => {
    await db.query(`DELETE FROM ${tableName} WHERE id=$1`, [id]);
  },
};
