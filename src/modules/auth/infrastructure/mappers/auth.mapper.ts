import { AuthEntity } from '../../domain/entities/auth.entity.js';

export interface AuthRow {
  id: string;
  user_id: string;
  refresh_token: string;
  created_at: string;
  updated_at: string;
}

/**
 * Convert database row (snake_case) → entity (camelCase)
 */
export const mapAuthRowToEntity = (row: AuthRow): AuthEntity => {
  return new AuthEntity({
    id: row.id,
    userId: row.user_id,
    refreshToken: row.refresh_token,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  });
};

/**
 * Convert entity (camelCase) → database row (snake_case)
 */
export const mapAuthEntityToRow = (entity: AuthEntity): AuthRow => {
  return {
    id: entity.id,
    user_id: entity.userId,
    refresh_token: entity.refreshToken,
    created_at: entity.createdAt,
    updated_at: entity.updatedAt,
  };
};
