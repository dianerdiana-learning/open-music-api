import { db } from '@/database/index.js';
import type { CollaborationEntity } from '../../domain/entities/collaboration.entity.js';
import {
  mapCollaborationRowToEntity,
  type CollaborationRow,
} from '../mappers/collaboration.mapper.js';

export const collaborationRepository = {
  save: async (collaboration: CollaborationEntity): Promise<void> => {
    await db.query<CollaborationRow>(
      `INSERT INTO collaborations (id, playlist_id, user_id, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5)
           ON CONFLICT (id) DO UPDATE
           SET
            playlist_id = EXCLUDED.playlist_id,
            user_id = EXCLUDED.user_id,
            updated_at = EXCLUDED.updated_at
           RETURNING *
           `,
      [
        collaboration.id,
        collaboration.playlistId,
        collaboration.userId,
        collaboration.createdAt,
        collaboration.updatedAt,
      ],
    );
  },

  findAllByPlaylistIdsOrUserIds: async (
    playlistIds?: string[],
    userIds?: string[],
  ): Promise<CollaborationEntity[]> => {
    const conditions = [];
    const params = [];

    if (playlistIds && playlistIds.length > 0) {
      params.push(playlistIds);
      conditions.push(`playlist_id = ANY($${params.length}::text[])`);
    }

    if (userIds && userIds.length > 0) {
      params.push(userIds);
      conditions.push(`user_id = ANY($${params.length}::text[])`);
    }

    let query = `SELECT * FROM collaborations`;

    if (conditions.length > 0) {
      query += ` WHERE ` + conditions.join(' OR ');
    }

    const result = await db.query<CollaborationRow>(query, params);
    return result.rows.map((row) => mapCollaborationRowToEntity(row));
  },

  delete: async (playlistId: string, userId: string): Promise<boolean> => {
    await db.query(`DELETE FROM collaborations WHERE playlist_id=$1 AND user_id=$2`, [
      playlistId,
      userId,
    ]);

    return true;
  },
};
