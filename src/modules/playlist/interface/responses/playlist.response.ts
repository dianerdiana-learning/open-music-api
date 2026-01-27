import type { PlaylistEntity } from '../../domain/entities/playlist.entity.js';

import type { UserResponse } from '@/modules/user/interface/responses/user.response.js';
import type { SongResponse } from '@/modules/song/interface/responses/song.response.js';

export class PlaylistResponse {
  id: string;
  name: string;
  username: string | null;

  constructor({ id, name, user }: PlaylistEntity & { user: UserResponse | undefined }) {
    this.id = id;
    this.name = name;
    this.username = user ? user.username : null;
  }
}

export class PlaylistWithSongsResponse {
  id: string;
  name: string;
  username: string | null;
  songs: Omit<SongResponse, 'year' | 'genre' | 'duration' | 'albumId'>[];

  constructor({
    id,
    name,
    user,
    songs,
  }: PlaylistEntity & { user: UserResponse | undefined; songs: SongResponse[] }) {
    this.id = id;
    this.name = name;
    this.username = user ? user.username : null;
    this.songs = songs.map((song) => ({
      id: song.id,
      title: song.title,
      performer: song.performer,
    }));
  }
}
