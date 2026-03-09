import { playlistRepository } from '@/modules/playlist/infrastructure/repositories/playlist.repository.js';
import { exportPlaylistSongProducer } from '@/producers/playlist/export-playlist.producer.js';
import { ForbiddenError, NotFoundError } from '@/shared/errors/app-error.js';

interface Dto {
  playlistId: string;
  targetEmail: string;
  userId: string;
}

export const exportPlaylistUseCase = async ({ playlistId, targetEmail, userId }: Dto) => {
  const playlist = await playlistRepository.findById(playlistId);

  if (!playlist) throw new NotFoundError('Playlist is not found');
  if (playlist.owner !== userId) throw new ForbiddenError('Forbidden Request');

  await exportPlaylistSongProducer({ targetEmail, playlistId });

  return true;
};
