import { db } from '@/database/index.js';
import type { PlaylistSongActivityEntity } from '../../domain/entities/playlist-song-activity.entity.js';
import {
  mapPlaylistSongActivityRowToEntity,
  type PlaylistSongActivityRow,
} from '../mappers/playlist-song-activity.mapper.js';

export const playlistSongRepository = {
  save: async (playlistSongActivity: PlaylistSongActivityEntity): Promise<void> => {
    await db.query<PlaylistSongActivityRow>(
      `INSERT INTO playlist_song_activities (id, playlist_id, song_id, user_id, action, time, created_at, updated_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
           ON CONFLICT (id) DO UPDATE
           SET
            playlist_id = EXCLUDED.playlist_id,
            song_id = EXCLUDED.song_id,
            user_id = EXCLUDED.user_id,
            action = EXCLUDED.action,
            time = EXCLUDED.time,
            updated_at = EXCLUDED.updated_at
           RETURNING *
           `,
      [
        playlistSongActivity.id,
        playlistSongActivity.playlistId,
        playlistSongActivity.songId,
        playlistSongActivity.userId,
        playlistSongActivity.action,
        playlistSongActivity.time,
        playlistSongActivity.createdAt,
        playlistSongActivity.updatedAt,
      ],
    );
  },

  findAllByPlaylistId: async (playlistId: string): Promise<PlaylistSongActivityEntity[]> => {
    const result = await db.query<PlaylistSongActivityRow>(
      `SELECT * FROM playlist_song_activities WHERE playlist_id=$1`,
      [playlistId],
    );

    return result.rows.map((playlistSongActivityRow) =>
      mapPlaylistSongActivityRowToEntity(playlistSongActivityRow),
    );
  },
};
