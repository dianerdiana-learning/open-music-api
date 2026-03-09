import { UserEntity } from '../../domain/entities/user.entity.js';

export interface UserRow {
  id: string;
  fullname: string;
  username: string;
  password: string;
  created_at: string;
  updated_at: string;
}

/**
 * Convert database row (snake_case) → entity (camelCase)
 */
export const mapUserRowToEntity = (row: UserRow): UserEntity => {
  return new UserEntity({
    id: row.id,
    fullname: row.fullname,
    username: row.username,
    password: row.password,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  });
};

/**
 * Convert entity (camelCase) → database row (snake_case)
 */
export const mapUserEntityToRow = (entity: UserEntity): UserRow => {
  return {
    id: entity.id,
    fullname: entity.fullname,
    username: entity.username,
    password: entity.password,
    created_at: entity.createdAt,
    updated_at: entity.updatedAt,
  };
};
