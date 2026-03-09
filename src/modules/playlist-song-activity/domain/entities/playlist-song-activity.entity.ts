import { v7 as uuidv7 } from 'uuid';

export interface PlaylistSongActivity {
  id: string;
  playlistId: string;
  songId: string;
  userId: string;
  action: string;
  time: string;
  createdAt: string;
  updatedAt: string;
}

export class PlaylistSongActivityEntity implements PlaylistSongActivity {
  id: string;
  playlistId: string;
  songId: string;
  userId: string;
  action: string;
  time: string;
  createdAt: string;
  updatedAt: string;

  constructor(playlistSong: PlaylistSongActivity) {
    const { id, playlistId, songId, userId, action, time, createdAt, updatedAt } = playlistSong;

    this.id = id;
    this.playlistId = playlistId;
    this.songId = songId;
    this.userId = userId;
    this.action = action;
    this.time = time;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  static create(payload: Omit<PlaylistSongActivity, 'id' | 'time' | 'createdAt' | 'updatedAt'>) {
    const timestamp = new Date().toISOString();
    return new PlaylistSongActivityEntity({
      ...payload,
      id: uuidv7(),
      time: timestamp,
      createdAt: timestamp,
      updatedAt: timestamp,
    });
  }
}
