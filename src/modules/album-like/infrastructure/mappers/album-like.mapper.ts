import { AlbumLikeEntity } from '../../domain/entities/album-like.entity.js';

export interface AlbumLikeRow {
  id: string;
  album_id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

/**
 * Convert database row (snake_case) → entity (camelCase)
 */
export const mapAlbumLikeRowToEntity = (row: AlbumLikeRow): AlbumLikeEntity => {
  return new AlbumLikeEntity({
    id: row.id,
    albumId: row.album_id,
    userId: row.user_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  });
};

/**
 * Convert entity (camelCase) → database row (snake_case)
 */
export const mapAlbumLikeEntityToRow = (entity: AlbumLikeEntity): AlbumLikeRow => {
  return {
    id: entity.id,
    album_id: entity.albumId,
    user_id: entity.userId,
    created_at: entity.createdAt,
    updated_at: entity.updatedAt,
  };
};
