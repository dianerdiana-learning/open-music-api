import { db } from '@/database/index.js';
import type { AlbumLikeEntity } from '../../domain/entities/album-like.entity.js';
import { mapAlbumLikeRowToEntity, type AlbumLikeRow } from '../mappers/album-like.mapper.js';

export const albumLikeRepository = {
  save: async (albumLike: AlbumLikeEntity): Promise<void> => {
    await db.query<AlbumLikeRow>(
      `INSERT INTO user_album_likes (id, album_id, user_id, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (id) DO UPDATE
         SET
          album_id = EXCLUDED.album_id,
          user_id = EXCLUDED.user_id,
          updated_at = EXCLUDED.updated_at
         RETURNING *
         `,
      [albumLike.id, albumLike.albumId, albumLike.userId, albumLike.createdAt, albumLike.updatedAt],
    );
  },

  findAllByPlaylistIdsOrSongIds: async (
    albumIds?: string[],
    userIds?: string[],
  ): Promise<AlbumLikeEntity[]> => {
    const conditions = [];
    const params = [];

    if (albumIds && albumIds.length > 0) {
      params.push(albumIds);
      conditions.push(`album_id = ANY($${params.length}::text[])`);
    }

    if (userIds && userIds.length > 0) {
      params.push(userIds);
      conditions.push(`user_id = ANY($${params.length}::text[])`);
    }

    let query = `SELECT * FROM user_album_likes`;

    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(' OR ');
    }

    const result = await db.query<AlbumLikeRow>(query, params);
    return result.rows.map((row) => mapAlbumLikeRowToEntity(row));
  },

  delete: async (albumId: string, userId: string): Promise<boolean> => {
    await db.query(`DELETE FROM user_album_likes WHERE album_id=$1 AND user_id=$2 RETURNING *`, [
      albumId,
      userId,
    ]);

    return true;
  },
};
