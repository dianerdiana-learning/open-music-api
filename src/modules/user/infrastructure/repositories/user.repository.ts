import { db } from '@/database/index.js';
import type { UserEntity } from '../../domain/entities/user.entity.js';
import { mapUserRowToEntity, type UserRow } from '../mappers/user.mapper.js';

export const userRepository = {
  save: async (user: UserEntity): Promise<void> => {
    await db.query<UserRow>(
      `INSERT INTO users (id, fullname, username, password, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (id) DO UPDATE
         SET
          fullname = EXCLUDED.fullname,
          username = EXCLUDED.username,
          password = EXCLUDED.password,
          updated_at = EXCLUDED.updated_at
         RETURNING *
         `,
      [user.id, user.fullname, user.username, user.password, user.createdAt, user.updatedAt],
    );
  },

  findById: async (userId: string): Promise<UserEntity | null> => {
    const result = await db.query<UserRow>(
      `SELECT id,fullname,username,created_at,updated_at FROM users WHERE id=$1`,
      [userId],
    );

    const userRow = result.rows[0];
    if (!userRow) return null;

    return mapUserRowToEntity(userRow);
  },

  findByUsername: async (username: string): Promise<UserEntity | null> => {
    const result = await db.query<UserRow>(`SELECT * FROM users WHERE username=$1`, [username]);

    const userRow = result.rows[0];
    if (!userRow) return null;

    return mapUserRowToEntity(userRow);
  },

  findByIds: async (userIds: string[]): Promise<UserEntity[]> => {
    const result = await db.query<UserRow>(
      `SELECT id,fullname,username,created_at,updated_at FROM users WHERE id = ANY($1::text[])`,
      [userIds],
    );
    return result.rows.map((userRow) => mapUserRowToEntity(userRow));
  },
};
