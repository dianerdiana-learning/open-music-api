import { db } from '@/database/index.js';
import type { PlaylistEntity } from '../../domain/entities/playlist.entity.js';
import { mapPlaylistRowToEntity, type PlaylistRow } from '../mappers/playlist.mapper.js';

export const playlistRepository = {
  save: async (playlist: PlaylistEntity): Promise<void> => {
    await db.query<PlaylistRow>(
      `INSERT INTO playlists (id, name, owner, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (id) DO UPDATE
         SET
          name = EXCLUDED.name,
          owner = EXCLUDED.owner,
          updated_at = EXCLUDED.updated_at
         RETURNING *
         `,
      [playlist.id, playlist.name, playlist.owner, playlist.createdAt, playlist.updatedAt],
    );
  },

  findAllOwned: async (userId: string): Promise<PlaylistEntity[]> => {
    const result = await db.query<PlaylistRow>(`SELECT * FROM playlists WHERE owner=$1`, [userId]);
    return result.rows.map((row) => mapPlaylistRowToEntity(row));
  },

  findAllByIds: async (playlistIds: string[]): Promise<PlaylistEntity[]> => {
    const result = await db.query<PlaylistRow>(
      `SELECT * FROM playlists WHERE id = ANY($1::text[])`,
      [playlistIds],
    );
    return result.rows.map((r) => mapPlaylistRowToEntity(r));
  },

  findById: async (playlistId: string): Promise<PlaylistEntity | null> => {
    const result = await db.query<PlaylistRow>(`SELECT * FROM playlists WHERE id=$1`, [playlistId]);

    const playlistRow = result.rows[0];
    if (!playlistRow) return null;

    return mapPlaylistRowToEntity(playlistRow);
  },

  delete: async (playlist: PlaylistEntity): Promise<boolean> => {
    await db.query(`DELETE FROM playlists WHERE id=$1 RETURNING *`, [playlist.id]);

    return true;
  },
};
