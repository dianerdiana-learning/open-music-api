import { db } from '@/database/index.js';
import type { AuthEntity } from '../../domain/entities/auth.entity.js';
import { mapAuthRowToEntity, type AuthRow } from '../mappers/auth.mapper.js';

export const authRepository = {
  save: async (auth: AuthEntity): Promise<void> => {
    await db.query<AuthRow>(
      `INSERT INTO authentications (id, user_id, refresh_token, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5)
           ON CONFLICT (id) DO UPDATE
           SET
            user_id = EXCLUDED.user_id,
            refresh_token = EXCLUDED.refresh_token,
            updated_at = EXCLUDED.updated_at
           RETURNING *
           `,
      [auth.id, auth.userId, auth.refreshToken, auth.createdAt, auth.updatedAt],
    );
  },

  findByUserId: async (userId: string): Promise<AuthEntity | null> => {
    const result = await db.query<AuthRow>(`SELECT * FROM authentications WHERE user_id=$1`, [
      userId,
    ]);

    const authRow = result.rows[0];
    if (!authRow) return null;

    return mapAuthRowToEntity(authRow);
  },

  delete: async (auth: AuthEntity): Promise<boolean> => {
    await db.query(`DELETE FROM authentications WHERE user_id=$1 RETURNING *`, [auth.userId]);

    return true;
  },
};
