import { db } from '@/database/index.js';
import { SongEntity } from '../../domain/entities/song.entity.js';
import { mapSongRowToEntity, type SongRow } from '../mappers/song.mapper.js';
import type { GetSongListDto } from '../../application/dtos/get-song-list.dto.js';

const tableName = 'songs';

export const songRepository = {
  save: async (song: SongEntity): Promise<void> => {
    await db.query<SongRow>(
      `INSERT INTO ${tableName} (id, title, year, genre, performer, duration, album_id, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         ON CONFLICT (id) DO UPDATE
         SET title = EXCLUDED.title,
          year = EXCLUDED.year,
          genre = EXCLUDED.genre,
          performer = EXCLUDED.performer,
          duration = EXCLUDED.duration,
          album_id = EXCLUDED.album_id,
          updated_at = EXCLUDED.updated_at
         RETURNING *
         `,
      [
        song.id,
        song.title,
        song.year,
        song.genre,
        song.performer,
        song.duration,
        song.albumId,
        song.createdAt,
        song.updatedAt,
      ],
    );
  },

  findAll: async (dto: GetSongListDto): Promise<SongEntity[]> => {
    const { filters, performer, title } = dto;
    const conditions: string[] = [];
    const values: any[] = [];

    if (title) {
      values.push(`%${title.toLowerCase()}%`);
      conditions.push(`LOWER(title) LIKE $${values.length}`);
    }

    if (performer) {
      values.push(`%${performer.toLowerCase()}%`);
      conditions.push(`LOWER(performer) LIKE $${values.length}`);
    }

    if (filters && filters.length) {
      const allowedFields = ['album_id'];

      for (const filter of filters) {
        if (!allowedFields.includes(filter.field)) continue;
        values.push(filter.value);
        conditions.push(`${filter.field} = $${values.length}`);
      }
    }

    const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';
    const query = `SELECT * FROM ${tableName} ${whereClause} ORDER BY created_at DESC;`;

    const result = await db.query<SongRow>(query, values);
    return result.rows.map((row) => mapSongRowToEntity(row));
  },

  findById: async (id: string): Promise<SongEntity | null> => {
    const result = await db.query<SongRow>(`SELECT * FROM ${tableName} WHERE id=$1`, [id]);

    const existingSong = result.rows[0];
    if (!existingSong) return null;

    return mapSongRowToEntity(existingSong);
  },

  findByIds: async (ids: string[]): Promise<SongEntity[]> => {
    const result = await db.query<SongRow>(
      `SELECT * FROM ${tableName} WHERE id = ANY($1::text[])`,
      [ids],
    );
    return result.rows.map((songRow) => mapSongRowToEntity(songRow));
  },

  delete: async (id: string): Promise<boolean> => {
    await db.query(`DELETE FROM ${tableName} WHERE id=$1 RETURNING *`, [id]);

    return true;
  },
};
